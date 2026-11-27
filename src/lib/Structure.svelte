<svelte:options
  customElement={{
    tag: 'game-structure',
    props: {
      code: { type: 'String' },
      alternativeCode: { attribute: 'alternative-code', type: 'String' },
      x: { type: 'Number' },
      y: { type: 'Number' },
      tileSize: { attribute: 'tile-size', type: 'Number' },
      widthInTiles: { attribute: 'width-in-tiles', type: 'Number' },
      heightInTiles: { attribute: 'height-in-tiles', type: 'Number' },
    },
  }}
/>

<script lang="ts">
  import type { StructureDefinition } from './structures'

  interface Props {
    code?: string
    alternativeCode?: string
    x?: number
    y?: number
    tileSize?: number
    widthInTiles?: number
    heightInTiles?: number
  }

  let {
    code = '',
    alternativeCode,
    x = 0,
    y = 0,
    tileSize = 64,
    widthInTiles = 1,
    heightInTiles = 1,
  }: Props = $props()

  let definition: StructureDefinition | undefined = $derived(
    globalThis.structures?.[code],
  )
  let source = $derived(
    (alternativeCode
      ? definition?.alternativeImages[alternativeCode]
      : undefined) ?? definition?.defaultImage,
  )
  let normalizedTileSize = $derived(
    Number.isFinite(tileSize) && tileSize > 0 ? tileSize : 64,
  )
  let normalizedWidth = $derived(
    Number.isFinite(widthInTiles) && widthInTiles > 0 ? widthInTiles : 1,
  )
  let normalizedHeight = $derived(
    Number.isFinite(heightInTiles) && heightInTiles > 0 ? heightInTiles : 1,
  )
</script>

{#if source}
  <img
    src={source}
    alt=""
    draggable="false"
    style:left={`${x * normalizedTileSize}px`}
    style:top={`${y * normalizedTileSize}px`}
    style:width={`${normalizedWidth * normalizedTileSize}px`}
    style:height={`${normalizedHeight * normalizedTileSize}px`}
  />
{/if}

<style>
  :host {
    display: block;
  }

  img {
    position: absolute;
    display: block;
    object-fit: contain;
    image-rendering: pixelated;
    user-select: none;
  }
</style>
