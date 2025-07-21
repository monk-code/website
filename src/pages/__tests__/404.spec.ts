import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

describe('404 Error Page - Design Showcase', () => {
  it('should have a delightful 404 page that users actually enjoy', async () => {
    // This test will fail initially - we need to create a beautiful 404 page
    const container = await AstroContainer.create()
    
    try {
      const NotFoundPage = await import('../404.astro')
      const result = await container.renderToString(NotFoundPage.default)
      
      // Should have engaging, brand-appropriate messaging
      expect(result).toContain('404')
      expect(result).toContain('MONKCODE') // Brand consistency
      
      // Should have delightful, professional content
      expect(result).toMatch(/not found|lost|missing/i)
      
      // Should maintain design system consistency
      expect(result).toContain('class=') // Has styling
      
    } catch (error) {
      // Log the actual error to understand what's happening
      console.error('404 page test error:', error)
      expect(false).toBe(true)
    }
  })

  it('should have clear navigation options that are visually prominent', async () => {
    const container = await AstroContainer.create()
    
    try {
      const NotFoundPage = await import('../404.astro')
      const result = await container.renderToString(NotFoundPage.default)
      
      // Should have clear navigation back to home
      expect(result).toContain('href="/"')
      
      // Should have attractive button styling
      expect(result).toContain('bg-button-primary') // Should use button classes
      
      // Should have helpful suggestions
      expect(result).toMatch(/home|back|explore/i)
      
    } catch (error) {
      // Expected to fail initially
      expect(false).toBe(true)
    }
  })

  it('should maintain professional brand aesthetic while being playful', async () => {
    const container = await AstroContainer.create()
    
    try {
      const NotFoundPage = await import('../404.astro')
      const result = await container.renderToString(NotFoundPage.default)
      
      // Should use consistent layout structure
      expect(result).toContain('Layout') // Should extend Layout component
      
      // Should have proper heading hierarchy
      expect(result).toContain('<h1')
      
      // Should have meta tags for SEO
      expect(result).toContain('title')
      expect(result).toContain('noindex') // 404 pages shouldn't be indexed
      
    } catch (error) {
      // Expected to fail initially
      expect(false).toBe(true)
    }
  })

  it('should have enhanced visual elements that showcase design skills', async () => {
    const container = await AstroContainer.create()
    
    try {
      const NotFoundPage = await import('../404.astro')
      const result = await container.renderToString(NotFoundPage.default)
      
      // Should have thoughtful typography and spacing
      expect(result).toContain('class=') // Uses design system classes
      
      // Should include visual elements (illustration, icons, etc.)
      expect(result).toMatch(/svg|icon|illustration/i)
      
      // Should have responsive design
      expect(result).toContain('md:') // Responsive classes
      
    } catch (error) {
      // Expected to fail initially
      expect(false).toBe(true)
    }
  })

  it('should have proper accessibility attributes', async () => {
    const container = await AstroContainer.create()
    
    try {
      const NotFoundPage = await import('../404.astro')
      const result = await container.renderToString(NotFoundPage.default)
      
      // Should have proper landmarks and structure
      expect(result).toContain('main') // Main content area
      
      // Links should be properly labeled
      expect(result).toMatch(/aria-label|title=/)
      
      // Should have semantic HTML structure
      expect(result).toContain('<h1') // Proper heading
      
    } catch (error) {
      // Expected to fail initially
      expect(false).toBe(true)
    }
  })
})