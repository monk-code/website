import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Design System Implementation', () => {
  const getGlobalStyles = () => readFileSync(resolve(__dirname, '../global.css'), 'utf-8')

  describe('Brand Colors', () => {
    it('should define MONKCODE brand colors as CSS custom properties', () => {
      const styles = getGlobalStyles()

      // Brand colors should be defined in @theme
      expect(styles).toContain('--color-monk-yellow: #FFDE0A')
      expect(styles).toContain('--color-code-black: #121212')
      expect(styles).toContain('--color-silent-white: #F5F5F5')
      expect(styles).toContain('--color-rhythm-grey: #4a5568')
    })

    it('should define semantic color mappings', () => {
      const styles = getGlobalStyles()

      // Semantic colors for theming
      expect(styles).toContain('--color-primary:')
      expect(styles).toContain('--color-primary-foreground:')
      expect(styles).toContain('--color-accent:')
      expect(styles).toContain('--color-accent-foreground:')
      expect(styles).toContain('--color-background:')
      expect(styles).toContain('--color-foreground:')
    })

    it('should have dark mode overrides', () => {
      const styles = getGlobalStyles()

      expect(styles).toContain('[data-theme="dark"]')
    })
  })

  describe('Typography', () => {
    it('should define brand font families', () => {
      const styles = getGlobalStyles()

      expect(styles).toContain('--font-family-heading: Montserrat')
      expect(styles).toContain('--font-family-body: Inter')
      expect(styles).toContain("--font-family-mono: 'JetBrains Mono'")
    })

    it('should apply typography to base elements', () => {
      const styles = getGlobalStyles()

      expect(styles).toContain('body {')
      expect(styles).toContain('font-family: var(--font-family-body)')
      expect(styles).toContain('h1, h2, h3, h4, h5, h6')
      expect(styles).toContain('font-family: var(--font-family-heading)')
    })
  })

  describe('Base Styles', () => {
    it('should apply semantic colors to body', () => {
      const styles = getGlobalStyles()

      expect(styles).toMatch(/@apply\s+bg-background\s+text-foreground/)
    })

    it('should include antialiased text rendering', () => {
      const styles = getGlobalStyles()

      expect(styles).toMatch(/@apply.*antialiased/)
    })

    it('should respect reduced motion preferences', () => {
      const styles = getGlobalStyles()

      expect(styles).toContain('@media (prefers-reduced-motion: reduce)')
      expect(styles).toContain('animation-duration: 0.01ms')
      expect(styles).toContain('transition-duration: 0.01ms')
    })
  })

  describe('Animation Utilities', () => {
    it('should define smooth theme transition utility', () => {
      const styles = getGlobalStyles()

      expect(styles).toContain('.transition-theme')
      expect(styles).toContain('transition-[color,background-color,border-color]')
    })
  })

  describe('Container Queries', () => {
    it('should support container queries for responsive components', () => {
      const styles = getGlobalStyles()

      expect(styles).toContain('container-type: inline-size')
      expect(styles).toContain('.project-card')
      expect(styles).toContain('@container (min-width: 20rem)')
    })
  })

  describe('Tailwind CSS v4 Structure', () => {
    it('should use @theme directive for custom properties', () => {
      const styles = getGlobalStyles()

      expect(styles).toContain('@theme {')
    })

    it('should use @layer for organizing styles', () => {
      const styles = getGlobalStyles()

      expect(styles).toContain('@layer base')
      expect(styles).toContain('@layer utilities')
      expect(styles).toContain('@layer components')
    })
  })
})
