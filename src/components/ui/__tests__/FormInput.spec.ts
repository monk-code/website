import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormInput from '../FormInput.vue'

describe('FormInput', () => {
  describe('Basic Rendering', () => {
    it('renders with label and input', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
        },
      })

      expect(wrapper.find('label').text()).toBe('Name')
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('renders with correct input type', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Email',
          modelValue: '',
          type: 'email',
        },
      })

      expect(wrapper.find('input').attributes('type')).toBe('email')
    })

    it('binds model value to input', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: 'John Doe',
          type: 'text',
        },
      })

      expect(wrapper.find('input').element.value).toBe('John Doe')
    })
  })

  describe('Validation', () => {
    it('shows error message when error prop is provided', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
          error: 'This field is required',
        },
      })

      expect(wrapper.find('.error-message').text()).toBe('This field is required')
    })

    it('applies error styles when error exists', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
          error: 'This field is required',
        },
      })

      expect(wrapper.find('input').classes()).toContain('error')
    })

    it('does not show error message when no error', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
        },
      })

      expect(wrapper.find('.error-message').exists()).toBe(false)
    })
  })

  describe('Required Field', () => {
    it('shows asterisk for required fields', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
          required: true,
        },
      })

      expect(wrapper.find('.required-indicator').exists()).toBe(true)
    })

    it('does not show asterisk for optional fields', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
          required: false,
        },
      })

      expect(wrapper.find('.required-indicator').exists()).toBe(false)
    })
  })

  describe('Events', () => {
    it('emits update:modelValue when input value changes', async () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
        },
      })

      const input = wrapper.find('input')
      await input.setValue('New Value')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Value'])
    })

    it('emits blur event when input loses focus', async () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
        },
      })

      const input = wrapper.find('input')
      await input.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('Styling', () => {
    it('applies base input classes', () => {
      const wrapper = mount(FormInput, {
        props: {
          label: 'Name',
          modelValue: '',
          type: 'text',
        },
      })

      const input = wrapper.find('input')
      const expectedClasses = [
        'form-input',
        'w-full',
        'px-4',
        'py-3',
        'rounded-lg',
        'border',
        'transition-all',
        'duration-base',
      ]

      expectedClasses.forEach((className) => {
        expect(input.classes()).toContain(className)
      })
    })
  })
})
