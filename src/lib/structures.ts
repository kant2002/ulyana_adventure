export interface StructureDefinition {
  baseCode: string
  defaultImage: string
  alternativeImages: Record<string, string>
  size: {
    width: number
    height: number
  }
}

export interface StructureInstance {
  code: string
  x: number
  y: number
  alternativeCode?: string
  id: string
}

export interface StructureSize {
  code: string
  width: number
  height: number
}

export const structureSizes: StructureSize[] = [
  { code: 'ancient-tree', width: 4, height: 5 },
  { code: 'arena', width: 4, height: 4 },
  { code: 'arena-notiles', width: 4, height: 3 },
  { code: 'arena-snowy', width: 4, height: 4 },
  { code: 'arena-snowy-notiles', width: 4, height: 3 },
  { code: 'bronzefan-tree', width: 2, height: 3 },
  { code: 'bronzefan-tree-dec', width: 2, height: 3 },
  { code: 'bronzefan-tree-nov', width: 2, height: 3 },
  { code: 'cedar', width: 1, height: 2 },
  { code: 'constructing-building-1', width: 4, height: 2 },
  { code: 'constructing-building-foundation', width: 4, height: 2 },
  { code: 'coral-arena-blocked', width: 4, height: 4 },
  { code: 'coral-arena-open', width: 4, height: 4 },
  { code: 'fallen-cloud', width: 3, height: 2 },
  { code: 'fountain', width: 5, height: 3 },
  { code: 'fountain-spring', width: 5, height: 3 },
  { code: 'gaping-pit', width: 5, height: 3 },
  { code: 'house', width: 4, height: 2 },
  { code: 'house-snowy', width: 4, height: 2 },
  { code: 'house2', width: 4, height: 2 },
  { code: 'house2-snowy', width: 4, height: 2 },
  { code: 'iceberg-ice', width: 2, height: 2 },
  { code: 'iceberg-notiles', width: 2, height: 2 },
  { code: 'iceberg-notiles-noshade', width: 2, height: 2 },
  { code: 'iceberg-ocean', width: 2, height: 2 },
  { code: 'landing-tower', width: 1, height: 4 },
  { code: 'lava-pond', width: 4, height: 2 },
  { code: 'lava-pond-cooled', width: 4, height: 2 },
  { code: 'lava-pond-cooled-dustgrass', width: 4, height: 2 },
  { code: 'lava-pond-cooled-notiles', width: 4, height: 2 },
  { code: 'lava-pond-dustgrass', width: 4, height: 2 },
  { code: 'lava-pond-notiles', width: 4, height: 2 },
  { code: 'maelstrom', width: 4, height: 2 },
  { code: 'maelstrom-disturbed', width: 4, height: 2 },
  { code: 'mineral-spring', width: 3, height: 2 },
  { code: 'mineral-spring-frozen', width: 3, height: 2 },
  { code: 'mineral-spring-snowy', width: 3, height: 2 },
  { code: 'oats', width: 1, height: 2 },
  { code: 'olive-tree', width: 1, height: 2 },
  { code: 'olive-tree-blossom', width: 1, height: 2 },
  { code: 'olive-tree-olives', width: 1, height: 2 },
  { code: 'pine', width: 1, height: 2 },
  { code: 'pine-bare', width: 1, height: 2 },
  { code: 'pine-deco', width: 1, height: 2 },
  { code: 'school', width: 4, height: 4 },
  { code: 'school-notiles', width: 4, height: 3 },
  { code: 'school-snowy', width: 4, height: 4 },
  { code: 'school-snowy-notiles', width: 4, height: 3 },
  { code: 'shop', width: 4, height: 4 },
  { code: 'shop-notiles', width: 4, height: 3 },
  { code: 'shop-snowy', width: 4, height: 4 },
  { code: 'shop-snowy-notiles', width: 4, height: 3 },
  { code: 'station', width: 3, height: 5 },
  { code: 'station-notiles', width: 3, height: 4 },
  { code: 'station-snowy', width: 3, height: 5 },
  { code: 'station-snowy-notiles', width: 3, height: 4 },
  { code: 'steppe-farm', width: 4, height: 3 },
  { code: 'table-1', width: 2, height: 1 },
  { code: 'table-2', width: 2, height: 1 },
  { code: 'table-housing', width: 2, height: 1 },
  { code: 'tall-tree', width: 1, height: 2 },
  { code: 'tall-tree-apr-deco', width: 1, height: 2 },
  { code: 'tall-tree-dec', width: 1, height: 2 },
  { code: 'tall-tree-dec-deco', width: 1, height: 2 },
  { code: 'tall-tree-mar-deco', width: 1, height: 2 },
  { code: 'tall-tree-may-deco', width: 1, height: 2 },
  { code: 'tall-tree-nov-deco', width: 1, height: 2 },
  { code: 'tall-tree-oct-deco', width: 1, height: 2 },
  { code: 'tall-tree-sep-deco', width: 1, height: 2 },
  { code: 'windmill', width: 3, height: 4 },
  { code: 'winter-orb', width: 2, height: 3 },
  { code: 'winter-orb-bare-notiles', width: 2, height: 3 },
  { code: 'winter-orb-bare-notiles-noshade', width: 2, height: 3 },
  { code: 'winter-orb-chars', width: 2, height: 3 },
  { code: 'winter-orb-chars-notiles', width: 2, height: 3 },
  { code: 'winter-orb-chars-notiles-noshade', width: 2, height: 3 },
  { code: 'winter-orb-filling', width: 2, height: 3 },
  { code: 'winter-orb-filling-notiles', width: 2, height: 3 },
  { code: 'winter-orb-filling-notiles-noshade', width: 2, height: 3 },
  { code: 'winter-orb-ice', width: 2, height: 3 },
  { code: 'winter-orb-ice-chars', width: 2, height: 3 },
  { code: 'winter-orb-ice-chars-notiles', width: 2, height: 3 },
  { code: 'winter-orb-ice-chars-notiles-noshade', width: 2, height: 3 },
  { code: 'winter-orb-ice-notiles', width: 2, height: 3 },
  { code: 'winter-orb-ice-notiles-noshade', width: 2, height: 3 },
  { code: 'winter-orb-net', width: 2, height: 3 },
  { code: 'winter-orb-net-notiles', width: 2, height: 3 },
  { code: 'winter-orb-net-notiles-noshade', width: 2, height: 3 },
  { code: 'winter-orb-notiles', width: 2, height: 3 },
  { code: 'winter-orb-notiles-noshade', width: 2, height: 3 },
  { code: 'winter-orb-snow-chars', width: 2, height: 3 },
  { code: 'workshop', width: 4, height: 4 },
  { code: 'workshop-notiles', width: 4, height: 3 },
  { code: 'workshop-snowy', width: 4, height: 4 },
  { code: 'workshop-snowy-notiles', width: 4, height: 3 },
]

