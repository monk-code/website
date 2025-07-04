import { describe, expect, it } from 'vitest'
import { useMobileMenu } from '../useMobileMenu.js'

describe('useMobileMenu', () => {
  it('initializes with menu closed', () => {
    const { isOpen } = useMobileMenu()

    expect(isOpen.value).toBe(false)
  })

  it('toggles menu state', () => {
    const { isOpen, toggle } = useMobileMenu()

    expect(isOpen.value).toBe(false)

    toggle()
    expect(isOpen.value).toBe(true)

    toggle()
    expect(isOpen.value).toBe(false)
  })

  it('opens menu', () => {
    const { isOpen, open } = useMobileMenu()

    expect(isOpen.value).toBe(false)

    open()
    expect(isOpen.value).toBe(true)
  })

  it('closes menu', () => {
    const { isOpen, open, close } = useMobileMenu()

    open()
    expect(isOpen.value).toBe(true)

    close()
    expect(isOpen.value).toBe(false)
  })

  it('provides consistent state across calls', () => {
    const { isOpen, toggle } = useMobileMenu()
    const { isOpen: isOpen2 } = useMobileMenu()

    // Each instance should have its own state
    expect(isOpen.value).toBe(false)
    expect(isOpen2.value).toBe(false)

    toggle()
    expect(isOpen.value).toBe(true)
    expect(isOpen2.value).toBe(false) // Different instance, different state
  })
})
