<svelte:options
  customElement={{
    tag: 'game-persona',
    props: {
      x: { type: 'Number' },
      y: { type: 'Number' },
      tileSize: { attribute: 'tile-size', type: 'Number' },
      direction: { type: 'String' },
      walking: { type: 'Boolean' },
    },
  }}
/>

<script lang="ts">
  import frame1 from '../../assets/sprites/characters/woman/Main character1.png'
  import frame2 from '../../assets/sprites/characters/woman/Main character2.png'
  import frame3 from '../../assets/sprites/characters/woman/Main character3.png'
  import frame4 from '../../assets/sprites/characters/woman/Main character4.png'

  interface Props {
    x?: number
    y?: number
    tileSize?: number
    direction?: 'left' | 'right'
    walking?: boolean
  }

  let {
    x = 0,
    y = 0,
    tileSize = 64,
    direction = 'left',
    walking = false,
  }: Props = $props()

  const frames = [frame1, frame2, frame3, frame4]
  let frame = $state(0)
  let normalizedTileSize = $derived(
    Number.isFinite(tileSize) && tileSize > 0 ? tileSize : 64,
  )

  $effect(() => {
    frame = 0
    if (!walking) return

    const timer = setInterval(() => {
      frame = (frame + 1) % frames.length
    }, 100)
    return () => clearInterval(timer)
  })
</script>

<img
  src={frames[frame]}
  alt="Игрок"
  draggable="false"
  class:walking
  class:face-right={direction === 'right'}
  style:left={`${x * normalizedTileSize}px`}
  style:top={`${y * normalizedTileSize}px`}
  style:width={`${normalizedTileSize}px`}
  style:height={`${normalizedTileSize}px`}
/>

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

  img.walking {
    transition: left 400ms linear;
  }

  img.face-right {
    transform: scaleX(-1);
  }
</style>
