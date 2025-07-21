import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  site: 'https://monkcode.dev',
  integrations: [
    vue({
      jsx: false, // We use templates, not JSX
      devtools: false, // Temporarily disabled due to conflict with Tailwind CSS v4
    }),
    sitemap(),
    compress({
      html: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
        minifyCSS: true,
        minifyJS: true,
      },
      css: true,
      js: true,
      img: true,
      svg: true,
    }),
  ],
  output: 'static', // Portfolio site is static
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Enable image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Merge with Vitest config
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@lib': '/src/lib',
      },
    },
  },
})
