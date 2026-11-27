<script lang="ts">
  import { onMount } from 'svelte'
  import {
    createStructure,
    describeStructures,
  } from './lib/structures'

  globalThis.groundMap = [
    'gggggggggggggggg',
    'ggggghhhgggggggg',
    'ggghhmmhhggggggg',
    'gsspppppssgggggg',
    'gswwwwwssggggggg',
    'ggwoowwsgggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
    'gggggggggggggggg',
  ]

  describeStructures()
  globalThis.describeStructures = describeStructures
  globalThis.createStructure = createStructure

  if ((globalThis.globalStructures?.length ?? 0) === 0) {
    createStructure('house', 5, 5)
    createStructure('appletree', 13, 7)
    createStructure('appletree', 3, 11)
  }

  let width = 12
  let height = 7
  let tileSize = 64
  let cameraX = 3
  let cameraY = 3
  let headerElement: HTMLElement
  let footerElement: HTMLElement

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

    cameraX = clamp(cameraX, width / 2, mapWidth - width / 2)
    cameraY = clamp(cameraY, height / 2, mapHeight - height / 2)
  }

  const moveCamera = (horizontal: number, vertical: number) => {
    const groundMap = globalThis.groundMap ?? []
    const mapWidth = groundMap.reduce(
      (maximum, row) => Math.max(maximum, row.length),
      0,
    )
    const mapHeight = groundMap.length

    cameraX = clamp(cameraX + horizontal, width / 2, mapWidth - width / 2)
    cameraY = clamp(cameraY + vertical, height / 2, mapHeight - height / 2)
  }

  onMount(() => {
    updateViewport()
    window.addEventListener('resize', updateViewport)

    const resizeObserver = new ResizeObserver(updateViewport)
    if (headerElement) resizeObserver.observe(headerElement)
    if (footerElement) resizeObserver.observe(footerElement)

    return () => {
      window.removeEventListener('resize', updateViewport)
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
      </div>
    </div>

    <footer bind:this={footerElement}>
      <nav aria-label="Управление картой">
        <button type="button" aria-label="Вверх" onclick={() => moveCamera(0, -1)}>
          Вверх
        </button>
        <button type="button" aria-label="Вниз" onclick={() => moveCamera(0, 1)}>
          Вниз
        </button>
        <button type="button" aria-label="Влево" onclick={() => moveCamera(-1, 0)}>
          Влево
        </button>
        <button type="button" aria-label="Вправо" onclick={() => moveCamera(1, 0)}>
          Вправо
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

  footer {
    min-height: 72px;
    padding: 8px 12px;
    border-top: 2px solid #374151;
  }

  nav {
    display: grid;
    grid-template-columns: repeat(4, minmax(64px, 96px));
    gap: 8px;
  }

  button {
    min-height: 44px;
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
      min-height: 64px;
      padding: 6px 8px;
    }

    nav {
      grid-template-columns: repeat(4, minmax(48px, 1fr));
      width: 100%;
      gap: 4px;
    }

    button {
      min-height: 48px;
      padding: 4px;
      font-size: 0.875rem;
    }
  }
</style>
