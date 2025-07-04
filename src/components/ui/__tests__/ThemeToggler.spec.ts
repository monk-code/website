import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import ThemeToggler from '../ThemeToggler.astro'

describe('ThemeToggler Component', () => {
  it('should render a button with accessibility attributes', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemeToggler)

    expect(result).toContain('<button')
    expect(result).toContain('id="theme-toggle"')
    expect(result).toContain('aria-label="Toggle color theme"')
    expect(result).toContain('aria-live="polite"')
    expect(result).toContain('data-theme-toggle')
  })

  it('should render both sun and moon icons', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemeToggler)

    // Sun icon
    expect(result).toContain('<svg')
    expect(result).toContain('M12 3v1m0 16v1m9-9h-1M4 12H3') // Part of sun path

    // Moon icon
    expect(result).toContain('M20.354 15.354A9 9 0 018.646 3.646') // Part of moon path
  })

  it('should include screen reader announcement element', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemeToggler)

    expect(result).toContain('class="sr-only"')
    expect(result).toContain('data-theme-announce')
    expect(result).toContain('Current theme:')
  })

  it('should accept custom class prop', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemeToggler, {
      props: { class: 'ml-auto' },
    })

    expect(result).toContain('ml-auto')
  })

  it('should have proper button styling classes', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemeToggler)

    // Base button classes
    expect(result).toContain('inline-flex')
    expect(result).toContain('h-10 w-10')
    expect(result).toContain('items-center justify-center')
    expect(result).toContain('rounded-md')
    expect(result).toContain('transition-all')
  })

  it('should include icon transition classes', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemeToggler)

    // Sun icon transitions
    expect(result).toContain('rotate-0 scale-100')
    expect(result).toContain('dark:-rotate-90 dark:scale-0')

    // Moon icon transitions
    expect(result).toContain('rotate-90 scale-0')
    expect(result).toContain('dark:rotate-0 dark:scale-100')
  })

  it('should render client-side script for theme toggling', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(ThemeToggler)

    // Script is loaded as module in Astro
    expect(result).toContain('<script type="module"')
    expect(result).toContain('data-theme-toggle')
  })
})
