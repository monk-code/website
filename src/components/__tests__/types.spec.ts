import { describe, expectTypeOf, it } from 'vitest'
import type { IconLinkProps, ProjectCardProps, TechPillProps } from '@/types/index.js'

describe('Component Type Definitions', () => {
  it('TechPillProps type exists', () => {
    expectTypeOf<TechPillProps>().toBeObject()
  })

  it('IconLinkProps type exists', () => {
    expectTypeOf<IconLinkProps>().toBeObject()
    expectTypeOf<IconLinkProps>().toHaveProperty('href')
    expectTypeOf<IconLinkProps>().toHaveProperty('ariaLabel')
  })

  it('ProjectCardProps type exists', () => {
    expectTypeOf<ProjectCardProps>().toBeObject()
    expectTypeOf<ProjectCardProps>().toHaveProperty('title')
    expectTypeOf<ProjectCardProps>().toHaveProperty('description')
    expectTypeOf<ProjectCardProps>().toHaveProperty('imageUrl')
    expectTypeOf<ProjectCardProps>().toHaveProperty('techStack')
  })
})
