import { onMounted, type Ref, ref } from 'vue'
import type { Theme } from '@/types/index.js'

interface ThemeComposable {
  currentTheme: Ref<Theme>
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  isDark: Ref<boolean>
}

export const useTheme = (): ThemeComposable => {
  const currentTheme = ref<Theme>('light')

  const isDark = ref(false)

  const setTheme = (theme: Theme): void => {
    currentTheme.value = theme
    isDark.value = theme === 'dark'

    // Update document attribute
    document.documentElement.setAttribute('data-theme', theme)

    // Store in localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }

    // Dispatch custom event for persistence script
    window.dispatchEvent(
      new CustomEvent('theme-change', {
        detail: { theme },
      }),
    )
  }

  const toggleTheme = (): void => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Initialize theme on mount
  onMounted(() => {
    // Get theme from localStorage or system preference
    const stored =
      typeof localStorage !== 'undefined' ? (localStorage.getItem('theme') as Theme | null) : null

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    const initialTheme = stored || systemTheme
    setTheme(initialTheme)
  })

  return {
    currentTheme,
    toggleTheme,
    setTheme,
    isDark,
  }
}
