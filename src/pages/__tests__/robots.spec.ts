import { describe, expect, it } from 'vitest'

describe('Robots.txt Configuration', () => {
  it('should have robots.txt file in public directory with proper directives', async () => {
    // Test that robots.txt file exists and has correct content
    // This will fail initially - we need to create robots.txt
    const fs = await import('node:fs/promises')
    
    try {
      await fs.access('./public/robots.txt')
      // If we get here, file exists
      expect(true).toBe(true)
    } catch {
      // Expected to fail - robots.txt doesn't exist yet
      expect(false).toBe(true) // Force failure to drive implementation
    }
  })

  it('should include sitemap reference in robots.txt', async () => {
    // Test that robots.txt references the sitemap for better SEO
    // This test will drive the content requirements
    const fs = await import('node:fs/promises')
    
    try {
      const robotsContent = await fs.readFile('./public/robots.txt', 'utf-8')
      
      // Should include sitemap directive
      expect(robotsContent).toContain('Sitemap: https://monkcode.dev/sitemap-index.xml')
      
      // Should allow all bots by default (portfolio site)
      expect(robotsContent).toContain('User-agent: *')
      expect(robotsContent).toContain('Allow: /')
      
    } catch (error) {
      // Expected to fail initially - drive implementation
      expect(true).toBe(false) // Force failure with descriptive message
    }
  })

  it('should have proper crawl directives for portfolio optimization', async () => {
    const fs = await import('node:fs/promises')
    
    try {
      const robotsContent = await fs.readFile('./public/robots.txt', 'utf-8')
      
      // Should not disallow any important content for a portfolio
      expect(robotsContent).not.toContain('Disallow: /')
      
      // Should include crawl delay if needed for server protection
      expect(robotsContent).toMatch(/Crawl-delay:|Allow: \//)
      
    } catch (error) {
      // Expected to fail initially
      expect(false).toBe(true)
    }
  })
})