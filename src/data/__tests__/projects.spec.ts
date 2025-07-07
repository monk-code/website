import { describe, expect, it } from 'vitest'
import { getUniqueTechnologies, projects } from '../projects'

describe('projects data', () => {
  it('contains all required fields for displaying projects', () => {
    expect(projects).toBeInstanceOf(Array)
    expect(projects.length).toBeGreaterThan(0)

    for (const project of projects) {
      expect(project.id).toBeDefined()
      expect(project.title).toBeDefined()
      expect(project.description).toBeDefined()
      expect(project.imageUrl).toBeDefined()
      expect(project.techStack).toBeInstanceOf(Array)
      expect(project.techStack.length).toBeGreaterThan(0)
      expect(typeof project.featured).toBe('boolean')
    }
  })

  it('extracts all unique technologies from projects', () => {
    const uniqueTechnologies = getUniqueTechnologies(projects)

    expect(uniqueTechnologies).toBeInstanceOf(Array)
    expect(uniqueTechnologies.length).toBeGreaterThan(0)

    // Should not have duplicates
    const uniqueSet = new Set(uniqueTechnologies)
    expect(uniqueTechnologies.length).toBe(uniqueSet.size)

    // Should be sorted
    const sorted = [...uniqueTechnologies].sort()
    expect(uniqueTechnologies).toEqual(sorted)
  })

  it('has at least one featured project', () => {
    const featuredProjects = projects.filter((p) => p.featured)
    expect(featuredProjects.length).toBeGreaterThan(0)
  })
})
