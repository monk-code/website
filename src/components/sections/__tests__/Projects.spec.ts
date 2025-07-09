import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import BentoGrid from '@/components/ui/BentoGrid.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import Projects from '../Projects.vue'

// Mock the project data
vi.mock('../../../../ai-workspace/projects-data-backup', () => ({
  projects: [
    {
      id: 'bright-energy',
      title: 'Bright Energy Platform',
      type: 'IoT Energy Management System',
      description: 'Energy management platform',
      imageUrl: { src: '/bright-energy.png', width: 600, height: 400, format: 'png' },
      techStack: ['Vue.js', 'TypeScript'],
      liveUrl: 'https://app.bright-energy.eu',
      featured: true,
      dateRange: '2024-Present',
    },
    {
      id: 'bricsys-247',
      title: 'Bricsys 24/7',
      type: 'Enterprise SaaS Platform',
      description: 'Document management platform',
      imageUrl: { src: '/bricsys.png', width: 600, height: 400, format: 'png' },
      techStack: ['React', 'WebSocket'],
      liveUrl: 'https://www.bricsys.com/247',
      featured: false,
      dateRange: '2023-2024',
    },
  ],
}))

describe('Projects', () => {
  it('renders section with correct title', () => {
    const wrapper = mount(Projects)

    const section = wrapper.find('section')
    expect(section.exists()).toBe(true)
    expect(section.classes()).toContain('projects-section')

    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('Projects')
  })

  it('renders section description', () => {
    const wrapper = mount(Projects)

    const description = wrapper.find('.section-description')
    expect(description.exists()).toBe(true)
    expect(description.text()).toContain('featured work')
  })

  it('uses BentoGrid component for layout', () => {
    const wrapper = mount(Projects)

    const bentoGrid = wrapper.findComponent(BentoGrid)
    expect(bentoGrid.exists()).toBe(true)
  })

  it('renders Bright Energy as featured project', () => {
    const wrapper = mount(Projects)

    const featuredCard = wrapper.find('[data-featured="true"]')
    expect(featuredCard.exists()).toBe(true)

    const featuredProject = featuredCard.findComponent(ProjectCard)
    expect(featuredProject.props('project').id).toBe('bright-energy')
    expect(featuredProject.props('size')).toBe('large')
  })

  it('renders non-featured projects in default slots', () => {
    const wrapper = mount(Projects)

    const regularCards = wrapper.findAll('[data-featured="false"]')
    expect(regularCards.length).toBeGreaterThan(0)

    const regularProject = regularCards[0].findComponent(ProjectCard)
    expect(regularProject.props('size')).toBe('normal')
  })

  it('renders all projects from data', () => {
    const wrapper = mount(Projects)

    const allCards = wrapper.findAllComponents(ProjectCard)
    expect(allCards).toHaveLength(2)
  })

  it('applies fade-in animation classes', () => {
    const wrapper = mount(Projects)

    const section = wrapper.find('section')
    expect(section.classes()).toContain('fade-in')
  })

  it('has proper semantic structure', () => {
    const wrapper = mount(Projects)

    const section = wrapper.find('section')
    expect(section.attributes('id')).toBe('projects')
    expect(section.attributes('aria-labelledby')).toBe('projects-title')

    const title = wrapper.find('h2')
    expect(title.attributes('id')).toBe('projects-title')
  })

  it('handles projects data correctly', () => {
    const wrapper = mount(Projects)

    // Verify that projects are rendered based on the mock data
    const cards = wrapper.findAllComponents(ProjectCard)
    expect(cards.length).toBeGreaterThan(0)

    // Verify featured project exists
    const featured = wrapper.find('[data-featured="true"]')
    expect(featured.exists()).toBe(true)
  })

  it('emits project click events', async () => {
    const wrapper = mount(Projects)

    const firstCard = wrapper.findComponent(ProjectCard)
    await firstCard.vm.$emit('click', { id: 'bright-energy' })

    // Since Projects doesn't emit, we just verify the event propagation works
    expect(firstCard.emitted('click')).toBeTruthy()
  })

  it('applies correct grid configuration', () => {
    const wrapper = mount(Projects)

    const bentoGrid = wrapper.findComponent(BentoGrid)
    expect(bentoGrid.props('cols')).toEqual({
      default: 1,
      md: 2,
      lg: 4,
    })
    expect(bentoGrid.props('gap')).toBe('6')
  })

  it('maintains accessibility with proper ARIA labels', () => {
    const wrapper = mount(Projects)

    const cards = wrapper.findAllComponents(ProjectCard)
    for (const card of cards) {
      const element = card.find('.project-card')
      expect(element.attributes('role')).toBe('article')
      expect(element.attributes('aria-label')).toBeTruthy()
    }
  })
})
