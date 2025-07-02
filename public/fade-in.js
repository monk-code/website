// Fade-in animation using Intersection Observer
;(function () {
  'use strict'

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible')
    })
    return
  }

  // Configuration
  const config = {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  }

  // Callback function
  const fadeInOnScroll = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add visible class with a slight delay for staggered effect
        const delay = entry.target.dataset.delay || 0
        setTimeout(function () {
          entry.target.classList.add('visible')
        }, delay)

        // Stop observing once animated
        observer.unobserve(entry.target)
      }
    })
  }

  // Create observer
  const observer = new IntersectionObserver(fadeInOnScroll, config)

  // Start observing all fade-in elements
  document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fade-in')
    elements.forEach(function (el, index) {
      // Add staggered delay for elements in the same section
      if (el.parentElement && el.parentElement.children.length > 1) {
        el.dataset.delay = index * 100
      }
      observer.observe(el)
    })
  })

  // Handle dynamically added elements
  const observeNewElements = function () {
    document.querySelectorAll('.fade-in:not(.visible)').forEach(function (el) {
      observer.observe(el)
    })
  }

  // Watch for new elements (useful for client-side routing)
  if ('MutationObserver' in window) {
    const mutationObserver = new MutationObserver(observeNewElements)
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }
})()
