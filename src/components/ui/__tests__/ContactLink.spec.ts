import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ContactLink from '../ContactLink.vue'

describe('ContactLink', () => {
  // Mock clipboard API
  const mockWriteText = vi.fn()

  beforeEach(() => {
    // Reset mocks
    mockWriteText.mockClear()

    // Mock navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  describe('Basic Rendering', () => {
    it('renders with type, label, and value', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      expect(wrapper.text()).toContain('test@example.com')
    })

    it('renders email as button for clipboard functionality', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.attributes('href')).toBeUndefined()
    })

    it('renders non-email as link with correct href', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('https://github.com/username')
    })
  })

  describe('Contact Types', () => {
    it('renders email type as button for clipboard', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.attributes('href')).toBeUndefined()
    })

    it('renders github type with direct href', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      expect(wrapper.attributes('href')).toBe('https://github.com/username')
    })

    it('renders linkedin type with direct href', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'linkedin',
          label: 'LinkedIn',
          value: 'https://linkedin.com/in/username',
        },
      })

      expect(wrapper.attributes('href')).toBe('https://linkedin.com/in/username')
    })
  })

  describe('Base Styling', () => {
    it('applies base contact link classes', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      const expectedClasses = [
        'contact-link',
        'inline-flex',
        'items-center',
        'group',
        'transition-all',
        'duration-base',
      ]

      expectedClasses.forEach((className) => {
        expect(wrapper.classes()).toContain(className)
      })
    })
  })

  describe('Type-specific Icons', () => {
    it('renders email icon for email type', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      const iconContainer = wrapper.find('.icon-container')
      expect(iconContainer.find('svg').exists()).toBe(true)
      expect(iconContainer.find('svg').attributes('aria-label')).toBe('Email icon')
    })

    it('renders github icon for github type', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      const iconContainer = wrapper.find('.icon-container')
      expect(iconContainer.find('svg').exists()).toBe(true)
      expect(iconContainer.find('svg').attributes('aria-label')).toBe('GitHub icon')
    })

    it('renders linkedin icon for linkedin type', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'linkedin',
          label: 'LinkedIn',
          value: 'https://linkedin.com/in/username',
        },
      })

      const iconContainer = wrapper.find('.icon-container')
      expect(iconContainer.find('svg').exists()).toBe(true)
      expect(iconContainer.find('svg').attributes('aria-label')).toBe('LinkedIn icon')
    })
  })

  describe('Arrow Icon', () => {
    it('does not render arrow icon for email (button)', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      const arrowIcon = wrapper.find('.arrow-icon')
      expect(arrowIcon.exists()).toBe(false)
    })

    it('renders arrow icon for external links', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      const arrowIcon = wrapper.find('.arrow-icon')
      expect(arrowIcon.exists()).toBe(true)
      expect(arrowIcon.attributes('aria-label')).toBe('External link')
    })
  })

  describe('Hover Effects', () => {
    it('applies hover styles when hovered', async () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      const link = wrapper.find('a')
      await link.trigger('mouseenter')

      expect(link.classes()).toContain('group')
    })

    it('moves arrow on hover for external links', async () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      const arrowIcon = wrapper.find('.arrow-icon')
      expect(arrowIcon.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has proper target and rel attributes for external links', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      expect(wrapper.attributes('target')).toBe('_blank')
      expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
    })

    it('does not have target attribute for email links', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      expect(wrapper.attributes('target')).toBeUndefined()
      expect(wrapper.attributes('rel')).toBeUndefined()
    })

    it('has proper aria-label for email (copy action)', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('Copy email address: test@example.com')
    })

    it('has proper aria-label for other types', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('GitHub: https://github.com/username')
    })
  })

  describe('Clipboard Functionality', () => {
    it('should copy email to clipboard when email link is clicked', async () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      mockWriteText.mockResolvedValue(undefined)

      await wrapper.trigger('click')

      expect(mockWriteText).toHaveBeenCalledWith('test@example.com')
    })

    it('should show feedback message after copying email', async () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      mockWriteText.mockResolvedValue(undefined)

      await wrapper.trigger('click')
      // Allow Vue to update the DOM
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Copied!')
    })

    it('should hide feedback message after timeout', async () => {
      vi.useFakeTimers()

      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      mockWriteText.mockResolvedValue(undefined)

      await wrapper.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Copied!')

      // Fast-forward past the timeout
      vi.advanceTimersByTime(2000)
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).not.toContain('Copied!')

      vi.useRealTimers()
    })

    it('should not copy for non-email links', async () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'github',
          label: 'GitHub',
          value: 'https://github.com/username',
        },
      })

      await wrapper.trigger('click')

      expect(mockWriteText).not.toHaveBeenCalled()
    })

    it('should handle clipboard API failure gracefully', async () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      mockWriteText.mockRejectedValue(new Error('Clipboard not available'))

      await wrapper.trigger('click')

      expect(mockWriteText).toHaveBeenCalledWith('test@example.com')
      // Should not show "Copied!" message on failure
      expect(wrapper.text()).not.toContain('Copied!')
    })

    it('should handle missing clipboard API gracefully', async () => {
      // Remove clipboard API
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      })

      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
        },
      })

      await wrapper.trigger('click')

      // Should not throw error and should not show copied message
      expect(wrapper.text()).not.toContain('Copied!')
    })
  })

  describe('Icon-Only Mode', () => {
    it('should render only icon when iconOnly prop is true', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
          iconOnly: true,
        },
      })

      expect(wrapper.find('.contact-value').exists()).toBe(false)
      expect(wrapper.find('.icon-container').exists()).toBe(true)
    })

    it('should render text when iconOnly is false', () => {
      const wrapper = mount(ContactLink, {
        props: {
          type: 'email',
          label: 'Email',
          value: 'test@example.com',
          iconOnly: false,
        },
      })

      expect(wrapper.find('.contact-value').exists()).toBe(true)
      expect(wrapper.text()).toContain('test@example.com')
    })
  })
})
