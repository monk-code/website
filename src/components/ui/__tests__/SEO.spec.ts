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

  it('should include hreflang tags for multi-language support', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO)

    // Should include Dutch (primary) and English hreflang tags
    expect(result).toContain('<link rel="alternate" hreflang="nl-BE"')
    expect(result).toContain('<link rel="alternate" hreflang="en"')
    expect(result).toContain('<link rel="alternate" hreflang="x-default"')
  })

  it('should include geo-targeting meta tags for Gent location', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO)

    // Geographic targeting for Gent, Belgium
    expect(result).toContain('<meta name="geo.region" content="BE-VLG"')
    expect(result).toContain('<meta name="geo.placename" content="Gent"')
    expect(result).toContain('<meta name="geo.position" content="51.0500;3.7167"')
    expect(result).toContain('<meta name="ICBM" content="51.0500, 3.7167"')
  })

  it('should include LocalBusiness structured data for local SEO', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO)

    // Should include LocalBusiness JSON-LD (JSON is minified)
    expect(result).toContain('<script type="application/ld+json">')
    expect(result).toContain('"@type":"LocalBusiness"')
    expect(result).toContain('"name":"MONKCODE"')
    expect(result).toContain('"address"')
    expect(result).toContain('"addressLocality":"Gent"')
    expect(result).toContain('"addressCountry":"BE"')
  })

  it('should include Person structured data for professional SEO', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(SEO)

    // Should include Person JSON-LD (JSON is minified)
    expect(result).toContain('"@type":"Person"')
    expect(result).toContain('"name":"Gregory Deseck"')
    expect(result).toContain('"jobTitle":"Frontend Developer"')
    expect(result).toContain('"knowsAbout"')
    expect(result).toContain('"Vue.js"')
    expect(result).toContain('"website laten maken"')
  })
})
