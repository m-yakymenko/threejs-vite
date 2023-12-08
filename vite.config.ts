import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig(({ command }) => {
  const config = {
    plugins: [preact()],
    base: '/',
    resolve: {
      alias: {
        src: "/src",
      },
    },
  }

  if (command !== 'serve') {
    config.base = '/threejs-vite/'
  }

  return config
})
