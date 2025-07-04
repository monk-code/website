import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import DesignSystem from '../design-system.astro'

describe('Design System Page', () => {
  it('should use the Layout component', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(DesignSystem)

    // Should be wrapped in Layout with proper meta tags
    expect(result).toContain('Design System')
    expect(result).toContain('MONKCODE design system documentation')
  })

  it('should include theme toggler component', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(DesignSystem)

    expect(result).toContain('theme-toggle')
  })

  it('should have navigation for design system sections', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(DesignSystem)

    expect(result).toContain('href="#principles"')
    expect(result).toContain('href="#colors"')
    expect(result).toContain('href="#typography"')
    expect(result).toContain('href="#components"')
    expect(result).toContain('href="#accessibility"')
  })

  it('should display brand colors', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(DesignSystem)

    expect(result).toContain('Monk Yellow')
    expect(result).toContain('#FFDE0A')
    expect(result).toContain('Code Black')
    expect(result).toContain('#121212')
    expect(result).toContain('Silent White')
    expect(result).toContain('#F5F5F5')
    expect(result).toContain('Rhythm Grey')
    expect(result).toContain('#4a5568')
  })

  it('should show typography examples', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(DesignSystem)

    expect(result).toContain('Montserrat')
    expect(result).toContain('Inter')
    expect(result).toContain('JetBrains Mono')
  })

  it('should include button examples', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(DesignSystem)

    expect(result).toContain('Primary Action')
    expect(result).toContain('Secondary Action')
    expect(result).toContain('bg-primary')
  })

  it('should have accessibility guidelines section', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(DesignSystem)

    expect(result).toContain('Accessibility Guidelines')
    expect(result).toContain('Focus Management')
    expect(result).toContain('Screen Reader Support')
  })
})
