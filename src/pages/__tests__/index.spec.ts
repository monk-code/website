import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { getContainerRenderer as getVueRenderer } from '@astrojs/vue'
import { describe, expect, it, beforeAll } from 'vitest'
import Index from '../index.astro'

describe('Homepage', () => {
  let container: AstroContainer

  beforeAll(async () => {
    const renderers = await loadRenderers([getVueRenderer()])
    container = await AstroContainer.create({ renderers })
  })

  it('should use the Layout component', async () => {
    const result = await container.renderToString(Index)

    expect(result).toContain('MONKCODE')
    expect(result).toContain('Digital Craftsmanship')
  })

  it('should include Hero component with main content', async () => {
    const result = await container.renderToString(Index)

    expect(result).toContain('Gregory')
    expect(result).toContain('senior frontend developer')
    expect(result).toContain('View My Work')
  })

  it('should have portfolio structure with placeholder sections', async () => {
    const result = await container.renderToString(Index)

    expect(result).toContain('Selected Work')
    expect(result).toContain('The Monk & The Rhythm')
    expect(result).toContain('Let\'s Build Something Together')
    expect(result).not.toContain('Design System Showcase')
  })
})
