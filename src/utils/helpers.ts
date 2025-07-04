import type { Theme } from '@/types/index.js'

// Theme utilities
export const getStoredTheme = (): Theme | null => {
  if (typeof localStorage === 'undefined') return null
  const stored = localStorage.getItem('theme')
  return stored === 'light' || stored === 'dark' ? stored : null
}

export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const getInitialTheme = (): Theme => {
  return getStoredTheme() || getSystemTheme()
}

// URL utilities
export const isExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url, window.location.origin)
    return urlObj.origin !== window.location.origin
  } catch {
    return false
  }
}

export const createSafeUrl = (url: string): string => {
  if (url.startsWith('#') || url.startsWith('/')) {
    return url
  }

  if (isExternalUrl(url)) {
    return url
  }

  // Default to hash link for safety
  return `#${url}`
}

// String utilities
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

// Array utilities
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array))
}

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// DOM utilities
export const scrollToElement = (elementId: string, offset = 0): void => {
  const element = document.getElementById(elementId.replace('#', ''))
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    
    // If clipboard API is not available, return false
    return false
  } catch {
    return false
  }
}

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Throttle utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let isThrottled = false

  return (...args: Parameters<T>) => {
    if (isThrottled) return

    func(...args)
    isThrottled = true
    setTimeout(() => {
      isThrottled = false
    }, delay)
  }
}

// Format utilities
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }

  return 'just now'
}

// Error handling utilities
export const createErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'An unexpected error occurred'
}
