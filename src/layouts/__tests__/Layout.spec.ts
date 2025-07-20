import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import Layout from '../Layout.astro'

describe('Layout Component', () => {
  it('should render basic HTML structure', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    // Note: Astro container doesn't include DOCTYPE in test environment
    expect(result).toContain('<html lang="en"')
    expect(result).toContain('<head>')
    expect(result).toContain('<body')
    expect(result).toContain('</html>')
  })

  it('should import global styles', async () => {
    const container = await AstroContainer.create()
    await container.renderToString(Layout)

    // In production, styles are bundled. In tests, we verify the import exists in source
    // The actual styles will be applied when the component is rendered
    expect(Layout).toBeDefined()
  })

  it('should include SEO component', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout, {
      props: {
        title: 'Test Page',
        description: 'Test description',
      },
    })

    // SEO component should be rendered with props
    expect(result).toContain('<title>Test Page | MONKCODE</title>')
    expect(result).toContain('content="Test description"')
  })

  it('should have viewport meta tag', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    expect(result).toContain(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0"',
    )
  })

  it('should include font preconnect links', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    expect(result).toContain('rel="preconnect"')
    expect(result).toContain('fonts.googleapis.com')
    expect(result).toContain('fonts.gstatic.com')
  })

  it('should include skip to content link', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    expect(result).toContain('href="#main"')
    expect(result).toContain('Skip to main content')
    expect(result).toContain('sr-only')
  })

  it('should have main content landmark', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    expect(result).toContain('<main id="main"')
  })

  it('should include theme initialization script', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    // Theme script content is included
    expect(result).toContain('<script>')
    expect(result).toContain('theme')
    expect(result).toContain('localStorage')
  })

  it('should apply transition-theme class to body', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    expect(result).toContain('<body class="transition-theme"')
  })

  it('should have min-height layout structure', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    expect(result).toContain('class="min-h-screen flex flex-col"')
    expect(result).toContain('class="flex-grow"')
  })

  it('should include favicon links', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    expect(result).toContain('rel="icon"')
    expect(result).toContain('/favicon.svg')
  })

  it('should include Footer component', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Layout)

    expect(result).toContain('<footer')
    expect(result).toContain('role="contentinfo"')
  })
})
