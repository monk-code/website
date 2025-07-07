import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProjectCard from '@/components/ProjectCard.vue'

// Mock ImageMetadata object for testing
const mockImage = {
  src: '/test-image.jpg',
  width: 600,
  height: 400,
  format: 'jpg',
} as any

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        title: 'Test Project',
        description: 'A test project description',
        imageUrl: mockImage,
        techStack: ['React', 'TypeScript'],
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com/test/repo',
      },
    })

    expect(wrapper.find('h3').text()).toBe('Test Project')
    expect(wrapper.find('p').text()).toBe('A test project description')
    expect(wrapper.find('img').attributes('alt')).toBe('Screenshot of Test Project project')
  })

  it('renders tech stack pills correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        title: 'Test Project',
        description: 'A test project description',
        imageUrl: mockImage,
        techStack: ['React', 'TypeScript', 'Vue.js'],
        liveUrl: 'https://example.com',
      },
    })

    const techPills = wrapper.findAll('[data-testid="tech-pill"]')
    expect(techPills).toHaveLength(3)
    expect(techPills[0].text()).toBe('React')
    expect(techPills[1].text()).toBe('TypeScript')
    expect(techPills[2].text()).toBe('Vue.js')
  })

  it('renders project links when provided', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        title: 'Test Project',
        description: 'A test project description',
        imageUrl: mockImage,
        techStack: ['React'],
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com/test/repo',
      },
    })

    const links = wrapper.findAll('a')
    expect(links).toHaveLength(2)
    expect(links[0].attributes('href')).toBe('https://example.com')
    expect(links[1].attributes('href')).toBe('https://github.com/test/repo')
  })

  it('handles optional links correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        title: 'Test Project',
        description: 'A test project description',
        imageUrl: mockImage,
        techStack: ['React'],
        liveUrl: 'https://example.com',
        // No repoUrl provided
      },
    })

    const links = wrapper.findAll('a')
    expect(links).toHaveLength(1)
    expect(links[0].attributes('href')).toBe('https://example.com')
  })

  it('uses brand-compliant clean structured design', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        title: 'Test Project',
        description: 'A test project description',
        imageUrl: mockImage,
        techStack: ['React'],
        liveUrl: 'https://example.com',
      },
    })

    const card = wrapper.find('article')
    expect(card.classes()).toContain('project-card-clean')
    expect(card.classes()).toContain('bg-background')
  })

  it('highlights featured projects with Monk Yellow accent', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        title: 'Featured Project',
        description: 'A featured project description',
        imageUrl: mockImage,
        techStack: ['React'],
        liveUrl: 'https://example.com',
        featured: true,
      },
    })

    const card = wrapper.find('article')
    expect(card.classes()).toContain('project-card-featured')
  })

  it('applies smooth brand-appropriate hover effects', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        title: 'Test Project',
        description: 'A test project description',
        imageUrl: mockImage,
        techStack: ['React'],
        liveUrl: 'https://example.com',
      },
    })

    const card = wrapper.find('article')
    expect(card.classes()).toContain('project-card-hover')
  })

  it('maintains generous white space following brand guidelines', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        title: 'Test Project',
        description: 'A test project description',
        imageUrl: mockImage,
        techStack: ['React'],
        liveUrl: 'https://example.com',
      },
    })

    const content = wrapper.find('.card-content')
    expect(content.classes()).toContain('generous-spacing')
  })
})
