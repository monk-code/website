import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormTextarea from '../FormTextarea.vue'

describe('FormTextarea', () => {
  describe('Basic Rendering', () => {
    it('renders with label and textarea', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
        },
      })

      expect(wrapper.find('label').text()).toBe('Message')
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('binds model value to textarea', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: 'Hello world',
        },
      })

      expect(wrapper.find('textarea').element.value).toBe('Hello world')
    })

    it('applies placeholder when provided', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
          placeholder: 'Enter your message...',
        },
      })

      expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter your message...')
    })
  })

  describe('Character Count', () => {
    it('shows character count when maxLength is provided', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: 'Hello',
          maxLength: 100,
        },
      })

      expect(wrapper.find('.character-count').text()).toBe('5 / 100')
    })

    it('does not show character count when maxLength is not provided', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: 'Hello',
        },
      })

      expect(wrapper.find('.character-count').exists()).toBe(false)
    })

    it('shows warning when approaching character limit', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: 'x'.repeat(95), // 95 characters
          maxLength: 100,
        },
      })

      expect(wrapper.find('.character-count').classes()).toContain('warning')
    })

    it('shows error when exceeding character limit', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: 'x'.repeat(105), // 105 characters
          maxLength: 100,
        },
      })

      expect(wrapper.find('.character-count').classes()).toContain('error')
    })
  })

  describe('Validation', () => {
    it('shows error message when error prop is provided', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
          error: 'This field is required',
        },
      })

      expect(wrapper.find('.error-message').text()).toBe('This field is required')
    })

    it('applies error styles when error exists', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
          error: 'This field is required',
        },
      })

      expect(wrapper.find('textarea').classes()).toContain('error')
    })
  })

  describe('Required Field', () => {
    it('shows asterisk for required fields', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
          required: true,
        },
      })

      expect(wrapper.find('.required-indicator').exists()).toBe(true)
    })

    it('does not show asterisk for optional fields', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
          required: false,
        },
      })

      expect(wrapper.find('.required-indicator').exists()).toBe(false)
    })
  })

  describe('Events', () => {
    it('emits update:modelValue when textarea value changes', async () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
        },
      })

      const textarea = wrapper.find('textarea')
      await textarea.setValue('New message')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New message'])
    })

    it('emits blur event when textarea loses focus', async () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
        },
      })

      const textarea = wrapper.find('textarea')
      await textarea.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('Styling', () => {
    it('applies base textarea classes', () => {
      const wrapper = mount(FormTextarea, {
        props: {
          label: 'Message',
          modelValue: '',
        },
      })

      const textarea = wrapper.find('textarea')
      const expectedClasses = [
        'form-textarea',
        'w-full',
        'px-4',
        'py-3',
        'rounded-lg',
        'border',
        'transition-all',
        'duration-base',
        'resize-vertical',
      ]

      expectedClasses.forEach((className) => {
        expect(textarea.classes()).toContain(className)
      })
    })
  })
})
