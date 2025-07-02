import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

// Extend Vitest's expect with DOM matchers
expect.extend(matchers.default ?? matchers)

// Global test utilities can be added here

// Mock CSS imports for Tailwind CSS v4 compatibility
if (typeof CSS === 'undefined') {
  globalThis.CSS = {
    supports: () => false,
    escape: (str: string) => str,
  } as unknown as typeof CSS
}
