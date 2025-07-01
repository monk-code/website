import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
// Using path alias - no relative imports
import Header from '@components/header.vue'

describe('Header Component', () => {
  it('displays the MONKCODE brand name', () => {
    render(Header)
    
    const brandName = screen.getByText('MONKCODE')
    expect(brandName).toBeInTheDocument()
  })

  it('uses Montserrat font for the brand name', () => {
    render(Header)
    
    const brandName = screen.getByText('MONKCODE')
    expect(brandName).toHaveClass('font-montserrat')
  })

  it('has proper accessibility attributes', () => {
    render(Header)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})