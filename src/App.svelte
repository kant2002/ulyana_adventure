<script lang="ts">
  import { onMount } from 'svelte'
  import mapText from '../assets/scenarios/map.txt?raw'
  import {
    createStructure,
    describeStructures,
    isPositionBlockedByStructure,
    moveStructure,
  } from './lib/structures'

  globalThis.groundMap = mapText.split(/\r?\n/).filter((line) => line.length > 0)

  describeStructures()
  globalThis.describeStructures = describeStructures
  globalThis.createStructure = createStructure

  function createWindmillAndField(x: number, y: number) {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 11; j++) {
        if (j < 7 || i != 7) {
          createStructure('yellowgrass', x + i, y + j)
        }
      }
    }
    createStructure('windmill', x + 6, y + 3)
  }

  function createWorkshop(x: number, y: number) {
    createStructure('workshop', x, y)
    createStructure('anvil', x + 2, y + 3)
  }

  if ((globalThis.globalStructures?.length ?? 0) === 0) {
    createStructure('appletree', 4, 6)
    createStructure('house', 5, 5)
    createStructure('appletree', 9, 6)
    
    createStructure('appletree', 13, 7)
    createStructure('appletree', 3, 11)
    createStructure('anvil', 22, 11)
    createWorkshop(12, 12)
    createStructure('willowcut', 9, 17)
    createStructure('whirlpool', 85, 2)
    
    // Windmill and field
    createWindmillAndField(2, 17)
    createStructure('boat', 60, 2)
    createStructure('boat', 4, 5)
  }

  let width = 12
  let height = 7
  let tileSize = 64
  let cameraX = 3
  let cameraY = 3
  let playerX = 5
  let playerY = 8
  let playerDirection: 'left' | 'right' = 'left'
  let playerWalking = false
  let walkingTimer: ReturnType<typeof setTimeout> | undefined
  let headerElement: HTMLElement
  let footerElement: HTMLElement
  const impassableTerrainCodes = new Set(['w', 'o', 'd'])

  const clamp = (value: number, minimum: number, maximum: number) =>
    Math.min(maximum, Math.max(minimum, value))

  const updateViewport = () => {
    const groundMap = globalThis.groundMap ?? []
    const mapWidth = groundMap.reduce(
      (maximum, row) => Math.max(maximum, row.length),
      0,
    )
    const mapHeight = groundMap.length

    const narrowViewport = window.matchMedia?.('(max-width: 768px)').matches
      ?? window.innerWidth <= 768
    const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false
    const isMobile = narrowViewport || coarsePointer

    tileSize = isMobile ? 32 : 64

    const availableWidth = document.documentElement.clientWidth || window.innerWidth
    const availableHeight = document.documentElement.clientHeight || window.innerHeight
    const headerHeight = headerElement?.getBoundingClientRect().height ?? 0
    const footerHeight = footerElement?.getBoundingClientRect().height ?? 0
    const horizontalInset = isMobile ? 16 : 32
    const verticalInset = isMobile ? 16 : 24

    const mapAvailableWidth = Math.max(
      1,
      availableWidth - horizontalInset,
    )
    const mapAvailableHeight = Math.max(
      1,
      availableHeight - headerHeight - footerHeight - verticalInset,
    )

    width = Math.min(mapWidth, Math.max(1, Math.floor(mapAvailableWidth / tileSize)))
    height = Math.min(mapHeight, Math.max(1, Math.floor(mapAvailableHeight / tileSize)))

    cameraX = clamp(playerX + 0.5, width / 2, mapWidth - width / 2)
    cameraY = clamp(playerY + 0.5, height / 2, mapHeight - height / 2)
  }

  const movePlayer = (horizontal: number, vertical: number) => {
    const groundMap = globalThis.groundMap ?? []
    const mapWidth = groundMap.reduce(
      (maximum, row) => Math.max(maximum, row.length),
      0,
    )
    const mapHeight = groundMap.length
    const nextY = clamp(playerY + vertical, 0, mapHeight - 1)
    const nextX = clamp(playerX + horizontal, 0, (groundMap[nextY]?.length ?? 1) - 1)
    const currentTerrainCode = groundMap[playerY]?.[playerX] ?? ''
    const nextTerrainCode = groundMap[nextY]?.[nextX] ?? ''
    const boatUnderPlayer = (globalThis.globalStructures ?? []).find(
      (structure) =>
        structure.code === 'boat' &&
        structure.x === playerX &&
        structure.y === playerY,
    )
    const boatAtDestination = (globalThis.globalStructures ?? []).find(
      (structure) =>
        structure.code === 'boat' &&
        structure.x === nextX &&
        structure.y === nextY,
    )

    clearTimeout(walkingTimer)
    if (
      (impassableTerrainCodes.has(nextTerrainCode) &&
        !boatUnderPlayer &&
        !boatAtDestination) ||
      isPositionBlockedByStructure(nextX, nextY)
    ) {
      playerWalking = false
      return
    }

    const moved = nextX !== playerX || nextY !== playerY
    if (horizontal !== 0 && nextX !== playerX) {
      playerDirection = horizontal < 0 ? 'left' : 'right'
    }

    playerWalking = moved
    if (moved) {
      walkingTimer = setTimeout(() => {
        playerWalking = false
      }, 400)
    }

    const leavingWater = impassableTerrainCodes.has(currentTerrainCode) &&
      !impassableTerrainCodes.has(nextTerrainCode)
    if (moved && boatUnderPlayer && !leavingWater) {
      moveStructure(boatUnderPlayer.id, nextX, nextY)
    }

    playerX = nextX
    playerY = nextY
    cameraX = clamp(playerX + 0.5, width / 2, mapWidth - width / 2)
    cameraY = clamp(playerY + 0.5, height / 2, mapHeight - height / 2)
  }

  onMount(() => {
    updateViewport()
    window.addEventListener('resize', updateViewport)

    const handleKeydown = (event: KeyboardEvent) => {
      const movementByKey: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      }
      const movement = movementByKey[event.key]

      if (!movement) return

      event.preventDefault()
      movePlayer(...movement)
    }

    window.addEventListener('keydown', handleKeydown)

    const resizeObserver = new ResizeObserver(updateViewport)
    if (headerElement) resizeObserver.observe(headerElement)
    if (footerElement) resizeObserver.observe(footerElement)

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('keydown', handleKeydown)
      clearTimeout(walkingTimer)
      resizeObserver.disconnect()
    }
  })
