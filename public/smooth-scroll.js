// Smooth scrolling for anchor links
;(() => {
  // Only apply to same-page anchors
  document.addEventListener('click', (e) => {
    // Ensure we only handle actual clicks (not programmatic triggers)
    if (!e.isTrusted) return

    // Check if clicked element is an anchor with hash
    const link = e.target.closest('a[href^="#"]')
    if (!link) return

    // Don't interfere with special keys (Ctrl, Cmd, Shift, etc.)
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return

    const targetId = link.getAttribute('href')
    if (targetId === '#') return

    const target = document.querySelector(targetId)
    if (!target) return

    // Prevent default anchor behavior ONLY for valid targets
    e.preventDefault()

    // Calculate scroll position (account for fixed header if exists)
    const header = document.querySelector('header') || document.querySelector('[role="banner"]')
    const headerHeight = header ? header.offsetHeight : 0
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20 // 20px extra padding

    // Smooth scroll to target
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })

    // Update URL without jumping
    if (history.pushState) {
      history.pushState(null, null, targetId)
    }

    // Set focus for accessibility (remove outline)
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })

    // Remove tabindex after focus to maintain natural tab order
    target.addEventListener(
      'blur',
      () => {
        target.removeAttribute('tabindex')
      },
      { once: true },
    )
  })

  // Handle browser back/forward with smooth scroll
  window.addEventListener('popstate', () => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        const headerHeight = 73
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - headerHeight

        setTimeout(() => {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          })
        }, 0)
      }
    }
  })
})()
