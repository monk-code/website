import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import ProjectFilter from '../ProjectFilter.vue'

describe('ProjectFilter', () => {
  const mockTechnologies = ['React', 'Vue.js', 'TypeScript', 'Node.js']

  it('displays all available technology options to users', () => {
    render(ProjectFilter, {
      props: {
        technologies: mockTechnologies,
      },
    })

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('allows users to select a technology filter', async () => {
    const user = userEvent.setup()
    const onFilterChange = vi.fn()

    render(ProjectFilter, {
      props: {
        technologies: mockTechnologies,
        onFilterChange,
      },
    })

    await user.click(screen.getByText('React'))

    expect(onFilterChange).toHaveBeenCalledWith('React')
  })

  it('allows users to reset filter to show all projects', async () => {
    const user = userEvent.setup()
    const onFilterChange = vi.fn()

    render(ProjectFilter, {
      props: {
        technologies: mockTechnologies,
        onFilterChange,
      },
    })

    await user.click(screen.getByText('All'))

    expect(onFilterChange).toHaveBeenCalledWith(null)
  })

  it('displays filter buttons with premium pill-style design', () => {
    render(ProjectFilter, {
      props: {
        technologies: mockTechnologies,
      },
    })

    const allButton = screen.getByText('All')
    const reactButton = screen.getByText('React')

    expect(allButton).toHaveClass('filter-pill')
    expect(reactButton).toHaveClass('filter-pill')
  })

  it('highlights active filter with Monk Yellow accent', () => {
    render(ProjectFilter, {
      props: {
        technologies: mockTechnologies,
        selectedTechnology: 'React',
      },
    })

    const reactButton = screen.getByText('React')
    const vueButton = screen.getByText('Vue.js')

    expect(reactButton).toHaveClass('filter-pill-active')
    expect(vueButton).not.toHaveClass('filter-pill-active')
  })

  it('shows smooth transition effects on hover', () => {
    render(ProjectFilter, {
      props: {
        technologies: mockTechnologies,
      },
    })

    const reactButton = screen.getByText('React')
    expect(reactButton).toHaveClass('filter-pill-transition')
  })
})
