import { mount } from 'svelte'
import './app.css'
import './lib/TerrainMap.svelte'
import './lib/Structure.svelte'
import './lib/StructuresLayer.svelte'
import './lib/Persona.svelte'
import './lib/PersonasLayer.svelte'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
