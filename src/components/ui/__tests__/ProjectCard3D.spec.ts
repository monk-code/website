import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import type { Project } from '@/types/index.js'
import ProjectCard3D from '../ProjectCard3D.vue'

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  type: 'Web Application',
  description: 'A test project for unit testing',
  imageUrl: { src: '/test-image.png', width: 600, height: 400, format: 'png' } as any,
  techStack: ['Vue.js', 'TypeScript', 'Vitest'],
  liveUrl: 'https://test-project.com',
  featured: true,
  dateRange: '2024-Present',
  keyFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
  role: {
    level: 'Full Stack Developer',
    responsibilities: ['Development', 'Testing'],
  },
}

describe('ProjectCard3D', () => {
  it('renders project title and type on the front face', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const frontFace = wrapper.find('.face-front')
    expect(frontFace.exists()).toBe(true)
    expect(frontFace.text()).toContain('Test Project')
    expect(frontFace.text()).toContain('Web Application')
  })

  it('renders project image on the front face', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const image = wrapper.find('.face-front img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe('/test-image.png')
    expect(image.attributes('alt')).toBe('Test Project')
  })

  it('renders project details on the back face', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const backFace = wrapper.find('.face-back')
    expect(backFace.exists()).toBe(true)
    expect(backFace.text()).toContain('A test project for unit testing')
  })

  it('renders tech stack pills on the back face', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const techPills = wrapper.findAll('.tech-pill')
    expect(techPills).toHaveLength(3)
    expect(techPills[0].text()).toBe('Vue.js')
    expect(techPills[1].text()).toBe('TypeScript')
    expect(techPills[2].text()).toBe('Vitest')
  })

  it('renders key features when available', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const features = wrapper.findAll('.feature-item')
    expect(features).toHaveLength(3)
    expect(features[0].text()).toBe('• Feature 1')
  })

  it('renders CTA buttons with correct links', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const liveButton = wrapper.find('[data-test="live-button"]')
    expect(liveButton.exists()).toBe(true)
    expect(liveButton.attributes('href')).toBe('https://test-project.com')
  })

  it('does not render repo button when repoUrl is not provided', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const repoButton = wrapper.find('[data-test="repo-button"]')
    expect(repoButton.exists()).toBe(false)
  })

  it('adds hover class on mouse enter', async () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const card = wrapper.find('.project-card-3d')
    expect(card.classes()).not.toContain('hover')

    await card.trigger('mouseenter')
    await nextTick()
    expect(card.classes()).toContain('hover')

    await card.trigger('mouseleave')
    await nextTick()
    expect(card.classes()).not.toContain('hover')
  })

  it('supports keyboard navigation with focus', async () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const card = wrapper.find('.project-card-3d')
    expect(card.attributes('tabindex')).toBe('0')

    await card.trigger('focus')
    await nextTick()
    expect(card.classes()).toContain('focus')

    await card.trigger('blur')
    await nextTick()
    expect(card.classes()).not.toContain('focus')
  })

  it('handles projects without optional fields gracefully', () => {
    const minimalProject: Project = {
      id: 'minimal',
      title: 'Minimal Project',
      type: 'Website',
      description: 'A minimal project',
      imageUrl: { src: '/minimal.png', width: 600, height: 400, format: 'png' } as any,
      techStack: [],
      dateRange: '2024',
    }

    const wrapper = mount(ProjectCard3D, {
      props: { project: minimalProject },
    })

    expect(wrapper.find('.tech-pills-container').exists()).toBe(false)
    expect(wrapper.find('.features-list').exists()).toBe(false)
  })

  it('applies size classes based on size prop', () => {
    const wrapper = mount(ProjectCard3D, {
      props: {
        project: mockProject,
        size: 'large',
      },
    })

    const card = wrapper.find('.project-card-3d')
    expect(card.classes()).toContain('size-large')
  })

  it('emits click event when card is clicked', async () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    await wrapper.find('.project-card-3d').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')![0]).toEqual([mockProject])
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const card = wrapper.find('.project-card-3d')
    expect(card.attributes('role')).toBe('article')
    expect(card.attributes('aria-label')).toBe('Test Project - Web Application')
  })

  it('respects prefers-reduced-motion for animations', () => {
    const wrapper = mount(ProjectCard3D, {
      props: { project: mockProject },
    })

    const card = wrapper.find('.project-card-3d')
    expect(card.classes()).toContain('motion-safe:transition-transform')
  })
})