const structureModules = import.meta.glob('../../assets/structures/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const normalizeCode = (value: string) =>
  value
    .replace(/\.png$/i, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/giu, '-')
    .replace(/^-+|-+$/g, '')

export const describeStructures = (): Record<string, StructureDefinition> => {
  const moduleFiles = Object.entries(structureModules).map(([path, image]) => {
    const fileName = path.split('/').pop() ?? path
    const name = fileName.replace(/\.png$/i, '').trim()
    return { name, code: normalizeCode(name), image }
  })
  const files = moduleFiles

  const definitions: Record<string, StructureDefinition> = {}

  for (const file of files) {
    let baseCode = file.code
    let alternativeCode: string | undefined

    const plainFile = files.find(
      (candidate) =>
        candidate.name === file.name ||
        normalizeCode(candidate.name) === normalizeCode(file.name),
    )

    if (plainFile) {
      const knownVariants = [
        ' snowy player',
        ' snowy avail',
        ' player',
        ' avail',
        ' opened',
        ' construction',
        ' filled',
        ' flowers',
        ' planted',
        ' sapling',
        ' berries',
        ' snow',
        ' cut',
        ' bare',
        ' dec',
        ' nov',
        ' oct',
        ' sep',
        ' apr',
        ' may',
        ' jun',
        ' jul',
        ' aug',
        ' mar',
        ' jan',
      ]

      for (const variant of knownVariants) {
        if (file.name.toLowerCase().endsWith(variant)) {
          baseCode = normalizeCode(file.name.slice(0, -variant.length))
          alternativeCode = normalizeCode(file.name.slice(-variant.length))
          break
        }
      }
    }

    const existing = definitions[baseCode]
    if (!existing) {
      const hasPlainDefault = files.some(
        (candidate) => normalizeCode(candidate.name) === baseCode &&
          candidate.name === candidate.name.replace(/ (snowy|player|avail|opened|construction|filled|flowers|planted|sapling|berries|snow|cut|bare|dec|nov|oct|sep|apr|may|jun|jul|aug|mar|jan)$/i, ''),
      )

      const defaultImage = hasPlainDefault
        ? files.find((candidate) => normalizeCode(candidate.name) === baseCode)?.image
          ?? file.image
        : file.image
      const configuredSize = structureSizes.find(
        (size) => normalizeCode(size.code) === baseCode,
      )
      const width = configuredSize && configuredSize.width > 0
        ? configuredSize.width
        : 1
      const height = configuredSize && configuredSize.height > 0
        ? configuredSize.height
        : 1

      definitions[baseCode] = {
        baseCode,
        defaultImage,
        alternativeImages: {},
        size: {
          width,
          height,
        },
      }
    }

    if (alternativeCode) {
      definitions[baseCode].alternativeImages[alternativeCode] = file.image
    }
  }

  globalThis.structures = definitions
  return definitions
}

export const createStructure = (
  code: string,
  x: number,
  y: number,
  alternativeCode?: string,
): StructureInstance | undefined => {
  const normalizedCode = normalizeCode(code)
  const structures = globalThis.structures ?? describeStructures()
  if (!structures[normalizedCode]) return undefined

  const structure: StructureInstance = {
    id: `structure-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    code: normalizedCode,
    x: Math.floor(x),
    y: Math.floor(y),
    alternativeCode,
  }

  globalThis.globalStructures = [
    ...(globalThis.globalStructures ?? []),
    structure,
  ]
  globalThis.dispatchEvent?.(
    new CustomEvent('structureschange', {
      detail: globalThis.globalStructures,
    }),
  )

  return structure
}

export const removeStructure = (id: string) => {
  globalThis.globalStructures = (globalThis.globalStructures ?? [])
    .filter((structure) => structure.id !== id)
  globalThis.dispatchEvent?.(
    new CustomEvent('structureschange', {
      detail: globalThis.globalStructures,
    }),
  )
}
