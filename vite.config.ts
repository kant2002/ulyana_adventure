import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base =
  process.env.PAGES_BASE ??
  (process.env.GITHUB_ACTIONS === 'true' &&
  repository &&
  !repository.endsWith('.github.io')
    ? `/${repository}/`
    : '/')

export default defineConfig({
  base,
  plugins: [
    svelte({
      dynamicCompileOptions({ filename }) {
        const customElementNames = [
          '/TerrainMap.svelte',
          '/Structure.svelte',
          '/StructuresLayer.svelte',
        ]
        if (
          customElementNames.some((name) =>
            filename.replaceAll('\\', '/').endsWith(name),
          )
        ) {
          return { customElement: true }
        }
      },
    }),
  ],
})
