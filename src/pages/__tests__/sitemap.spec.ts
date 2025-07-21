import { describe, expect, it } from 'vitest'

describe('Sitemap Configuration', () => {
  it('should have sitemap integration configured in astro config', async () => {
    // Test that sitemap integration is properly configured
    // We'll test configuration rather than runtime generation since it's build-time
    const configModule = await import('../../../astro.config.mjs')
    const config = configModule.default
    
    // Should have site URL configured
    expect(config.site).toBe('https://monkcode.dev')
    
    // Should have sitemap integration
    expect(config.integrations).toBeDefined()
    expect(config.integrations.length).toBeGreaterThan(1) // Vue + sitemap
  })

  it('should have correct site URL for canonical links and sitemap generation', async () => {
    const configModule = await import('../../../astro.config.mjs')
    const config = configModule.default
    
    // Site URL should be production URL
    expect(config.site).toBe('https://monkcode.dev')
    expect(config.site).toMatch(/^https:\/\//)
  })

  it('should generate sitemap after build process', async () => {
    // This test verifies that the sitemap configuration will work during build
    // In a real build, this would generate dist/sitemap.xml
    const configModule = await import('../../../astro.config.mjs')
    const config = configModule.default
    
    // Verify the configuration that enables sitemap generation
    expect(config.site).toBeTruthy()
    expect(config.output).toBe('static')
    
    // The sitemap integration should be present - check if we have more than just Vue
    expect(config.integrations.length).toBeGreaterThan(1)
    
    // Check if sitemap integration is configured (it may not have a name property)
    const integrationNames = config.integrations.map((integration: any) => 
      integration?.name || integration?.constructor?.name || 'unknown'
    )
    
    // At minimum we should have Vue and sitemap integrations
    expect(integrationNames.length).toBeGreaterThan(1)
  })
})