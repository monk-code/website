# Step 1: Test-First Project Setup with Astro

## Goal
Initialize the MONKCODE portfolio website with TDD infrastructure FIRST, then add Astro with Vue 3 integration following strict TypeScript and functional programming principles.

## Core Principle
**NO PRODUCTION CODE WITHOUT A FAILING TEST.** Testing infrastructure must be established before writing any implementation code. This is non-negotiable.

## Prerequisites
- Node.js v18.20.8+, v20.3.0+, or v22.0.0+ (not v19 or v21)
- pnpm (preferred) or npm
- Terminal access
- VS Code with Astro extension (recommended)

## Files to Create/Modify
- `vitest.config.ts` - Test configuration with Astro integration
- `biome.json` - Code quality tooling
- `tsconfig.json` - Strict TypeScript with path aliases
- `package.json` - Dependencies and scripts
- `test/setup.ts` - Test utilities and configuration
- `astro.config.mjs` - Astro configuration (after tests)

## Implementation Steps

### 1. Initialize Project with Proper Structure
```bash
# Create project directory if needed
mkdir -p /Users/gdseck/dev/monkcode/projects/website
cd /Users/gdseck/dev/monkcode/projects/website

# Start fresh - remove any existing configuration
rm -f package.json package-lock.json pnpm-lock.yaml

# Initialize with pnpm
pnpm init
```

### 2. Install Testing Infrastructure FIRST
```bash
# Core testing dependencies - these come before everything else
pnpm add -D vitest @vitest/ui @vitest/coverage-v8

# Vue testing utilities
pnpm add -D @vue/test-utils @testing-library/vue @testing-library/user-event
pnpm add -D @testing-library/jest-dom

# Test environments
pnpm add -D jsdom happy-dom

# API mocking for future use
pnpm add -D msw @mswjs/data

# TypeScript support (needed for tests)
pnpm add -D typescript
```

### 3. Create Test Directory Structure
```bash
# Create test directories using absolute paths
mkdir -p /Users/gdseck/dev/monkcode/projects/website/src/components/__tests__
mkdir -p /Users/gdseck/dev/monkcode/projects/website/src/layouts/__tests__
mkdir -p /Users/gdseck/dev/monkcode/projects/website/src/pages/__tests__
mkdir -p /Users/gdseck/dev/monkcode/projects/website/src/lib/__tests__
mkdir -p /Users/gdseck/dev/monkcode/projects/website/test/fixtures
mkdir -p /Users/gdseck/dev/monkcode/projects/website/test/utils
```

### 4. Configure TypeScript with Strict Mode and Path Aliases
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node16",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowJs": false,
    "resolveJsonModule": true,
    "verbatimModuleSyntax": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"],
      "@tests/*": ["test/*"]
    }
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules", "dist", ".astro"]
}
```

### 5. Configure Vitest for TDD
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      },
      exclude: [
        'node_modules/**',
        'dist/**',
        '.astro/**',
        'test/**',
        '**/*.config.*',
        '**/*.d.ts'
      ]
    },
    include: ['src/**/*.spec.ts'],
    setupFiles: ['./test/setup.ts']
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@layouts': '/src/layouts',
      '@lib': '/src/lib',
      '@tests': '/test'
    }
  }
})
```

### 6. Create Test Setup
Create `test/setup.ts`:
```typescript
import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with DOM matchers
expect.extend(matchers)

// Global test utilities can be added here
```

### 7. Write First Failing Test (RED Phase)
Create `src/components/__tests__/header.spec.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
// Using path alias - no relative imports
import Header from '@components/header.vue'

describe('Header Component', () => {
  it('displays the MONKCODE brand name', () => {
    render(Header)
    
    const brandName = screen.getByText('MONKCODE')
    expect(brandName).toBeInTheDocument()
  })

  it('uses Montserrat font for the brand name', () => {
    render(Header)
    
    const brandName = screen.getByText('MONKCODE')
    expect(brandName).toHaveClass('font-montserrat')
  })

  it('has proper accessibility attributes', () => {
    render(Header)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})
```

### 8. Verify Tests Fail (Confirming TDD Setup)
```bash
# Run tests - they should fail since Header component doesn't exist
pnpm test

# You should see:
# ❌ FAIL src/components/__tests__/header.spec.ts
# This confirms our TDD setup is working correctly!
```

### 9. Install and Configure Biome
```bash
# Install Biome for code quality (replaces ESLint/Prettier)
pnpm add -D @biomejs/biome
```

Create `biome.json`:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.5.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "error",
        "noImplicitAnyLet": "error"
      },
      "style": {
        "noVar": "error",
        "useConst": "error",
        "useNodejsImportProtocol": "error"
      },
      "complexity": {
        "noForEach": "warn",
        "noBannedTypes": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "semicolons": "asNeeded",
      "trailingComma": "all"
    }
  }
}
```

### 10. NOW Install Astro and Vue (After Test Infrastructure)
```bash
# Install Astro core with TypeScript support
pnpm add astro @astrojs/check

# Install Vue 3 integration
pnpm add @astrojs/vue vue

# Install Tailwind for MONKCODE's clean, structured layouts
pnpm add -D @astrojs/tailwind tailwindcss

