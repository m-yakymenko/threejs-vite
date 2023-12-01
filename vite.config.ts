import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig(({ command }) => {
  const config = {
    plugins: [preact()],
    base: '/',
  }

  if (command !== 'serve') {
    config.base = '/threejs-vite/'
  }

  return config
})
