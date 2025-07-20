import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import BackToTop from '../BackToTop.vue'

describe('BackToTop', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the back to top button', () => {
      const wrapper = mount(BackToTop)

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('button').attributes('aria-label')).toBe('Back to top')
    })

    it('is initially hidden when scroll position is 0', () => {
      window.scrollY = 0
      const wrapper = mount(BackToTop)

      expect(wrapper.find('button').attributes('style')).toContain('display: none')
    })
  })

  describe('Scroll Behavior', () => {
    it('calls window.scrollTo when clicked', async () => {
      const scrollToSpy = vi.spyOn(window, 'scrollTo')
      window.scrollY = 600

      const wrapper = mount(BackToTop)
      await wrapper.find('button').trigger('click')

      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })
  })

  describe('Styling', () => {
    it('applies correct styling classes', () => {
      window.scrollY = 600
      const wrapper = mount(BackToTop)
      const button = wrapper.find('button')

      expect(button.classes()).toContain('fixed')
      expect(button.classes()).toContain('bottom-6')
      expect(button.classes()).toContain('right-6')
      expect(button.classes()).toContain('bg-primary')
      expect(button.classes()).toContain('rounded-full')
    })
  })
})
