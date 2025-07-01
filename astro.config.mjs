import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      jsx: false, // We use templates, not JSX
      devtools: false, // Temporarily disabled due to conflict with Tailwind CSS v4
    }),
  ],
  output: 'static', // Portfolio site is static
  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },
  vite: {
    plugins: [tailwindcss()],
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