</script>

<main>
  <section class="game-hud" aria-label="HUD карты">
    <header bind:this={headerElement}>
      <h1>Карта путешествий</h1>
    </header>

    <div class="map-frame">
      <div class="map-stack">
        <terrain-map
          center-x={cameraX}
          center-y={cameraY}
          width={width}
          height={height}
          tile-size={tileSize}
        ></terrain-map>
        <structures-layer
          center-x={cameraX}
          center-y={cameraY}
          width={width}
          height={height}
          tile-size={tileSize}
        ></structures-layer>
        <personas-layer
          center-x={cameraX}
          center-y={cameraY}
          width={width}
          height={height}
          tile-size={tileSize}
          player-x={playerX}
          player-y={playerY}
          direction={playerDirection}
          walking={playerWalking}
        ></personas-layer>
      </div>
    </div>

    <footer bind:this={footerElement}>
      <nav aria-label="Управление картой">
        <button class="direction-up" type="button" aria-label="Вверх" onclick={() => movePlayer(0, -1)}>
          ↑
        </button>
        <button class="direction-down" type="button" aria-label="Вниз" onclick={() => movePlayer(0, 1)}>
          ↓
        </button>
        <button class="direction-left" type="button" aria-label="Влево" onclick={() => movePlayer(-1, 0)}>
          ←
        </button>
        <button class="direction-right" type="button" aria-label="Вправо" onclick={() => movePlayer(1, 0)}>
          →
        </button>
      </nav>
    </footer>
  </section>
</main>

<style>
  main {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    background: #1f2937;
  }

  .game-hud {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    width: 100%;
    height: 100%;
    max-height: 100%;
  }

  header,
  footer {
    display: grid;
    place-items: center;
    background: #111827;
    color: #f9fafb;
  }

  header {
    min-height: 56px;
    border-bottom: 2px solid #374151;
  }

  h1 {
    margin: 0;
    font-size: 1.25rem;
  }

  .map-frame {
    display: grid;
    place-items: center;
    min-height: 0;
    overflow: hidden;
    padding: 12px;
  }

  .map-stack {
    position: relative;
  }

  .map-stack structures-layer {
    position: absolute;
    z-index: 1;
    inset: 0;
  }

  .map-stack personas-layer {
    position: absolute;
    z-index: 2;
    inset: 0;
  }

  footer {
    padding: 8px 12px;
    border-top: 2px solid #374151;
  }

  nav {
    display: grid;
    grid-template-columns: repeat(3, 64px);
    grid-template-rows: repeat(3, 44px);
    gap: 6px;
  }

  .direction-up {
    grid-column: 2;
    grid-row: 1;
  }

  .direction-left {
    grid-column: 1;
    grid-row: 2;
  }

  .direction-right {
    grid-column: 3;
    grid-row: 2;
  }

  .direction-down {
    grid-column: 2;
    grid-row: 3;
  }

  button {
    width: 64px;
    height: 44px;
    border: 1px solid #6b7280;
    border-radius: 6px;
    background: #374151;
    color: #fff;
    cursor: pointer;
  }

  button:hover,
  button:focus-visible {
    background: #4b5563;
  }

  @media (max-width: 768px), (pointer: coarse) {
    header {
      min-height: 48px;
    }

    h1 {
      font-size: 1rem;
    }

    .map-frame {
      padding: 8px;
    }

    footer {
      padding: 6px 8px;
    }

    nav {
      grid-template-columns: repeat(3, 56px);
      grid-template-rows: repeat(3, 48px);
      gap: 4px;
    }

    button {
      width: 56px;
      height: 48px;
      padding: 4px;
      font-size: 0.875rem;
    }
  }
</style>
