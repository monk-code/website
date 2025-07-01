import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with DOM matchers
expect.extend(matchers.default ?? matchers)

// Global test utilities can be added here