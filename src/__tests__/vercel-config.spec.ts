import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Vercel Configuration', () => {
  const getVercelConfig = () => {
    const configPath = join(process.cwd(), 'vercel.json')
    const configContent = readFileSync(configPath, 'utf-8')
    return JSON.parse(configContent)
  }

  it('should have valid JSON configuration', () => {
    expect(() => getVercelConfig()).not.toThrow()
  })

  it('should configure Astro as the framework', () => {
    const config = getVercelConfig()
    expect(config.framework).toBe('astro')
  })

  it('should have correct build commands', () => {
    const config = getVercelConfig()
    expect(config.buildCommand).toBe('pnpm build')
    expect(config.outputDirectory).toBe('dist')
    expect(config.installCommand).toBe('pnpm install')
    expect(config.devCommand).toBe('pnpm dev')
  })

  it('should have security headers configured', () => {
    const config = getVercelConfig()
    const headers = config.headers?.[0]?.headers || []

    const expectedHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    }

    for (const [key, value] of Object.entries(expectedHeaders)) {
      const header = headers.find((h: any) => h.key === key)
      expect(header).toBeDefined()
      expect(header?.value).toBe(value)
    }
  })

  it('should have Content Security Policy configured', () => {
    const config = getVercelConfig()
    const headers = config.headers?.[0]?.headers || []

    const cspHeader = headers.find((h: any) => h.key === 'Content-Security-Policy')
    expect(cspHeader).toBeDefined()
    expect(cspHeader?.value).toContain("default-src 'self'")
    expect(cspHeader?.value).toContain("script-src 'self' 'unsafe-inline' https://web3forms.com")
    expect(cspHeader?.value).toContain("connect-src 'self' https://web3forms.com")
  })

  it('should have caching headers for static assets', () => {
    const config = getVercelConfig()
    const assetHeaders = config.headers?.find((h: any) => h.source === '/assets/(.*)')

    expect(assetHeaders).toBeDefined()
    const cacheHeader = assetHeaders?.headers?.find((h: any) => h.key === 'Cache-Control')
    expect(cacheHeader).toBeDefined()
    expect(cacheHeader?.value).toBe('public, max-age=31536000, immutable')
  })

  it('should have caching headers for font files', () => {
    const config = getVercelConfig()
    const fontHeaders = config.headers?.find((h: any) => h.source === '/fonts/(.*)')

    expect(fontHeaders).toBeDefined()
    const cacheHeader = fontHeaders?.headers?.find((h: any) => h.key === 'Cache-Control')
    expect(cacheHeader).toBeDefined()
    expect(cacheHeader?.value).toBe('public, max-age=31536000, immutable')
  })

  it('should apply headers to all routes', () => {
    const config = getVercelConfig()
    const globalHeaders = config.headers?.find((h: any) => h.source === '/(.*)')

    expect(globalHeaders).toBeDefined()
    expect(globalHeaders?.headers?.length).toBeGreaterThan(0)
  })
})
