export interface StructureDefinition {
  baseCode: string
  defaultImage: string
  alternativeImages: Record<string, string>
  passable?: boolean
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

export interface StructurePrototypeParameters {
  code: string
  width: number
  height: number
  passable: boolean
}

export const structureSizes: StructurePrototypeParameters[] = [
  { code: 'ancient-tree', width: 4, height: 5, passable: false },
  { code: 'arena', width: 4, height: 4, passable: false },
  { code: 'arena-notiles', width: 4, height: 3, passable: false },
  { code: 'arena-snowy', width: 4, height: 4, passable: false },
  { code: 'arena-snowy-notiles', width: 4, height: 3, passable: false },
  { code: 'bronzefan-tree', width: 2, height: 3, passable: false },
  { code: 'bronzefan-tree-dec', width: 2, height: 3, passable: false },
  { code: 'bronzefan-tree-nov', width: 2, height: 3, passable: false },
  { code: 'cedar', width: 1, height: 2, passable: false },
  { code: 'constructing-building-1', width: 4, height: 2, passable: false },
  { code: 'constructing-building-foundation', width: 4, height: 2, passable: false },
  { code: 'coral-arena-blocked', width: 4, height: 4, passable: false },
  { code: 'coral-arena-open', width: 4, height: 4, passable: false },
  { code: 'fallen-cloud', width: 3, height: 2, passable: false },
  { code: 'fountain', width: 5, height: 3, passable: false },
  { code: 'fountain-spring', width: 5, height: 3, passable: false },
  { code: 'gaping-pit', width: 5, height: 3, passable: false },
  { code: 'house', width: 4, height: 2, passable: false },
  { code: 'house-snowy', width: 4, height: 2, passable: false },
  { code: 'house2', width: 4, height: 2, passable: false },
  { code: 'house2-snowy', width: 4, height: 2, passable: false },
  { code: 'iceberg-ice', width: 2, height: 2, passable: false },
  { code: 'iceberg-notiles', width: 2, height: 2, passable: false },
  { code: 'iceberg-notiles-noshade', width: 2, height: 2, passable: false },
  { code: 'iceberg-ocean', width: 2, height: 2, passable: false },
  { code: 'landing-tower', width: 1, height: 4, passable: false },
  { code: 'lava-pond', width: 4, height: 2, passable: false },
  { code: 'lava-pond-cooled', width: 4, height: 2, passable: false },
  { code: 'lava-pond-cooled-dustgrass', width: 4, height: 2, passable: false },
  { code: 'lava-pond-cooled-notiles', width: 4, height: 2, passable: false },
  { code: 'lava-pond-dustgrass', width: 4, height: 2, passable: false },
  { code: 'lava-pond-notiles', width: 4, height: 2, passable: false },
  { code: 'maelstrom', width: 4, height: 2, passable: false },
  { code: 'maelstrom-disturbed', width: 4, height: 2, passable: false },
  { code: 'mineral-spring', width: 3, height: 2, passable: false },
  { code: 'mineral-spring-frozen', width: 3, height: 2, passable: false },
  { code: 'mineral-spring-snowy', width: 3, height: 2, passable: false },
  { code: 'oats', width: 1, height: 2, passable: false },
  { code: 'olive-tree', width: 1, height: 2, passable: false },
  { code: 'olive-tree-blossom', width: 1, height: 2, passable: false },
  { code: 'olive-tree-olives', width: 1, height: 2, passable: false },
  { code: 'pine', width: 1, height: 2, passable: false },
  { code: 'pine-bare', width: 1, height: 2, passable: false },
  { code: 'pine-deco', width: 1, height: 2, passable: false },
  { code: 'school', width: 4, height: 4, passable: false },
  { code: 'school-notiles', width: 4, height: 3, passable: false },
  { code: 'school-snowy', width: 4, height: 4, passable: false },
  { code: 'school-snowy-notiles', width: 4, height: 3, passable: false },
  { code: 'shop', width: 4, height: 4, passable: false },
  { code: 'shop-notiles', width: 4, height: 3, passable: false },
  { code: 'shop-snowy', width: 4, height: 4, passable: false },
  { code: 'shop-snowy-notiles', width: 4, height: 3, passable: false },
  { code: 'station', width: 3, height: 5, passable: false },
  { code: 'station-notiles', width: 3, height: 4, passable: false },
  { code: 'station-snowy', width: 3, height: 5, passable: false },
  { code: 'station-snowy-notiles', width: 3, height: 4, passable: false },
  { code: 'steppe-farm', width: 4, height: 3, passable: false },
  { code: 'table-1', width: 2, height: 1, passable: false },
  { code: 'table-2', width: 2, height: 1, passable: false },
  { code: 'table-housing', width: 2, height: 1, passable: false },
  { code: 'tall-tree', width: 1, height: 2, passable: false },
  { code: 'tall-tree-apr-deco', width: 1, height: 2, passable: false },
  { code: 'tall-tree-dec', width: 1, height: 2, passable: false },
  { code: 'tall-tree-dec-deco', width: 1, height: 2, passable: false },
  { code: 'tall-tree-mar-deco', width: 1, height: 2, passable: false },
  { code: 'tall-tree-may-deco', width: 1, height: 2, passable: false },
  { code: 'tall-tree-nov-deco', width: 1, height: 2, passable: false },
  { code: 'tall-tree-oct-deco', width: 1, height: 2, passable: false },
  { code: 'tall-tree-sep-deco', width: 1, height: 2, passable: false },
  { code: 'windmill', width: 3, height: 4, passable: false },
  { code: 'winter-orb', width: 2, height: 3, passable: false },
  { code: 'winter-orb-bare-notiles', width: 2, height: 3, passable: false },
  { code: 'winter-orb-bare-notiles-noshade', width: 2, height: 3, passable: false },
  { code: 'winter-orb-chars', width: 2, height: 3, passable: false },
  { code: 'winter-orb-chars-notiles', width: 2, height: 3, passable: false },
  { code: 'winter-orb-chars-notiles-noshade', width: 2, height: 3, passable: false },
  { code: 'winter-orb-filling', width: 2, height: 3, passable: false },
  { code: 'winter-orb-filling-notiles', width: 2, height: 3, passable: false },
  { code: 'winter-orb-filling-notiles-noshade', width: 2, height: 3, passable: false },
  { code: 'winter-orb-ice', width: 2, height: 3, passable: false },
  { code: 'winter-orb-ice-chars', width: 2, height: 3, passable: false },
  { code: 'winter-orb-ice-chars-notiles', width: 2, height: 3, passable: false },
  { code: 'winter-orb-ice-chars-notiles-noshade', width: 2, height: 3, passable: false },
  { code: 'winter-orb-ice-notiles', width: 2, height: 3, passable: false },
  { code: 'winter-orb-ice-notiles-noshade', width: 2, height: 3, passable: false },
  { code: 'winter-orb-net', width: 2, height: 3, passable: false },
  { code: 'winter-orb-net-notiles', width: 2, height: 3, passable: false },
  { code: 'winter-orb-net-notiles-noshade', width: 2, height: 3, passable: false },
  { code: 'winter-orb-notiles', width: 2, height: 3, passable: false },
  { code: 'winter-orb-notiles-noshade', width: 2, height: 3, passable: false },
  { code: 'winter-orb-snow-chars', width: 2, height: 3, passable: false },
  { code: 'workshop', width: 4, height: 4, passable: false },
  { code: 'workshop-notiles', width: 4, height: 3, passable: false },
  { code: 'workshop-snowy', width: 4, height: 4, passable: false },
  { code: 'workshop-snowy-notiles', width: 4, height: 3, passable: false },
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
        passable: configuredSize?.passable,
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

export const isPositionBlockedByStructure = (x: number, y: number): boolean =>
  (globalThis.globalStructures ?? []).some((structure) => {
    const definition = globalThis.structures?.[structure.code]
    return definition?.passable === false &&
      x >= structure.x &&
      x < structure.x + definition.size.width &&
      y >= structure.y &&
      y < structure.y + definition.size.height
  })

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

export const moveStructure = (id: string, x: number, y: number) => {
  const structures = globalThis.globalStructures ?? []
  if (!structures.some((structure) => structure.id === id)) return

  globalThis.globalStructures = structures.map((structure) =>
    structure.id === id ? { ...structure, x, y } : structure
  )
  globalThis.dispatchEvent?.(
    new CustomEvent('structureschange', {
      detail: globalThis.globalStructures,
    }),
  )
}
