// Smooth scrolling for anchor links
;(() => {
  // Only apply to same-page anchors
  document.addEventListener('click', (e) => {
    // Check if clicked element is an anchor with hash
    const link = e.target.closest('a[href^="#"]')
    if (!link) return

    const targetId = link.getAttribute('href')
    if (targetId === '#') return

    const target = document.querySelector(targetId)
    if (!target) return

    // Prevent default anchor behavior
    e.preventDefault()

    // Calculate scroll position (account for fixed header)
    const headerHeight = 73 // Height of fixed header
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight

    // Smooth scroll to target
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })

    // Update URL without jumping
    if (history.pushState) {
      history.pushState(null, null, targetId)
    }

    // Set focus for accessibility
    target.setAttribute('tabindex', '-1')
    target.focus()
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
