declare global {
  var groundMap: string[] | undefined
  var structures: Record<string, import('./lib/structures').StructureDefinition> | undefined
  var globalStructures: import('./lib/structures').StructureInstance[] | undefined
  function describeStructures(): Record<string, import('./lib/structures').StructureDefinition>
  function createStructure(
    code: string,
    x: number,
    y: number,
    alternativeCode?: string,
  ): import('./lib/structures').StructureInstance | undefined
}

export {}
