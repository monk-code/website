import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ProjectCard from '../ProjectCard.vue'
import type { Project } from '@/types/index.js'

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
    responsibilities: ['Development', 'Testing']
  }
}

describe('ProjectCard', () => {
  it('renders project title on face1', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const face1 = wrapper.find('.face1')
    expect(face1.exists()).toBe(true)
    expect(face1.find('h2').text()).toBe('Test Project')
  })

  it('renders project description on face1', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const description = wrapper.find('.face1 .description')
    expect(description.exists()).toBe(true)
    expect(description.text()).toBe('A test project for unit testing')
  })

  it('renders tech stack pills', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const techPills = wrapper.findAll('.tech-pill')
    expect(techPills).toHaveLength(3)
    expect(techPills[0].text()).toBe('Vue.js')
    expect(techPills[1].text()).toBe('TypeScript')
    expect(techPills[2].text()).toBe('Vitest')
  })

  it('renders project image as background on face2', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const face2 = wrapper.find('.face2')
    expect(face2.exists()).toBe(true)
    expect(face2.attributes('style')).toContain('url("/test-image.png")')
  })

  it('displays project number on face2', () => {
    const projectWithKnownId = { ...mockProject, id: 'bright-energy' }
    const wrapper = mount(ProjectCard, {
      props: { project: projectWithKnownId }
    })
    
    const projectNumber = wrapper.find('.project-number')
    expect(projectNumber.text()).toBe('01')
  })

  it('displays project type on face2', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const projectType = wrapper.find('.face2 .project-type')
    expect(projectType.text()).toBe('Web Application')
  })

  it('displays project title on face2', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const projectTitle = wrapper.find('.face2 .project-title')
    expect(projectTitle.text()).toBe('Test Project')
  })

  it('renders CTA buttons with correct links', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const liveButton = wrapper.find('[data-test="live-button"]')
    expect(liveButton.exists()).toBe(true)
    expect(liveButton.attributes('href')).toBe('https://test-project.com')
  })

  it('does not render repo button when repoUrl is not provided', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const repoButton = wrapper.find('[data-test="repo-button"]')
    expect(repoButton.exists()).toBe(false)
  })

  it('adds hover class on mouse enter', async () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const card = wrapper.find('.project-card')
    expect(card.classes()).not.toContain('hover')
    
    await card.trigger('mouseenter')
    await nextTick()
    expect(card.classes()).toContain('hover')
    
    await card.trigger('mouseleave')
    await nextTick()
    expect(card.classes()).not.toContain('hover')
  })

  it('supports keyboard navigation with focus', async () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const card = wrapper.find('.project-card')
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
      dateRange: '2024'
    }
    
    const wrapper = mount(ProjectCard, {
      props: { project: minimalProject }
    })
    
    expect(wrapper.find('.tech-stack').exists()).toBe(false)
  })

  it('applies size classes based on size prop', () => {
    const wrapper = mount(ProjectCard, {
      props: { 
        project: mockProject,
        size: 'large'
      }
    })
    
    const card = wrapper.find('.project-card')
    expect(card.classes()).toContain('size-large')
  })

  it('emits click event when card is clicked', async () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    await wrapper.find('.project-card').trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')![0]).toEqual([mockProject])
  })

  it('prevents click event propagation on CTA buttons', async () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const liveButton = wrapper.find('[data-test="live-button"]')
    await liveButton.trigger('click')
    
    // Should not emit click event when CTA button is clicked
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject }
    })
    
    const card = wrapper.find('.project-card')
    expect(card.attributes('role')).toBe('article')
    expect(card.attributes('aria-label')).toBe('Test Project - Web Application')
  })

  it('limits tech stack display to 4 items', () => {
    const projectWithManyTechs = {
      ...mockProject,
      techStack: ['Tech1', 'Tech2', 'Tech3', 'Tech4', 'Tech5', 'Tech6']
    }
    
    const wrapper = mount(ProjectCard, {
      props: { project: projectWithManyTechs }
    })
    
    const techPills = wrapper.findAll('.tech-pill')
    expect(techPills).toHaveLength(4)
  })
})