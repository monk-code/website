import { render, screen } from '@testing-library/vue'
import type { ImageMetadata } from 'astro'
import { describe, expect, it } from 'vitest'
import { getUniqueTechnologies, projects } from '@/data/projects'
import Projects from '../Projects.vue'

// Mock ImageMetadata objects for testing
const mockImage1: ImageMetadata = {
  src: '/test-image-1.jpg',
  width: 600,
  height: 400,
  format: 'jpg' as const,
}

const mockImage2: ImageMetadata = {
  src: '/test-image-2.jpg',
  width: 600,
  height: 400,
  format: 'jpg' as const,
}

const mockProjects = [
  {
    id: 'project-1',
    title: 'Test Project 1',
    description: 'A test project description',
    imageUrl: mockImage1,
    techStack: ['React', 'TypeScript'],
    liveUrl: 'https://example.com/project1',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Test Project 2',
    description: 'Another test project',
    imageUrl: mockImage2,
    techStack: ['Vue.js', 'JavaScript'],
    liveUrl: 'https://example.com/project2',
    featured: false,
  },
]

describe('Projects Section Logic', () => {
  it('real projects data has correct structure', () => {
    expect(projects).toBeInstanceOf(Array)
    expect(projects.length).toBeGreaterThan(0)

    for (const project of projects) {
      expect(project.id).toBeDefined()
      expect(project.title).toBeDefined()
      expect(project.description).toBeDefined()
      expect(project.imageUrl).toBeDefined()
      expect(project.techStack).toBeInstanceOf(Array)
      expect(typeof project.featured).toBe('boolean')
    }
  })

  it('extracts unique technologies correctly', () => {
    const technologies = getUniqueTechnologies(mockProjects)
    expect(technologies).toEqual(['JavaScript', 'React', 'TypeScript', 'Vue.js'])
  })

  it('filters projects by technology correctly', () => {
    const reactProjects = mockProjects.filter((project) => project.techStack.includes('React'))
    expect(reactProjects).toHaveLength(1)
    expect(reactProjects[0].title).toBe('Test Project 1')

    const vueProjects = mockProjects.filter((project) => project.techStack.includes('Vue.js'))
    expect(vueProjects).toHaveLength(1)
    expect(vueProjects[0].title).toBe('Test Project 2')
  })

  it('identifies featured projects correctly', () => {
    const featuredProjects = mockProjects.filter((p) => p.featured)
    const regularProjects = mockProjects.filter((p) => !p.featured)

    expect(featuredProjects).toHaveLength(1)
    expect(featuredProjects[0].title).toBe('Test Project 1')

    expect(regularProjects).toHaveLength(1)
    expect(regularProjects[0].title).toBe('Test Project 2')
  })
})

describe('Projects Section Layout', () => {
  it('renders projects section with correct structure', () => {
    render(Projects, {
      props: {
        projects: mockProjects,
      },
    })

    const section = screen.getByRole('region', { name: /selected work/i })
    expect(section).toBeInTheDocument()

    const heading = screen.getByRole('heading', { name: /selected work/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders technology filter with all unique technologies', () => {
    render(Projects, {
      props: {
        projects: mockProjects,
      },
    })

    const allButton = screen.getByRole('button', { name: /all/i })
    expect(allButton).toBeInTheDocument()

    const jsButton = screen.getByRole('button', { name: /javascript/i })
    expect(jsButton).toBeInTheDocument()

    const reactButton = screen.getByRole('button', { name: /react/i })
    expect(reactButton).toBeInTheDocument()
  })

  it('applies mondrian grid layout classes', () => {
    const { container } = render(Projects, {
      props: {
        projects: mockProjects,
      },
    })

    const grid = container.querySelector('.mondrian-grid')
    expect(grid).toBeInTheDocument()

    const gridItems = container.querySelectorAll('.grid-item')
    expect(gridItems.length).toBeGreaterThan(0)
  })

  it('renders project cards within grid layout', () => {
    const { container } = render(Projects, {
      props: {
        projects: [
          {
            ...mockProjects[0],
            id: 'bright-energy',
          },
          {
            ...mockProjects[1],
            id: 'bricsys-247',
          },
        ],
      },
    })

    const heroProject = container.querySelector('.hero-project')
    expect(heroProject).toBeInTheDocument()

    const secondaryProject = container.querySelector('.secondary-project')
    expect(secondaryProject).toBeInTheDocument()
  })
})
