import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import SEO from '../SEO.astro'

describe('SEO Component', () => {
  it('should render default meta tags when no props provided', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO)

    // Default title
    expect(result).toContain('<title>MONKCODE | Gregory Deseck - Frontend Developer</title>')
    expect(result).toContain(
      '<meta name="title" content="MONKCODE | Gregory Deseck - Frontend Developer"',
    )

    // Default description
    expect(result).toContain(
      'content="Freelance frontend developer creating fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture."',
    )

    // Default OG tags
    expect(result).toContain('<meta property="og:type" content="website"')
    expect(result).toContain('<meta property="og:title"')
    expect(result).toContain('<meta property="og:description"')
  })

  it('should render custom title and description when provided', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO, {
      props: {
        title: 'Custom Page Title',
        description: 'Custom page description',
      },
    })

    expect(result).toContain('<title>Custom Page Title | MONKCODE</title>')
    expect(result).toContain('<meta name="title" content="Custom Page Title | MONKCODE"')
    expect(result).toContain('content="Custom page description"')
  })

  it('should include Open Graph meta tags', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO)

    expect(result).toContain('<meta property="og:type"')
    expect(result).toContain('<meta property="og:title"')
    expect(result).toContain('<meta property="og:description"')
    expect(result).toContain('<meta property="og:image"')
  })

  it('should include Twitter card meta tags', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO)

    expect(result).toContain('<meta property="twitter:card" content="summary_large_image"')
    expect(result).toContain('<meta property="twitter:title"')
    expect(result).toContain('<meta property="twitter:description"')
    expect(result).toContain('<meta property="twitter:image"')
  })

  it('should accept custom OG image', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO, {
      props: {
        ogImage: '/custom-og-image.png',
      },
    })

    expect(result).toContain('/custom-og-image.png')
  })

  it('should set noindex when specified', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO, {
      props: {
        noindex: true,
      },
    })

    expect(result).toContain('<meta name="robots" content="noindex, nofollow"')
  })

  it('should include canonical URL', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO)

    expect(result).toContain('<link rel="canonical"')
  })
})
