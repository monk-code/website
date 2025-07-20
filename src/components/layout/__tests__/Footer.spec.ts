import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import Footer from '../Footer.astro'

describe('Footer', () => {
  it('renders the footer with proper structure', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)

    expect(result).toContain('<footer')
    expect(result).toContain('role="contentinfo"')
  })

  it('displays copyright with current year', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)
    const currentYear = new Date().getFullYear()

    expect(result).toContain(`© ${currentYear}`)
  })

  it('renders brand column with site name', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)

    expect(result).toContain('MONKCODE')
    expect(result).toContain('class="font-montserrat font-bold text-xl text-primary"')
  })

  it('renders connect links section', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)

    // Check section heading
    expect(result).toContain('Connect')

    // Check links exist
    expect(result).toContain('href="mailto:')
    expect(result).toContain('github.com')
    expect(result).toContain('linkedin.com')
  })

  it('renders navigation links section', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)

    // Check section heading
    expect(result).toContain('Navigate')

    // Check navigation links
    expect(result).toContain('href="/"')
    expect(result).toContain('href="#about"')
    expect(result).toContain('href="#projects"')
    expect(result).toContain('href="#contact"')
  })

  it('renders tech stack credits', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)

    // Check for "Built with" text
    expect(result).toContain('Built with')

    // Check tech stack links
    expect(result).toContain('href="https://astro.build"')
    expect(result).toContain('href="https://vuejs.org"')
    expect(result).toContain('href="https://tailwindcss.com"')
    expect(result).toContain('Astro')
    expect(result).toContain('Vue')
    expect(result).toContain('Tailwind CSS')
  })

  it('external links have proper attributes', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)

    // Check that external links have proper attributes
    expect(result).toMatch(/href="https[^"]+"[^>]+target="_blank"/)
    expect(result).toMatch(/href="https[^"]+"[^>]+rel="noopener noreferrer"/)
  })

  it('has responsive layout classes', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)

    // Should have responsive grid classes
    expect(result).toContain('grid grid-cols-1 md:grid-cols-3')
  })

  it('has proper background styling', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Footer)

    // Check for light background classes
    expect(result).toContain('bg-white')
    expect(result).toContain('border-t')
    expect(result).toContain('border-neutral-200')
  })
})
