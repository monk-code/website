import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ContactForm from '../ContactForm.vue'

// Mock fetch for Web3forms API testing
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

// Mock the FormInput and FormTextarea components
vi.mock('../FormInput.vue', () => ({
  default: {
    name: 'FormInput',
    template: '<div class="mock-form-input"><input /></div>',
    props: ['modelValue', 'label', 'type', 'required', 'error', 'placeholder'],
    emits: ['update:modelValue', 'blur'],
  },
}))

vi.mock('../FormTextarea.vue', () => ({
  default: {
    name: 'FormTextarea',
    template: '<div class="mock-form-textarea"><textarea /></div>',
    props: ['modelValue', 'label', 'required', 'error', 'maxLength', 'rows', 'placeholder'],
    emits: ['update:modelValue', 'blur'],
  },
}))

describe('ContactForm', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    // Mock successful Web3forms response by default
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent successfully' }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  describe('Basic Rendering', () => {
    it('renders form with title and description', () => {
      const wrapper = mount(ContactForm)

      expect(wrapper.find('.form-title').text()).toBe('Send me a message')
      expect(wrapper.find('.form-description').text()).toBe(
        "I'll get back to you as soon as possible.",
      )
    })

    it('renders form inputs and textarea', () => {
      const wrapper = mount(ContactForm)

      expect(wrapper.findAll('.mock-form-input')).toHaveLength(2) // name and email
      expect(wrapper.findAll('.mock-form-textarea')).toHaveLength(1) // message
    })

    it('renders submit button', () => {
      const wrapper = mount(ContactForm)

      const submitButton = wrapper.find('.submit-button')
      expect(submitButton.exists()).toBe(true)
      expect(submitButton.text()).toBe('Send Message')
    })
  })

  describe('Form Validation', () => {
    it('disables submit button when form is invalid', () => {
      const wrapper = mount(ContactForm)

      const submitButton = wrapper.find('.submit-button')
      expect(submitButton.attributes('disabled')).toBeDefined()
    })

    it('has proper form structure', () => {
      const wrapper = mount(ContactForm)

      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.find('.form-grid').exists()).toBe(true)
      expect(wrapper.find('.form-actions').exists()).toBe(true)
    })
  })

  describe('Form Submission', () => {
    it('handles form submission', async () => {
      const wrapper = mount(ContactForm)

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      // Form should handle submission even with invalid data
      expect(wrapper.find('.submit-button').exists()).toBe(true)
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive classes', () => {
      const wrapper = mount(ContactForm)

      expect(wrapper.find('.contact-form').exists()).toBe(true)
      expect(wrapper.find('.form-grid').exists()).toBe(true)
    })
  })

  describe('Styling', () => {
    it('applies base form classes', () => {
      const wrapper = mount(ContactForm)

      const form = wrapper.find('.contact-form')
      expect(form.exists()).toBe(true)
    })

    it('has proper button styling', () => {
      const wrapper = mount(ContactForm)

      const button = wrapper.find('.submit-button')
      expect(button.exists()).toBe(true)
    })
  })

  describe('Spam Protection Features', () => {
    describe('Honeypot Fields', () => {
      it('renders hidden honeypot fields for bot detection', () => {
        const wrapper = mount(ContactForm)

        // Should have multiple honeypot fields with different techniques
        const honeypotFields = wrapper.findAll('input[aria-hidden="true"]')
        expect(honeypotFields.length).toBeGreaterThan(0)

        // Check for specific honeypot field names
        expect(wrapper.find('input[name="website"]').exists()).toBe(true)
        expect(wrapper.find('input[name="phone2"]').exists()).toBe(true)
      })

      it('honeypot fields should be hidden from users', () => {
        const wrapper = mount(ContactForm)

        const websiteField = wrapper.find('input[name="website"]')
        const phone2Field = wrapper.find('input[name="phone2"]')

        // Should have styles that hide them
        expect(websiteField.attributes('style')).toContain('display: none')
        expect(phone2Field.attributes('style')).toContain('position: absolute')
      })
    })

    describe('Time-based Validation', () => {
      it('includes timestamp field for submission timing validation', () => {
        const wrapper = mount(ContactForm)

        const timestampField = wrapper.find('input[name="timestamp"]')
        expect(timestampField.exists()).toBe(true)
        expect(timestampField.attributes('type')).toBe('hidden')
      })
    })

    describe('Web3forms Integration', () => {
      it('calls Web3forms API with form data on valid submission', async () => {
        const wrapper = mount(ContactForm)

        // Fill out the form with valid data directly via reactive object
        const vm = wrapper.vm as any
        vm.formData.name = 'John Doe'
        vm.formData.email = 'john@example.com'
        vm.formData.message = 'Hello, this is a test message.'

        // Set timestamp to allow submission (older than 3 seconds)
        vm.formTimestamp = (Date.now() - 5000).toString()

        // Submit the form
        const form = wrapper.find('form')
        await form.trigger('submit.prevent')

        // Wait for async operations
        await wrapper.vm.$nextTick()
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Should call Web3forms API
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.web3forms.com/submit',
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
            body: expect.stringContaining('John Doe'),
          }),
        )
      })

      it('includes access key in API request', async () => {
        const wrapper = mount(ContactForm)

        // Fill form data directly
        const vm = wrapper.vm as any
        vm.formData.name = 'John Doe'
        vm.formData.email = 'john@example.com'
        vm.formData.message = 'Test message'
        vm.formTimestamp = (Date.now() - 5000).toString()

        const form = wrapper.find('form')
        await form.trigger('submit.prevent')
        await wrapper.vm.$nextTick()
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Should include access_key in request
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.web3forms.com/submit',
          expect.objectContaining({
            body: expect.stringContaining('access_key'),
          }),
        )
      })
    })

    describe('Spam Content Detection', () => {
      it('detects and blocks obvious spam content', async () => {
        const wrapper = mount(ContactForm)

        // Fill with spam-like content directly
        const vm = wrapper.vm as any
        vm.formData.name = 'GET RICH QUICK'
        vm.formData.email = 'spam@spammer.com'
        vm.formData.message = 'BUY NOW!!! CLICK HERE!!! FREE MONEY!!! http://spam-link.com'
        vm.formTimestamp = (Date.now() - 5000).toString()

        const form = wrapper.find('form')
        await form.trigger('submit.prevent')
        await wrapper.vm.$nextTick()
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Should NOT call Web3forms API for obvious spam
        expect(mockFetch).not.toHaveBeenCalled()

        // Should show error message
        expect(wrapper.text()).toContain('spam')
      })
    })
  })
})
