import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      jsx: false, // We use templates, not JSX
      devtools: true, // Enable Vue DevTools in development
    }),
    tailwind({
      applyBaseStyles: false, // We'll control base styles for MONKCODE brand
    })
  ],
  output: 'static', // Portfolio site is static
  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },
  vite: {
    // Merge with Vitest config
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@lib': '/src/lib'
      }
    }
  }
})