# Install additional Astro dependencies
pnpm add -D @vitejs/plugin-vue
```

### 11. Create Astro Configuration
Create `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      jsx: false, // We use templates, not JSX
      devtools: true, // Enable Vue DevTools in development
    }),
    tailwind({
      applyBaseStyles: false, // We'll control base styles for MONKCODE brand
    })
  ],
  output: 'static', // Portfolio site is static
  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },
  vite: {
    // Merge with Vitest config
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@lib': '/src/lib'
      }
    }
  }
})
```

### 12. Update Vitest Config for Astro Integration
Update `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import { getViteConfig } from 'astro/config'

export default defineConfig(
  getViteConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        thresholds: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        },
        exclude: [
          'node_modules/**',
          'dist/**',
          '.astro/**',
          'test/**',
          '**/*.config.*',
          '**/*.d.ts'
        ]
      },
      include: ['src/**/*.spec.ts'],
      setupFiles: ['./test/setup.ts']
    }
  })
)
```

### 13. Update Package.json with Complete Scripts
Update `package.json`:
```json
{
  "name": "monkcode-website",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "pnpm run check && astro build",
    "preview": "astro preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "coverage": "vitest run --coverage",
    "types:check": "tsc --noEmit",
    "astro:check": "astro check",
    "lint": "biome check .",
    "format": "biome format --write .",
    "check": "pnpm run types:check && pnpm run astro:check && pnpm run lint && pnpm run test:run"
  },
  "engines": {
    "node": ">=18.20.8"
  }
}
```

### 14. Create Essential Project Files

Create `src/env.d.ts`:
```typescript
/// <reference types="astro/client" />
```

Create `.gitignore`:
```
# Dependencies
node_modules/

# Build outputs
dist/
.astro/

# Testing
coverage/
.nyc_output/

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Editor
.idea/
.vscode/*
!.vscode/extensions.json
!.vscode/launch.json
*.swp
*.swo
.DS_Store

# Environment
.env
.env.local
.env.production

# AI workspace - temporary work
ai-workspace/
ai/

# OS
Thumbs.db
```

### 15. Create Project Structure
```bash
# Pages directory for Astro routes
mkdir -p /Users/gdseck/dev/monkcode/projects/website/src/pages

# Styles directory for MONKCODE brand CSS
mkdir -p /Users/gdseck/dev/monkcode/projects/website/src/styles

# Public assets for portfolio content
mkdir -p /Users/gdseck/dev/monkcode/projects/website/public/images
mkdir -p /Users/gdseck/dev/monkcode/projects/website/public/fonts

# AI workspace for temporary development
mkdir -p /Users/gdseck/dev/monkcode/projects/website/ai-workspace
```

## Verification Checklist

### 1. TDD Infrastructure Working
```bash
# Run tests - should show failing tests
pnpm test

# Expected output:
# ❌ FAIL src/components/__tests__/header.spec.ts
#   Header Component
#     × displays the MONKCODE brand name
#     × uses Montserrat font for the brand name
#     × has proper accessibility attributes
```

### 2. Type Checking Passes
```bash
# Check TypeScript compilation
pnpm types:check

# Should complete without errors (no implementation yet)
```

### 3. Astro Setup Valid
```bash
# Verify Astro configuration
pnpm astro:check

# Should report Astro is configured correctly
```

### 4. Code Quality Tools Working
```bash
# Run Biome checks
pnpm lint

# Format code
pnpm format
```

### 5. All Checks Pass Together
```bash
# Run complete check suite
pnpm check

# This runs: types:check && astro:check && lint && test:run
```

## Common Issues & Solutions

### Module Resolution Issues
- Ensure `"moduleResolution": "node16"` in tsconfig.json
- Use `.js` extensions when importing TypeScript files
- Verify path aliases match in all configs

### Test Import Errors
- Path aliases must be consistent across vitest.config.ts and tsconfig.json
- Use `@components/component-name.vue` not relative paths
- Ensure test setup file is referenced correctly

### Biome vs ESLint Conflicts
- Remove all ESLint/Prettier configs if they exist
- Use `pnpm format` to auto-fix formatting issues
- Configure VS Code to use Biome as default formatter

### Vue Component Testing
- Use `@testing-library/vue` for component tests
- Don't use Astro's Container API for Vue components
- Ensure Vue plugin is loaded in Vitest config

## TDD Workflow for MONKCODE Portfolio

1. **Red Phase**
   - Write test for portfolio feature (e.g., project card)
   - Run `pnpm test` - see it fail
   - This confirms what we need to build

2. **Green Phase**
   - Write minimal code to make test pass
   - No extra features or abstractions
   - Run `pnpm test` - see it pass

3. **Refactor Phase**
   - Run `pnpm types:check` - ensure types are correct
   - Assess if code can be improved
   - Keep tests passing during refactoring

4. **Commit**
   - Run `pnpm check` - all checks must pass
   - Commit with descriptive message
   - No AI attribution in commit messages

## Example TDD Cycle

```bash
# 1. Write failing test for portfolio hero section
# 2. Run: pnpm test (RED)
# 3. Implement minimal hero component
# 4. Run: pnpm test (GREEN)
# 5. Run: pnpm types:check
# 6. Refactor if needed
# 7. Run: pnpm check
# 8. Commit: "feat: add hero section with MONKCODE branding"
```

## Next Step
→ [Step 2: Design System](./02-design-system.md) - Implement MONKCODE visual identity WITH TESTS FIRST. We'll create the color palette, typography, and spacing system that reflects the Monk/Rhythm duality.n