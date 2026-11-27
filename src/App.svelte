<script lang="ts">
  import { onMount } from 'svelte'

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

  let width = 12
  let height = 7
  let tileSize = 64

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

    width = Math.min(mapWidth, Math.max(1, Math.floor(availableWidth / tileSize)))
    height = Math.min(mapHeight, Math.max(1, Math.floor(availableHeight / tileSize)))
  }

  onMount(() => {
    updateViewport()
    window.addEventListener('resize', updateViewport)

    return () => window.removeEventListener('resize', updateViewport)
  })
</script>

<main>
  <terrain-map
    center-x={width / 2}
    center-y={height / 2}
    width={width}
    height={height}
    tile-size={tileSize}
  ></terrain-map>
</main>

<style>
  main {
    display: grid;
    place-items: center;
    min-height: 100vh;
    background: #1f2937;
  }
</style>
