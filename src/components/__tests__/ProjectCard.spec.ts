import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import ProjectCard from '../ProjectCard.vue'

describe('ProjectCard', () => {
  it('displays project title', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience',
        imageUrl: '/images/project.jpg',
        techStack: ['Vue.js'],
      },
    })

    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument()
  })

  it('displays project description', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience built with Vue.js',
        imageUrl: '/images/project.jpg',
        techStack: ['Vue.js'],
      },
    })

    expect(screen.getByText('A modern shopping experience built with Vue.js')).toBeInTheDocument()
  })

  it('shows project image with proper alt text', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience',
        imageUrl: '/images/ecommerce-project.jpg',
        techStack: ['Vue.js'],
      },
    })

    const image = screen.getByRole('img', { name: 'Screenshot of E-commerce Platform project' })
    expect(image).toHaveAttribute('src', '/images/ecommerce-project.jpg')
  })

  it('displays all tech stack items', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience',
        imageUrl: '/images/project.jpg',
        techStack: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
      },
    })

    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
  })

  it('tech items are presented as pills/badges', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience',
        imageUrl: '/images/project.jpg',
        techStack: ['Vue.js', 'TypeScript'],
      },
    })

    // Tech items should have status role (from TechPill component)
    const vuePill = screen.getByText('Vue.js')
    expect(vuePill).toHaveAttribute('role', 'status')

    const tsPill = screen.getByText('TypeScript')
    expect(tsPill).toHaveAttribute('role', 'status')
  })

  it('shows live demo link when URL provided', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience',
        imageUrl: '/images/project.jpg',
        techStack: ['Vue.js'],
        liveUrl: 'https://example.com',
      },
    })

    const liveLink = screen.getByRole('link', { name: 'View live demo of E-commerce Platform' })
    expect(liveLink).toHaveAttribute('href', 'https://example.com')
  })

  it('shows repo link when URL provided', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience',
        imageUrl: '/images/project.jpg',
        techStack: ['Vue.js'],
        repoUrl: 'https://github.com/example/repo',
      },
    })

    const repoLink = screen.getByRole('link', { name: 'View source code for E-commerce Platform' })
    expect(repoLink).toHaveAttribute('href', 'https://github.com/example/repo')
  })

  it('links have accessible labels', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience',
        imageUrl: '/images/project.jpg',
        techStack: ['Vue.js'],
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com/example/repo',
      },
    })

    expect(
      screen.getByRole('link', { name: 'View live demo of E-commerce Platform' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'View source code for E-commerce Platform' }),
    ).toBeInTheDocument()
  })

  it('links are not shown when URLs not provided', () => {
    render(ProjectCard, {
      props: {
        title: 'E-commerce Platform',
        description: 'A modern shopping experience',
        imageUrl: '/images/project.jpg',
        techStack: ['Vue.js'],
      },
    })

    expect(screen.queryByRole('link', { name: /View live demo/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /View source code/ })).not.toBeInTheDocument()
  })
})
