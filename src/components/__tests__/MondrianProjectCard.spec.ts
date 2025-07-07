import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { Project } from '@/types/index.js'
import MondrianProjectCard from '../MondrianProjectCard.vue'

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'Test project description',
  techStack: ['Vue.js', 'TypeScript', 'CSS3'],
  imageUrl: {
    src: '/test-image.jpg',
    width: 600,
    height: 400,
    format: 'jpg',
  },
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/test/repo',
}

describe('MondrianProjectCard', () => {
  it('renders project title in default state', () => {
    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: mockProject,
      },
    })

    expect(wrapper.find('.project-title-minimal').text()).toBe('Test Project')
  })

  it('shows hover content when isHovered is true', () => {
    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: mockProject,
        isHovered: true,
      },
    })

    expect(wrapper.find('.content-visible').exists()).toBe(true)
    expect(wrapper.find('.project-description').text()).toBe('Test project description')
  })

  it('applies hero styles when isHero is true', () => {
    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: mockProject,
        isHero: true,
      },
    })

    expect(wrapper.find('.card-hero').exists()).toBe(true)
  })

  it('renders action buttons when URLs are provided', () => {
    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: mockProject,
        isHovered: true,
      },
    })

    const actionButtons = wrapper.findAll('.action-button')
    expect(actionButtons).toHaveLength(2)
    expect(actionButtons[0].text()).toContain('Live Demo')
    expect(actionButtons[1].text()).toContain('Source Code')
  })

  it('limits tech stack display based on card type', () => {
    const projectWithManyTechs: Project = {
      ...mockProject,
      techStack: ['Vue', 'TypeScript', 'CSS3', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    }

    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: projectWithManyTechs,
        isHovered: true,
      },
    })

    const techIcons = wrapper.findAll('.tech-icon-wrapper')
    expect(techIcons).toHaveLength(4)
    expect(wrapper.find('.tech-more').text()).toBe('+3 more')
  })

  it('shows 6 tech items for hero cards', () => {
    const projectWithManyTechs: Project = {
      ...mockProject,
      techStack: ['Vue', 'TypeScript', 'CSS3', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    }

    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: projectWithManyTechs,
        isHero: true,
        isHovered: true,
      },
    })

    const techIcons = wrapper.findAll('.tech-icon-wrapper')
    expect(techIcons).toHaveLength(6)
    expect(wrapper.find('.tech-more').text()).toBe('+1 more')
  })

  it('applies hover transform class', () => {
    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: mockProject,
        isHovered: true,
      },
    })

    expect(wrapper.find('.card-hovered').exists()).toBe(true)
  })

  it('renders background image when provided', () => {
    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: mockProject,
      },
    })

    const bgImage = wrapper.find('.background-image')
    expect(bgImage.exists()).toBe(true)
    expect(bgImage.attributes('src')).toBe('/test-image.jpg')
  })

  it('does not render action buttons when URLs are not provided', () => {
    const projectWithoutUrls: Project = {
      ...mockProject,
      liveUrl: undefined,
      repoUrl: undefined,
    }

    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: projectWithoutUrls,
        isHovered: true,
      },
    })

    expect(wrapper.findAll('.action-button')).toHaveLength(0)
  })

  it('hides default content when hovered', () => {
    const wrapper = mount(MondrianProjectCard, {
      props: {
        project: mockProject,
        isHovered: true,
      },
    })

    expect(wrapper.find('.content-hidden').exists()).toBe(true)
  })
})
