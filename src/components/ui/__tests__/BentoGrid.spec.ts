import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import BentoGrid from '../BentoGrid.vue'

describe('BentoGrid', () => {
  it('renders default slot content', () => {
    const wrapper = mount(BentoGrid, {
      slots: {
        default: () => h('div', { class: 'test-item' }, 'Test Content'),
      },
    })

    expect(wrapper.find('.test-item').exists()).toBe(true)
    expect(wrapper.find('.test-item').text()).toBe('Test Content')
  })

  it('renders multiple items in grid layout', () => {
    const wrapper = mount(BentoGrid, {
      slots: {
        default: () => [
          h('div', { class: 'item-1' }, 'Item 1'),
          h('div', { class: 'item-2' }, 'Item 2'),
          h('div', { class: 'item-3' }, 'Item 3'),
        ],
      },
    })

    const grid = wrapper.find('.bento-grid')
    expect(grid.exists()).toBe(true)
    expect(wrapper.findAll('.item-1, .item-2, .item-3')).toHaveLength(3)
  })

  it('applies correct grid classes for responsive layout', () => {
    const wrapper = mount(BentoGrid)
    const grid = wrapper.find('.bento-grid')

    expect(grid.classes()).toContain('grid')
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-2')
    expect(grid.classes()).toContain('lg:grid-cols-3')
  })

  it('applies gap spacing between grid items', () => {
    const wrapper = mount(BentoGrid)
    const grid = wrapper.find('.bento-grid')

    expect(grid.classes()).toContain('gap-4')
    expect(grid.classes()).toContain('lg:gap-6')
  })

  it('supports custom gap prop', () => {
    const wrapper = mount(BentoGrid, {
      props: { gap: '8' },
    })
    const grid = wrapper.find('.bento-grid')

    expect(grid.classes()).toContain('gap-8')
  })

  it('supports custom columns configuration', () => {
    const wrapper = mount(BentoGrid, {
      props: {
        cols: {
          default: 1,
          sm: 2,
          md: 3,
          lg: 4,
        },
      },
    })
    const grid = wrapper.find('.bento-grid')

    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('sm:grid-cols-2')
    expect(grid.classes()).toContain('md:grid-cols-3')
    expect(grid.classes()).toContain('lg:grid-cols-4')
  })

  it('renders featured slot when provided', () => {
    const wrapper = mount(BentoGrid, {
      slots: {
        featured: () => h('div', { class: 'featured-item' }, 'Featured Content'),
        default: () => h('div', { class: 'regular-item' }, 'Regular Content'),
      },
    })

    expect(wrapper.find('.featured-item').exists()).toBe(true)
    expect(wrapper.find('.featured-item').text()).toBe('Featured Content')
    expect(wrapper.find('.regular-item').exists()).toBe(true)
  })

  it('applies span classes for featured items', () => {
    const wrapper = mount(BentoGrid, {
      slots: {
        featured: () => h('div', { class: 'featured-item' }, 'Featured'),
      },
    })

    const featuredWrapper = wrapper.find('.bento-grid-featured')
    expect(featuredWrapper.exists()).toBe(true)
    expect(featuredWrapper.classes()).toContain('col-span-1')
    expect(featuredWrapper.classes()).toContain('md:col-span-2')
    expect(featuredWrapper.classes()).toContain('lg:row-span-2')
  })

  it('has proper semantic HTML structure', () => {
    const wrapper = mount(BentoGrid)

    const grid = wrapper.find('.bento-grid')
    expect(grid.element.tagName).toBe('DIV')
    expect(grid.attributes('role')).toBe('grid')
  })

  it('supports auto-fit grid layout', () => {
    const wrapper = mount(BentoGrid, {
      props: { autoFit: true },
    })

    const grid = wrapper.find('.bento-grid')
    expect(grid.classes()).toContain('grid-auto-fit')
  })

  it('maintains aspect ratio for grid items', () => {
    const wrapper = mount(BentoGrid, {
      props: { aspectRatio: '16/9' },
    })

    const grid = wrapper.find('.bento-grid')
    expect(grid.classes()).toContain('aspect-16/9')
  })

  it('applies container query for responsive behavior', () => {
    const wrapper = mount(BentoGrid)
    const grid = wrapper.find('.bento-grid')

    expect(grid.classes()).toContain('container-type-inline-size')
  })
})
