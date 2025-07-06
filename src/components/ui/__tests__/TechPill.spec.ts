import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import TechPill from '../TechPill.vue'

describe('TechPill', () => {
  it('renders tech name text content', () => {
    render(TechPill, {
      slots: { default: 'Vue.js' },
    })

    expect(screen.getByText('Vue.js')).toBeInTheDocument()
  })

  it('is perceivable as a badge/pill element', () => {
    render(TechPill, {
      slots: { default: 'TypeScript' },
    })

    const pill = screen.getByText('TypeScript')
    expect(pill.tagName.toLowerCase()).toBe('span')
    expect(pill).toHaveAttribute('role', 'status')
  })
})
