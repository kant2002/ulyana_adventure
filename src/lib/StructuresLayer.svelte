<svelte:options
  customElement={{
    tag: 'structures-layer',
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
  import type { StructureInstance } from './structures'

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
  let normalizedTileSize = $derived(
    Number.isFinite(tileSize) && tileSize > 0 ? tileSize : 64,
  )
  let firstX = $derived(Math.floor(cameraX - columns / 2))
  let firstY = $derived(Math.floor(cameraY - rows / 2))

  let structures = $state<StructureInstance[]>([
    ...(globalThis.globalStructures ?? []),
  ])

  $effect(() => {
    const updateStructures = () => {
      structures = [...(globalThis.globalStructures ?? [])]
    }
    globalThis.addEventListener?.('structureschange', updateStructures)
    return () => globalThis.removeEventListener?.('structureschange', updateStructures)
  })

  let visibleStructures = $derived.by(() => {
    return structures.filter((structure) => {
      const definition = globalThis.structures?.[structure.code]
      const width = definition?.size.width ?? 1
      const height = definition?.size.height ?? 1
      return structure.x + width > firstX &&
        structure.x < firstX + columns &&
        structure.y + height > firstY &&
        structure.y < firstY + rows
    })
  })
</script>

<div
  class="structures-layer"
  role="img"
  aria-label="Слой строений"
  style:--columns={columns}
  style:--rows={rows}
  style:--tile-size={`${normalizedTileSize}px`}
  style:--offset-x={`${-firstX * normalizedTileSize}px`}
  style:--offset-y={`${-firstY * normalizedTileSize}px`}
>
  {#each visibleStructures as structure (structure.id)}
    <game-structure
      code={structure.code}
      alternative-code={structure.alternativeCode}
      x={structure.x + firstX * -1}
      y={structure.y + firstY * -1}
      tile-size={normalizedTileSize}
      width-in-tiles={globalThis.structures?.[structure.code]?.size.width ?? 1}
      height-in-tiles={globalThis.structures?.[structure.code]?.size.height ?? 1}
    ></game-structure>
  {/each}
</div>

<style>
  :host {
    position: absolute;
    display: block;
    line-height: 0;
    inset: 0;
  }

  .structures-layer {
    position: relative;
    width: calc(var(--columns) * var(--tile-size));
    height: calc(var(--rows) * var(--tile-size));
    overflow: hidden;
  }
</style>
