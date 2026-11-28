<svelte:options
  customElement={{
    tag: 'personas-layer',
    props: {
      centerX: { attribute: 'center-x', type: 'Number' },
      centerY: { attribute: 'center-y', type: 'Number' },
      x: { type: 'Number' },
      y: { type: 'Number' },
      width: { type: 'Number' },
      height: { type: 'Number' },
      size: { type: 'Number' },
      tileSize: { attribute: 'tile-size', type: 'Number' },
      playerX: { attribute: 'player-x', type: 'Number' },
      playerY: { attribute: 'player-y', type: 'Number' },
      direction: { type: 'String' },
      walking: { type: 'Boolean' },
    },
  }}
/>

<script lang="ts">
  interface Props {
    centerX?: number
    centerY?: number
    x?: number
    y?: number
    width?: number
    height?: number
    size?: number
    tileSize?: number
    playerX?: number
    playerY?: number
    direction?: 'left' | 'right'
    walking?: boolean
  }

  let {
    centerX,
    centerY,
    x = 0,
    y = 0,
    width,
    height,
    size,
    tileSize = 64,
    playerX = 0,
    playerY = 0,
    direction = 'left',
    walking = false,
  }: Props = $props()

  const positiveInteger = (value: number | undefined, fallback: number) => {
    const normalized = Math.floor(value ?? fallback)
    return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback
  }

  let cameraX = $derived(centerX ?? x ?? 0)
  let cameraY = $derived(centerY ?? y ?? 0)
  let columns = $derived(positiveInteger(width ?? size, 10))
  let rows = $derived(positiveInteger(height ?? size, 10))
  let normalizedTileSize = $derived(
    Number.isFinite(tileSize) && tileSize > 0 ? tileSize : 64,
  )
  let firstX = $derived(Math.floor(cameraX - columns / 2))
  let firstY = $derived(Math.floor(cameraY - rows / 2))
</script>

<div
  class="personas-layer"
  style:--columns={columns}
  style:--rows={rows}
  style:--tile-size={`${normalizedTileSize}px`}
>
  <game-persona
    x={playerX - firstX}
    y={playerY - firstY}
    tile-size={normalizedTileSize}
    {direction}
    {walking}
  ></game-persona>
</div>

<style>
  :host {
    position: absolute;
    display: block;
    line-height: 0;
    inset: 0;
    pointer-events: none;
  }

  .personas-layer {
    position: relative;
    width: calc(var(--columns) * var(--tile-size));
    height: calc(var(--rows) * var(--tile-size));
    overflow: hidden;
  }
</style>
