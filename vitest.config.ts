import { defineConfig } from 'vitest/config'
import { getViteConfig } from 'astro/config'

export default defineConfig(
  getViteConfig({
    test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      },
      exclude: [
        'node_modules/**',
        'dist/**',
        '.astro/**',
        'test/**',
        '**/*.config.*',
        '**/*.d.ts'
      ]
    },
    include: ['src/**/*.spec.ts'],
    setupFiles: ['./test/setup.ts']
  }
})
)