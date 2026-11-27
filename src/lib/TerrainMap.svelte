<svelte:options
  customElement={{
    tag: 'terrain-map',
    props: {
      centerX: { attribute: 'center-x', type: 'Number' },
      centerY: { attribute: 'center-y', type: 'Number' },
      x: { type: 'Number' },
      y: { type: 'Number' },
      width: { type: 'Number' },
      height: { type: 'Number' },
      size: { type: 'Number' },
      tileSize: { attribute: 'tile-size', type: 'Number' },
    },
  }}
/>

<script lang="ts">
  import grassTile from '../../assets/terrain/grass.png'
  import highlandTile from '../../assets/terrain/highland.png'
  import mountainTile from '../../assets/terrain/mountainfloor.png'
  import oceanTile from '../../assets/terrain/ocean.png'
  import pathTile from '../../assets/terrain/path.png'
  import sandTile from '../../assets/terrain/sand.png'
  import snowTile from '../../assets/terrain/snow.png'
  import waterTile from '../../assets/terrain/water.png'

  interface Props {
    centerX?: number
    centerY?: number
    x?: number
    y?: number
    width?: number
    height?: number
    size?: number
    tileSize?: number
  }

  interface VisibleTile {
    key: string
    source?: string
    code?: string
  }

  const tilePaths: ReadonlyArray<readonly [string, string]> = [
    ['g', grassTile],
    ['h', highlandTile],
    ['m', mountainTile],
    ['o', oceanTile],
    ['p', pathTile],
    ['s', sandTile],
    ['n', snowTile],
    ['w', waterTile],
  ]

  const tilePathByCode = new Map<string, string>(tilePaths)

  let {
    centerX,
    centerY,
    x = 0,
    y = 0,
    width,
    height,
    size,
    tileSize = 64,
  }: Props = $props()

  const positiveInteger = (value: number | undefined, fallback: number) => {
    const normalized = Math.floor(value ?? fallback)
    return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback
  }

  let cameraX = $derived(centerX ?? x ?? 0)
  let cameraY = $derived(centerY ?? y ?? 0)
  let columns = $derived(positiveInteger(width ?? size, 10))
  let rows = $derived(positiveInteger(height ?? size, 10))
  let normalizedTileSize = $derived(positiveInteger(tileSize, 64))
  let firstX = $derived(Math.floor(cameraX - columns / 2))
  let firstY = $derived(Math.floor(cameraY - rows / 2))

  let tiles: VisibleTile[] = $derived.by(() => {
    const groundMap = globalThis.groundMap ?? []
    const result: VisibleTile[] = []

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const mapX = firstX + column
        const mapY = firstY + row
        const code = groundMap[mapY]?.[mapX]

        result.push({
          key: `${mapX}:${mapY}`,
          code,
          source: code === undefined ? undefined : tilePathByCode.get(code),
        })
      }
    }

    return result
  })
</script>

<div
  class="terrain-map"
  role="img"
  aria-label="Карта местности"
  style:--columns={columns}
  style:--rows={rows}
  style:--tile-size={`${normalizedTileSize}px`}
>
  {#each tiles as tile (tile.key)}
    <div class="tile" data-code={tile.code}>
      {#if tile.source}
        <img src={tile.source} alt="" draggable="false" />
      {/if}
    </div>
  {/each}
</div>

<style>
  :host {
    display: inline-block;
    line-height: 0;
  }

  .terrain-map {
    display: grid;
    grid-template-columns: repeat(var(--columns), var(--tile-size));
    grid-template-rows: repeat(var(--rows), var(--tile-size));
    overflow: hidden;
    width: calc(var(--columns) * var(--tile-size));
    height: calc(var(--rows) * var(--tile-size));
    background: transparent;
    image-rendering: pixelated;
  }

  .tile,
  img {
    width: var(--tile-size);
    height: var(--tile-size);
  }

  .tile {
    overflow: hidden;
  }

  img {
    display: block;
    user-select: none;
  }
</style>
