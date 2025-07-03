import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import Index from '../index.astro'

describe('Homepage', () => {
  it('should use the Layout component', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Index)

    expect(result).toContain('MONKCODE')
    expect(result).toContain('Portfolio')
  })

  it('should include theme toggler component', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Index)

    expect(result).toContain('theme-toggle')
  })

  it('should have minimal clean structure ready for portfolio development', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Index)

    expect(result).toContain('Welcome to MONKCODE')
    expect(result).not.toContain('Design System Showcase')
    expect(result).not.toContain('href="#principles"')
  })
})
