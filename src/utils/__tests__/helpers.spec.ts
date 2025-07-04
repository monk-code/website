import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  capitalize,
  chunk,
  createErrorMessage,
  debounce,
  formatDate,
  isValidEmail,
  isValidUrl,
  slugify,
  throttle,
  truncate,
  unique,
} from '../helpers.js'

describe('String utilities', () => {
  describe('slugify', () => {
    it('converts text to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('Hello   World!')).toBe('hello-world')
      expect(slugify('Test@#$%^&*()Test')).toBe('testtest')
      expect(slugify('Multiple---Dashes')).toBe('multiple-dashes')
    })

    it('handles edge cases', () => {
      expect(slugify('')).toBe('')
      expect(slugify('   ')).toBe('')
      expect(slugify('---')).toBe('')
    })
  })

  describe('capitalize', () => {
    it('capitalizes first letter and lowercases rest', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('HELLO')).toBe('Hello')
      expect(capitalize('hELLo')).toBe('Hello')
    })

    it('handles edge cases', () => {
      expect(capitalize('')).toBe('')
      expect(capitalize('a')).toBe('A')
    })
  })

  describe('truncate', () => {
    it('truncates long text correctly', () => {
      const longText = 'This is a very long piece of text that should be truncated'
      expect(truncate(longText, 20)).toBe('This is a very long...')
    })

    it('preserves short text', () => {
      const shortText = 'Short text'
      expect(truncate(shortText, 20)).toBe('Short text')
    })

    it('handles word boundaries', () => {
      const text = 'Hello world this is a test'
      expect(truncate(text, 15)).toBe('Hello world...')
    })
  })
})

describe('Array utilities', () => {
  describe('unique', () => {
    it('removes duplicate values', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
    })

    it('handles empty arrays', () => {
      expect(unique([])).toEqual([])
    })
  })

  describe('chunk', () => {
    it('splits array into chunks of specified size', () => {
      expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ])
      expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([
        [1, 2, 3],
        [4, 5],
      ])
    })

    it('handles edge cases', () => {
      expect(chunk([], 2)).toEqual([])
      expect(chunk([1, 2], 5)).toEqual([[1, 2]])
    })
  })
})

describe('Validation utilities', () => {
  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('user+tag@example.org')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('invalid@')).toBe(false)
      expect(isValidEmail('@invalid.com')).toBe(false)
      expect(isValidEmail('invalid.com')).toBe(false)
    })

    it('handles whitespace', () => {
      expect(isValidEmail(' test@example.com ')).toBe(true)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://test.org')).toBe(true)
      expect(isValidUrl('https://sub.domain.com/path')).toBe(true)
    })

    it('rejects invalid URLs', () => {
      expect(isValidUrl('invalid')).toBe(false)
      expect(isValidUrl('ftp://invalid')).toBe(true) // URL constructor accepts ftp
      expect(isValidUrl('')).toBe(false)
    })
  })
})

describe('Function utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('debounce', () => {
    it('delays function execution', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('cancels previous calls', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      vi.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    it('limits function calls', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn()
      throttledFn()
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(100)
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })
  })
})

describe('Format utilities', () => {
  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2023-12-25')
      const formatted = formatDate(date)
      expect(formatted).toMatch(/December 25, 2023/)
    })

    it('handles string dates', () => {
      const formatted = formatDate('2023-12-25')
      expect(formatted).toMatch(/December 25, 2023/)
    })
  })
})

describe('Error utilities', () => {
  describe('createErrorMessage', () => {
    it('extracts message from Error objects', () => {
      const error = new Error('Test error')
      expect(createErrorMessage(error)).toBe('Test error')
    })

    it('handles string errors', () => {
      expect(createErrorMessage('String error')).toBe('String error')
    })

    it('handles unknown error types', () => {
      expect(createErrorMessage(null)).toBe('An unexpected error occurred')
      expect(createErrorMessage(undefined)).toBe('An unexpected error occurred')
      expect(createErrorMessage({})).toBe('An unexpected error occurred')
    })
  })
})
