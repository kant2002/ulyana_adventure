import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createServer } from 'vite'

let server
let structures

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })
  structures = await server.ssrLoadModule('/src/lib/structures.ts')
  structures.describeStructures()
})

after(async () => {
  await server?.close()
})

test('impassable structures block their whole footprint and not adjacent cells', () => {
  globalThis.globalStructures = []
  structures.createStructure('house', 5, 5, 'snowy-player')

  for (const [x, y] of [[5, 5], [8, 5], [5, 6], [8, 6]]) {
    assert.equal(structures.isPositionBlockedByStructure(x, y), true)
  }
  for (const [x, y] of [[4, 5], [9, 5], [5, 4], [5, 7]]) {
    assert.equal(structures.isPositionBlockedByStructure(x, y), false)
  }
})

test('passable and unspecified structures do not block unless another structure overlaps', () => {
  globalThis.globalStructures = []
  const house = structures.createStructure('house', 5, 5)
  structures.createStructure('appletree', 5, 5)
  globalThis.structures.house.passable = true

  assert.equal(structures.isPositionBlockedByStructure(5, 5), false)

  const workshop = structures.createStructure('workshop', 5, 5)
  assert.equal(structures.isPositionBlockedByStructure(5, 5), true)

  structures.removeStructure(workshop.id)
  assert.equal(structures.isPositionBlockedByStructure(5, 5), false)

  globalThis.structures.house.passable = false
  assert.equal(structures.isPositionBlockedByStructure(5, 5), true)
  structures.removeStructure(house.id)
  assert.equal(structures.isPositionBlockedByStructure(5, 5), false)
})
