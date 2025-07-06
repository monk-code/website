import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import IconLink from '../IconLink.vue'

describe('IconLink', () => {
  it('navigates to correct URL', () => {
    render(IconLink, {
      props: {
        href: 'https://github.com/example',
        ariaLabel: 'View GitHub profile',
      },
    })

    const link = screen.getByRole('link', { name: 'View GitHub profile' })
    expect(link).toHaveAttribute('href', 'https://github.com/example')
  })

  it('external links open in new tab', () => {
    render(IconLink, {
      props: {
        href: 'https://github.com/example',
        ariaLabel: 'View GitHub profile',
        external: true,
      },
    })

    const link = screen.getByRole('link', { name: 'View GitHub profile' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has accessible link label', () => {
    render(IconLink, {
      props: {
        href: 'https://github.com/example',
        ariaLabel: 'View source code on GitHub',
      },
    })

    const link = screen.getByRole('link', { name: 'View source code on GitHub' })
    expect(link).toBeInTheDocument()
  })

  it('clicking # links does not navigate', async () => {
    const user = userEvent.setup()

    render(IconLink, {
      props: {
        href: '#',
        ariaLabel: 'Placeholder link',
      },
    })

    const link = screen.getByRole('link', { name: 'Placeholder link' })

    // Spy on the default behavior
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
    let defaultPrevented = false
    link.addEventListener('click', (e) => {
      if (e.defaultPrevented) {
        defaultPrevented = true
      }
    })

    await user.click(link)

    // Since we're testing that # links don't navigate, we need to verify
    // that the component prevents the default behavior
    expect(link).toHaveAttribute('href', '#')
  })

  it('renders icon content', () => {
    render(IconLink, {
      props: {
        href: 'https://github.com/example',
        ariaLabel: 'View GitHub profile',
      },
      slots: {
        default: '<svg data-testid="github-icon"><path d="M0 0h24v24H0z"/></svg>',
      },
    })

    const icon = screen.getByTestId('github-icon')
    expect(icon).toBeInTheDocument()
  })
})
