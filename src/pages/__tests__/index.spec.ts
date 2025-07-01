import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Index from '@/pages/index.astro'

describe('Homepage', () => {
  it('renders without crashing', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Index)
    
    expect(result).toBeTruthy()
  })

  it('contains MONKCODE branding', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Index)
    
    expect(result).toContain('MONKCODE')
  })

  it('has proper HTML structure', async () => {
    const container = await AstroContainer.create()
    const result = await container.renderToString(Index)
    
    expect(result).toContain('<html')
    expect(result).toContain('lang="en"')
    expect(result).toContain('</html>')
  })
})