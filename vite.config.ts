import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base =
  process.env.GITHUB_ACTIONS === 'true' &&
  repository &&
  !repository.endsWith('.github.io')
    ? `/${repository}/`
    : '/'

export default defineConfig({
  base,
  plugins: [
    svelte({
      dynamicCompileOptions({ filename }) {
        if (filename.replaceAll('\\', '/').endsWith('/TerrainMap.svelte')) {
          return { customElement: true }
        }
      },
    }),
  ],
})
