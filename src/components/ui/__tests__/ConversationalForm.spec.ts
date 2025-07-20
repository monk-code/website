import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ConversationalForm from '../ConversationalForm.vue'

describe('ConversationalForm', () => {
  const mockSubmit = vi.fn()

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('should initially show purpose selection', () => {
    const wrapper = mount(ConversationalForm, {
      props: {
        onSubmit: mockSubmit,
      },
    })

    expect(wrapper.text()).toContain('What brings you here today?')
    expect(wrapper.find('[data-testid="project-option"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="hello-option"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="collaboration-option"]').exists()).toBe(true)
    expect(wrapper.find('form').exists()).toBe(false)
  })

  it('should show project form when project option is selected', async () => {
    const wrapper = mount(ConversationalForm, {
      props: {
        onSubmit: mockSubmit,
      },
    })

    await wrapper.find('[data-testid="project-option"]').trigger('click')

    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.text()).toContain('Tell me about your project')
  })

  it('should show simple form when hello option is selected', async () => {
    const wrapper = mount(ConversationalForm, {
      props: {
        onSubmit: mockSubmit,
      },
    })

    await wrapper.find('[data-testid="hello-option"]').trigger('click')

    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.text()).toContain('Say hello')
  })

  it('should show collaboration form when collaboration option is selected', async () => {
    const wrapper = mount(ConversationalForm, {
      props: {
        onSubmit: mockSubmit,
      },
    })

    await wrapper.find('[data-testid="collaboration-option"]').trigger('click')

    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.text()).toContain("Let's explore collaboration")
  })

  it('should validate required fields before submission', async () => {
    const wrapper = mount(ConversationalForm, {
      props: {
        onSubmit: mockSubmit,
      },
    })

    await wrapper.find('[data-testid="project-option"]').trigger('click')
    await wrapper.find('form').trigger('submit')

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('should submit form with valid data', async () => {
    const wrapper = mount(ConversationalForm, {
      props: {
        onSubmit: mockSubmit,
      },
    })

    await wrapper.find('[data-testid="project-option"]').trigger('click')

    await wrapper.find('input[type="text"]').setValue('John Doe')
    await wrapper.find('input[type="email"]').setValue('john@example.com')
    await wrapper.find('textarea').setValue('I have a Vue.js project')

    await wrapper.find('form').trigger('submit')

    expect(mockSubmit).toHaveBeenCalledWith({
      purpose: 'project',
      name: 'John Doe',
      email: 'john@example.com',
      message: 'I have a Vue.js project',
    })
  })

  it('should show back button when form is displayed', async () => {
    const wrapper = mount(ConversationalForm, {
      props: {
        onSubmit: mockSubmit,
      },
    })

    await wrapper.find('[data-testid="project-option"]').trigger('click')

    expect(wrapper.find('[data-testid="back-button"]').exists()).toBe(true)
  })

  it('should return to purpose selection when back button is clicked', async () => {
    const wrapper = mount(ConversationalForm, {
      props: {
        onSubmit: mockSubmit,
      },
    })

    await wrapper.find('[data-testid="project-option"]').trigger('click')
    await wrapper.find('[data-testid="back-button"]').trigger('click')

    expect(wrapper.text()).toContain('What brings you here today?')
    expect(wrapper.find('form').exists()).toBe(false)
  })
})
