import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import About from '../About.astro'

describe('About Section', () => {
  describe('Section Structure', () => {
    it('should render the about section with proper id and semantic elements', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      expect(result).toContain('id="about"')
      expect(result).toContain('<section')
      expect(result).toContain('class="content-container')
    })

    it('should include section header with decorative divider', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      expect(result).toContain('<h2')
      expect(result).toContain('About')
      expect(result).toContain('section-title')
    })

    it('should have fade-in animation classes for scroll effects', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      expect(result).toContain('fade-in')
    })
  })

  describe('Content Sections', () => {
    it('should include brief introduction with name highlight', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      expect(result).toContain('Gregory')
      expect(result).toContain('history')
      expect(result).toContain('frontend development')
    })

    it('should include personal touches and interests', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      expect(result).toContain('Monk')
      expect(result).toContain('comedy')
    })
  })

  describe('Simple Design', () => {
    it('should maintain clean visual design with reduced content', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      expect(result).toContain('content-container')
      expect(result).toContain('section-background')
    })
  })

  describe('Visual Design', () => {
    it('should include background patterns and gradient effects', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      expect(result).toContain('section-background')
      expect(result).toContain('floating-shapes')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      // Main section heading should be h2 (after h1 hero)
      expect(result).toContain('<h2')
    })

    it('should include proper semantic structure', async () => {
      const container = await AstroContainer.create()
      const result = await container.renderToString(About)

      expect(result).toContain('<section')
      expect(result).toContain('<div class="content-container')
    })
  })
})