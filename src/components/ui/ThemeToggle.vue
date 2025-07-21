<template>
  <div class="relative">
    <button
      id="theme-toggle"
      :class="[
        'group inline-flex h-10 w-10 items-center justify-center rounded-md border',
        'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-900',
        'dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-100',
        'focus:outline-none focus:border-primary focus:scale-105 focus-ring-primary',
        'transition-all duration-200 cursor-pointer',
        className
      ]"
      aria-label="Toggle color theme"
      aria-live="polite"
      @click="toggleTheme"
    >
      <!-- Sun icon (for light mode) -->
      <svg
        class="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      <!-- Moon icon (for dark mode) -->
      <svg
        class="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      <!-- Screen reader announcement -->
      <span class="sr-only">{{ currentThemeAnnouncement }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const className = computed(() => props.class)
const currentTheme = ref<'light' | 'dark'>('light')

const currentThemeAnnouncement = computed(
  () => `Current theme: ${currentTheme.value === 'dark' ? 'Dark' : 'Light'}`,
)

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
  currentTheme.value = newTheme

  // Dispatch custom event for theme persistence
  window.dispatchEvent(
    new CustomEvent('theme-change', {
      detail: { theme: newTheme },
    }),
  )
}

// Initialize theme from DOM
onMounted(() => {
  const theme = document.documentElement.getAttribute('data-theme') || 'light'
  currentTheme.value = theme as 'light' | 'dark'

  // Listen for external theme changes
  const handleThemeChange = () => {
    const theme = document.documentElement.getAttribute('data-theme') || 'light'
    currentTheme.value = theme as 'light' | 'dark'
  }

  // Create mutation observer to watch for data-theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        handleThemeChange()
      }
    })
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
})
</script>

<style scoped>
/* Enhanced accessibility - respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .group {
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }
  
  .group:hover {
    transform: none; /* Remove scaling animations */
  }
  
  svg {
    transition: opacity 0.2s ease; /* Simplified transitions */
  }
}
</style>