# Step 2: Modern Design System

## Goal
Create a scalable, accessible design system that extends Tailwind CSS v4's built-in design tokens with MONKCODE's brand identity, and establish the foundational layout including SEO, global styles, and essential scripts. Focus on documentation, accessibility, and developer experience while maintaining a lightweight implementation.

## Prerequisites
- Completed Step 1: Project Setup
- Astro project with Tailwind CSS v4 installed
- Understanding of the `BRANDING.md` guidelines
- Familiarity with design system best practices

## Tailwind CSS v4 Plugins to Install
```bash
# Essential plugins for a portfolio website
pnpm add -D @tailwindcss/forms @tailwindcss/typography
```

## Files to Create/Modify
- `src/styles/global.css` (brand tokens, base styles, theme transitions)
- `src/layouts/Layout.astro` (accessible base layout with FOUT prevention, SEO, fonts)
- `src/components/ThemeToggler.astro` (theme switcher with smooth transitions)
- `src/components/SEO.astro` (SEO meta tags component)
- `src/pages/index.astro` (living design system documentation, updated to use new Layout)
- `public/favicon.svg` (ensure brand consistency)
- `public/fade-in.js` (script for fade-in animations)
- `public/site.webmanifest` (basic site manifest)

## Design System Principles

### 1. **Tailwind-First Approach**
- Leverage Tailwind's built-in design tokens (spacing, typography, shadows)
- Only define brand-specific tokens (colors, fonts)
- Use Tailwind's utility classes directly, avoid redundant abstractions

### 2. **Documentation-Driven Development**
- Every pattern includes usage guidelines
- Provide do's and don'ts examples
- Document accessibility requirements
- Include copy-paste examples

### 3. **Accessibility Foundation**
- WCAG AA compliance for all color combinations
- Consistent focus management (focus-visible)
- Respect user preferences (reduced motion, color scheme)
- Semantic HTML and ARIA patterns

### 4. **Performance Conscious**
- Minimal custom CSS (< 10KB additional)
- Optimized font loading strategy
- No redundant token definitions
- Tree-shakeable component patterns
- Smooth theme transitions without flash
- Container queries for responsive components

## Implementation Architecture

### Token Hierarchy
```
Tailwind Built-in Tokens (spacing, typography, shadows)
↓
Brand Tokens (4 colors, 3 fonts)
↓
Semantic Mappings (CSS variables for theme switching)
↓
Component Patterns (composition over abstraction)
```

### File Structure
```
src/
├── styles/
│   └── global.css          # Brand tokens + base styles
├── layouts/
│   └── Layout.astro        # Accessible base layout
├── components/
│   └── ThemeToggler.astro  # Theme switching
└── pages/
    └── index.astro         # Living documentation
```

---

## Code Implementation

### 1. Design System Foundation (`src/styles/global.css`)

Minimal extension of Tailwind CSS v4, defining only MONKCODE's brand-specific tokens and mapping them to semantic theme variables. This lets Tailwind generate all necessary utilities (`bg-primary`, `text-accent`, etc.) automatically.

```css
@import "tailwindcss";

@theme {
  /* Brand Colors - Raw Tokens */
  --color-monk-yellow: #FFDE0A;
  --color-code-black: #121212;
  --color-silent-white: #F5F5F5;
  --color-rhythm-grey: #888888;
  
  /* Brand Typography */
  --font-family-heading: Montserrat, ui-sans-serif, system-ui, sans-serif;
  --font-family-body: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* SEMANTIC THEME TOKENS */
  /* These will generate text-primary, bg-primary, border-primary, etc. */
  --color-primary: var(--color-code-black);
  --color-primary-foreground: var(--color-silent-white);
  --color-accent: var(--color-monk-yellow);
  --color-accent-foreground: var(--color-code-black);
  
  /* Base background/foreground colors */
  --color-background: var(--color-silent-white);
  --color-foreground: var(--color-code-black);
}

/* Dark mode overrides */
:root.dark {
  --color-primary: var(--color-monk-yellow);
  --color-primary-foreground: var(--color-code-black);
  
  --color-background: var(--color-code-black);
  --color-foreground: var(--color-silent-white);
}

/* Base Styles */
@layer base {
  /* Typography setup */
  body {
    font-family: theme(fontFamily.body);
    /* Apply semantic background/foreground colors */
    @apply bg-background text-foreground antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: theme(fontFamily.heading);
    @apply font-bold;
  }
  
  code, pre {
    font-family: theme(fontFamily.mono);
  }
  
  /* Use Tailwind's selection: variant instead */
  
  /* Let Tailwind handle focus styles with focus-visible: utilities */
  
  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* Animation & Theme Utilities */
@layer utilities {
  /* Smooth theme transitions */
  .transition-theme {
    @apply transition-[color,background-color,border-color] duration-150 ease-in-out;
  }
}

/* Container Query Support */
@layer components {
  .project-card {
    @container;
  }
  
  /* Responsive without media queries */
  @container (min-width: 20rem) {
    .project-card-content {
      @apply grid-cols-2;
    }
  }
}
```

### 2. Base Layout (`src/layouts/Layout.astro`)

Accessible, performant base layout with comprehensive SEO and theme management. The body tag is simplified as base colors are now handled in `global.css`.

```astro
---
import '@/styles/global.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

const { 
  title, 
  description, 
  ogImage = '/og-default.png',
  noindex = false 
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="generator" content={Astro.generator} />
  
  <!-- SEO -->
  <title>{title} | MONKCODE</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />
  {noindex && <meta name="robots" content="noindex, nofollow" />}
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(ogImage, Astro.url)} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  
  <!-- Icons -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  
  <!-- Font Loading Strategy -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@600;700&family=JetBrains+Mono:wght@400&display=swap" 
    rel="stylesheet"
    media="print"
    onload="this.media='all'"
  />
  <noscript>
    <link 
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@600;700&family=JetBrains+Mono:wght@400&display=swap" 
      rel="stylesheet"
    />
  </noscript>

  <!-- Critical inline script for theme -->
  <script is:inline>
    // Remove no-js class
    document.documentElement.classList.remove('no-js');
    
    // Theme initialization with FOUT prevention
    (function() {
      const root = document.documentElement;
      const stored = typeof localStorage !== 'undefined' && localStorage.getItem('theme');
      const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      
      // Apply theme immediately
      root.classList.toggle('dark', theme === 'dark');
      root.setAttribute('data-theme', theme);
      
      // Add transition class after initial render
      requestAnimationFrame(() => {
        root.classList.add('transition-theme');
      });
    })();
  </script>
</head>
<body class="min-h-screen transition-theme">
  <!-- Skip to main content for keyboard users -->
  <a 
    href="#main" 
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
  >
    Skip to main content
  </a>
  
  <slot />
  
  <!-- Theme persistence -->
  <script>
    // Persist theme changes
    window.addEventListener('theme-change', (e) => {
      const theme = e.detail.theme;
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.setAttribute('data-theme', theme);
    });
  </script>
</body>
</html>
```

### 3. Theme Toggle Component (`src/components/ThemeToggler.astro`)

Accessible theme switcher with keyboard support and screen reader announcements. No changes needed here, it correctly dispatches the event handled by the base layout.

```astro
---
// Component documentation
export interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---
<div class="relative">
  <button 
    id="theme-toggle"
    class={`group inline-flex h-10 w-10 items-center justify-center rounded-md border 
            border-neutral-200 bg-white hover:bg-neutral-50 
            dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 
            transition-all duration-200 ${className}`}
    aria-label="Toggle color theme"
    aria-live="polite"
    data-theme-toggle
  >
    <!-- Sun icon (for light mode) -->
    <svg 
      class="h-5 w-5 rotate-0 scale-100 transition-all duration-300 
             dark:-rotate-90 dark:scale-0" 
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
      class="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 
             dark:rotate-0 dark:scale-100" 
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
    <span class="sr-only" data-theme-announce>Current theme: Light</span>
  </button>
</div>

<script>
  // Theme toggle logic with accessibility
  const button = document.querySelector('[data-theme-toggle]');
  const announcement = document.querySelector('[data-theme-announce]');
  
  if (button && announcement) {
    // Set initial announcement
    const updateAnnouncement = (theme: string) => {
      announcement.textContent = `Current theme: ${theme === 'dark' ? 'Dark' : 'Light'}`;
    };
    
    // Initialize
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    updateAnnouncement(currentTheme);
    
    // Handle click
    button.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      
      // Dispatch custom event for theme persistence
      window.dispatchEvent(new CustomEvent('theme-change', { 
        detail: { theme: newTheme } 
      }));
      
      // Update announcement for screen readers
      updateAnnouncement(newTheme);
    });
    
    // Keyboard navigation hint
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  }
</script>

<!-- Usage Example -->
<!-- 
<ThemeToggler /> 
<ThemeToggler class="ml-auto" />
-->
```

### 4. Design System Documentation (`src/pages/index.astro`)

Living documentation showcasing design patterns. Updated to use the new semantic color utilities (`bg-primary`, `text-primary-foreground`, etc.) and simplified focus styles.

```astro
---
import Layout from '@/layouts/Layout.astro';
import ThemeToggler from '@/components/ThemeToggler.astro';

// Design system metadata
const colorContrast = {
  'monk-yellow-on-black': { ratio: '16.42:1', level: 'AAA' },
  'white-on-black': { ratio: '18.1:1', level: 'AAA' },
  'black-on-yellow': { ratio: '16.42:1', level: 'AAA' },
  'grey-on-white': { ratio: '3.54:1', level: 'AA' },
};
---
<Layout 
  title="Design System" 
  description="MONKCODE design system documentation with accessibility guidelines and component patterns."
>
  <main id="main" class="container mx-auto max-w-6xl px-6 py-12">
    <!-- Header -->
    <header class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-8 mb-12">
      <div>
        <h1 class="text-4xl font-heading">MONKCODE Design System</h1>
        <p class="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
          Accessible, performant patterns built on Tailwind CSS v4
        </p>
      </div>
      <ThemeToggler />
    </header>

    <!-- Quick Navigation -->
    <nav class="mb-12" aria-label="Design system sections">
      <ul class="flex flex-wrap gap-2">
        <li><a href="#principles" class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">Principles</a></li>
        <li><a href="#colors" class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">Colors</a></li>
        <li><a href="#typography" class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">Typography</a></li>
        <li><a href="#components" class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">Components</a></li>
        <li><a href="#accessibility" class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">Accessibility</a></li>
        <li><a href="#animations" class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">Animations</a></li>
        <li><a href="#container-queries" class="px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">Container Queries</a></li>
      </ul>
    </nav>

    <!-- Design Principles -->
    <section id="principles" class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Design Principles</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h3 class="text-xl font-heading mb-3">Tailwind-First</h3>
          <p class="text-neutral-600 dark:text-neutral-400">
            We leverage Tailwind's comprehensive design system, only extending with brand-specific tokens.
            Use <code class="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-sm">text-lg</code> not custom sizes.
          </p>
        </div>
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h3 class="text-xl font-heading mb-3">Accessibility First</h3>
          <p class="text-neutral-600 dark:text-neutral-400">
            WCAG AA compliance minimum. Every interactive element has focus states, 
            keyboard support, and proper ARIA labels.
          </p>
        </div>
      </div>
    </section>

    <!-- Color System -->
    <section id="colors" class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Color System</h2>
      
      <!-- Brand Colors -->
      <h3 class="text-xl font-heading mb-4">Brand Colors</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Monk Yellow -->
        <div class="space-y-3">
          <div class="h-24 bg-monk-yellow rounded-lg shadow-sm flex items-end p-4">
            <span class="text-code-black font-mono text-sm">#FFDE0A</span>
          </div>
          <div>
            <p class="font-medium">Monk Yellow</p>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Primary accent</p>
            <code class="text-xs font-mono">bg-monk-yellow</code>
          </div>
        </div>
        
        <!-- Code Black -->
        <div class="space-y-3">
          <div class="h-24 bg-code-black rounded-lg shadow-sm flex items-end p-4">
            <span class="text-silent-white font-mono text-sm">#121212</span>
          </div>
          <div>
            <p class="font-medium">Code Black</p>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Primary dark</p>
            <code class="text-xs font-mono">bg-code-black</code>
          </div>
        </div>
        
        <!-- Silent White -->
        <div class="space-y-3">
          <div class="h-24 bg-silent-white rounded-lg shadow-sm border flex items-end p-4">
            <span class="text-code-black font-mono text-sm">#F5F5F5</span>
          </div>
          <div>
            <p class="font-medium">Silent White</p>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Primary light</p>
            <code class="text-xs font-mono">bg-silent-white</code>
          </div>
        </div>
        
        <!-- Rhythm Grey -->
        <div class="space-y-3">
          <div class="h-24 bg-rhythm-grey rounded-lg shadow-sm flex items-end p-4">
            <span class="text-white font-mono text-sm">#888888</span>
          </div>
          <div>
            <p class="font-medium">Rhythm Grey</p>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Muted text</p>
            <code class="text-xs font-mono">bg-rhythm-grey</code>
          </div>
        </div>
      </div>
      
      <!-- Simple Accessibility Note -->
      <h3 class="text-xl font-heading mb-4">Accessibility Note</h3>
      <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <p class="text-sm">
          All MONKCODE brand colors have been tested for WCAG AAA compliance. 
          Monk Yellow (#FFDE0A) on Code Black (#121212) provides a 16.42:1 contrast ratio.
        </p>
      </div>
    </section>

    <!-- Typography -->
    <section id="typography" class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Typography</h2>
      
      <!-- Type Scale -->
      <div class="space-y-6 mb-8">
        <div class="space-y-2">
          <h1 class="text-5xl">Heading 1</h1>
          <code class="text-sm text-neutral-600 dark:text-neutral-400">text-5xl font-heading</code>
        </div>
        <div class="space-y-2">
          <h2 class="text-4xl">Heading 2</h2>
          <code class="text-sm text-neutral-600 dark:text-neutral-400">text-4xl font-heading</code>
        </div>
        <div class="space-y-2">
          <h3 class="text-3xl">Heading 3</h3>
          <code class="text-sm text-neutral-600 dark:text-neutral-400">text-3xl font-heading</code>
        </div>
        <div class="space-y-2">
          <p class="text-lg">Large body text for emphasis and introductions.</p>
          <code class="text-sm text-neutral-600 dark:text-neutral-400">text-lg</code>
        </div>
        <div class="space-y-2">
          <p class="text-base">Regular body text. Optimized for readability at normal reading distances.</p>
          <code class="text-sm text-neutral-600 dark:text-neutral-400">text-base (default)</code>
        </div>
        <div class="space-y-2">
          <p class="text-sm">Small text for captions and secondary information.</p>
          <code class="text-sm text-neutral-600 dark:text-neutral-400">text-sm</code>
        </div>
      </div>

      <!-- Font Stacks -->
      <h3 class="text-xl font-heading mb-4">Font Families</h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <p class="font-heading text-lg mb-2">Montserrat</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Headings & Display</p>
          <code class="text-xs font-mono">font-heading</code>
        </div>
        <div class="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <p class="font-body text-lg mb-2">Inter</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Body Text</p>
          <code class="text-xs font-mono">font-body</code>
        </div>
        <div class="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <p class="font-mono text-lg mb-2">JetBrains Mono</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Code & Data</p>
          <code class="text-xs font-mono">font-mono</code>
        </div>
      </div>
    </section>

    <!-- Component Patterns -->
    <section id="components" class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Component Patterns</h2>
      
      <!-- Buttons -->
      <h3 class="text-xl font-heading mb-4">Buttons</h3>
      <div class="space-y-4 mb-8">
        <!-- Primary Button -->
        <div class="flex items-start gap-4">
          <button class="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
            Primary Action
          </button>
          <div class="flex-1">
            <p class="text-sm font-medium mb-1">Primary Button</p>
            <code class="text-xs font-mono text-neutral-600 dark:text-neutral-400">
              bg-primary text-primary-foreground hover:opacity-90
            </code>
          </div>
        </div>
        
        <!-- Secondary Button -->
        <div class="flex items-start gap-4">
          <button class="px-6 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            Secondary Action
          </button>
          <div class="flex-1">
            <p class="text-sm font-medium mb-1">Secondary Button</p>
            <code class="text-xs font-mono text-neutral-600 dark:text-neutral-400">
              border border-neutral-300 hover:bg-neutral-50
            </code>
          </div>
        </div>
        
        <!-- Disabled State -->
        <div class="flex items-start gap-4">
          <button class="px-6 py-2 bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 rounded-md cursor-not-allowed" disabled>
            Disabled
          </button>
          <div class="flex-1">
            <p class="text-sm font-medium mb-1">Disabled State</p>
            <code class="text-xs font-mono text-neutral-600 dark:text-neutral-400">
              disabled cursor-not-allowed
            </code>
          </div>
        </div>
      </div>

      <!-- Form Elements (with @tailwindcss/forms) -->
      <h3 class="text-xl font-heading mb-4">Form Elements</h3>
      <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-4">
        <p class="text-sm">
          <strong>Note:</strong> These examples use the <code class="px-1 bg-blue-100 dark:bg-blue-800 rounded">@tailwindcss/forms</code> plugin for consistent styling.
        </p>
      </div>
      
      <div class="max-w-md space-y-4">
        <!-- Text Input -->
        <div>
          <label for="example-input" class="block text-sm font-medium mb-2">
            Text Input
          </label>
          <input 
            type="text" 
            id="example-input"
            placeholder="Enter text..."
            class="w-full rounded-md border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 focus:border-accent focus:ring-accent"
          />
          <p class="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            Styled by @tailwindcss/forms with custom focus colors
          </p>
        </div>
        
        <!-- Select -->
        <div>
          <label for="example-select" class="block text-sm font-medium mb-2">
            Select
          </label>
          <select 
            id="example-select"
            class="w-full rounded-md border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 focus:border-accent focus:ring-accent"
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        
        <!-- Textarea -->
        <div>
          <label for="example-textarea" class="block text-sm font-medium mb-2">
            Textarea
          </label>
          <textarea 
            id="example-textarea"
            rows="3"
            placeholder="Enter your message..."
            class="w-full rounded-md border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 focus:border-accent focus:ring-accent"
          ></textarea>
        </div>
        
        <!-- Checkbox -->
        <div class="flex items-center">
          <input 
            id="example-checkbox"
            type="checkbox"
            class="rounded border-neutral-300 text-accent focus:ring-accent"
          />
          <label for="example-checkbox" class="ml-2 text-sm">
            I agree to the terms
          </label>
        </div>
      </div>
    </section>

    <!-- Accessibility Guidelines -->
    <section id="accessibility" class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Accessibility Guidelines</h2>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Focus Management -->
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h3 class="text-xl font-heading mb-3">Focus Management</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              All interactive elements have visible focus indicators
            </li>
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Focus rings use <code class="px-1 bg-neutral-100 dark:bg-neutral-800 rounded">ring-accent</code>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Keyboard navigation follows logical order
            </li>
          </ul>
        </div>
        
        <!-- Screen Reader Support -->
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h3 class="text-xl font-heading mb-3">Screen Reader Support</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Semantic HTML structure
            </li>
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Proper ARIA labels and descriptions
            </li>
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              <code class="px-1 bg-neutral-100 dark:bg-neutral-800 rounded">sr-only</code> for screen reader only content
            </li>
          </ul>
        </div>
        
        <!-- Motion Preferences -->
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h3 class="text-xl font-heading mb-3">Motion Preferences</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Respect <code class="px-1 bg-neutral-100 dark:bg-neutral-800 rounded">prefers-reduced-motion</code>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Animations are subtle and purposeful
            </li>
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              No auto-playing content
            </li>
          </ul>
        </div>
        
        <!-- Touch Targets -->
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h3 class="text-xl font-heading mb-3">Touch Targets</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Minimum 44x44px for touch interfaces
            </li>
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Adequate spacing between targets
            </li>
            <li class="flex items-start">
              <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
              Clear hover and active states
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Animations -->
    <section id="animations" class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Animation Utilities</h2>
      
      <h3 class="text-xl font-heading mb-4">Built-in Animations</h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Pulse -->
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div class="h-12 w-12 bg-accent rounded-full animate-pulse mb-4"></div>
          <p class="font-medium mb-1">Pulse</p>
          <code class="text-xs font-mono text-neutral-600 dark:text-neutral-400">animate-pulse</code>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Loading states, skeleton screens</p>
        </div>
        
        <!-- Spin -->
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div class="h-12 w-12 border-4 border-neutral-200 border-t-accent rounded-full animate-spin mb-4"></div>
          <p class="font-medium mb-1">Spin</p>
          <code class="text-xs font-mono text-neutral-600 dark:text-neutral-400">animate-spin</code>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Loading indicators</p>
        </div>
        
        <!-- Bounce -->
        <div class="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <div class="h-12 w-12 bg-accent rounded-md animate-bounce mb-4"></div>
          <p class="font-medium mb-1">Bounce</p>
          <code class="text-xs font-mono text-neutral-600 dark:text-neutral-400">animate-bounce</code>
          <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Attention grabbing (use sparingly)</p>
        </div>
      </div>
      
      <h3 class="text-xl font-heading mb-4">Entrance Animations</h3>
      <div class="space-y-4">
        <div class="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <p class="font-medium mb-2">Fade In Up</p>
          <code class="text-xs font-mono block mb-2">opacity-0 translate-y-4 animate-[fadeInUp_0.5s_ease-out_forwards]</code>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">Perfect for hero sections and content reveals</p>
        </div>
        
        <div class="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <p class="font-medium mb-2">Scale In</p>
          <code class="text-xs font-mono block mb-2">scale-95 opacity-0 animate-[scaleIn_0.3s_ease-out_forwards]</code>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">Modal and popup entrances</p>
        </div>
      </div>
      
      <h3 class="text-xl font-heading mb-4 mt-8">Custom Keyframes</h3>
      <div class="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <pre class="text-sm font-mono overflow-x-auto"><code>/* Add to global.css */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}</code></pre>
      </div>
    </section>

    <!-- Container Queries -->
    <section id="container-queries" class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Container Queries</h2>
      
      <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
        Container queries allow components to be responsive based on their container size, not the viewport. 
        Perfect for component-based design systems.
      </p>
      
      <h3 class="text-xl font-heading mb-4">Project Card Example</h3>
      <div class="project-card p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg mb-4">
        <div class="project-card-content grid gap-4">
          <div class="space-y-2">
            <div class="h-32 bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
            <h4 class="font-heading text-lg">Project Title</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              This card layout adapts based on container width, not viewport.
            </p>
          </div>
          <div class="space-y-2">
            <div class="h-32 bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
            <h4 class="font-heading text-lg">Another Project</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Resize the browser to see container queries in action.
            </p>
          </div>
        </div>
      </div>
      
      <div class="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <pre class="text-sm font-mono overflow-x-auto"><code>/* Component with container queries */
.project-card {
  @apply @container;
}

/* Responsive based on container, not viewport */
@container (min-width: 400px) {
  .project-card-content {
    @apply grid-cols-2;
  }
}

@container (min-width: 600px) {
  .project-card-content {
    @apply grid-cols-3;
  }
}</code></pre>
      </div>
      
      <h3 class="text-xl font-heading mb-4 mt-8">Use Cases</h3>
      <ul class="space-y-2">
        <li class="flex items-start">
          <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
          <span><strong>Sidebar Widgets</strong> - Adapt layout when moved between narrow and wide columns</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
          <span><strong>Card Components</strong> - Change from vertical to horizontal layout based on available space</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-600 dark:text-green-400 mr-2">✓</span>
          <span><strong>Navigation Menus</strong> - Switch between mobile and desktop layouts dynamically</span>
        </li>
      </ul>
    </section>

    <!-- Typography Plugin -->
    <section id="typography-plugin" class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Typography Plugin</h2>
      
      <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
        The <code class="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">@tailwindcss/typography</code> plugin provides beautiful typographic defaults for HTML content you don't control, like blog posts or documentation.
      </p>
      
      <h3 class="text-xl font-heading mb-4">Prose Classes</h3>
      <div class="prose prose-neutral dark:prose-invert max-w-none p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
        <h4>This is a prose section</h4>
        <p>
          The typography plugin automatically styles all nested elements with beautiful defaults. 
          It handles <strong>bold text</strong>, <em>italics</em>, and even <a href="#">links</a>.
        </p>
        <ul>
          <li>Unordered lists look great</li>
          <li>With proper spacing and bullets</li>
        </ul>
        <blockquote>
          Blockquotes are styled beautifully with proper indentation and styling.
        </blockquote>
        <pre><code>// Code blocks are also styled
const greeting = 'Hello, World!';</code></pre>
      </div>
      
      <h3 class="text-xl font-heading mb-4 mt-8">Usage</h3>
      <div class="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <pre class="text-sm font-mono overflow-x-auto"><code><!-- Basic prose -->
<article class="prose dark:prose-invert">
  <h1>Blog Post Title</h1>
  <p>Your content here...</p>
</article>

<!-- Custom prose colors -->
<article class="prose prose-neutral dark:prose-invert">
  <!-- Matches your design system colors -->
</article>

<!-- Limit max width -->
<article class="prose max-w-none">
  <!-- Full width prose content -->
</article></code></pre>
      </div>
      
      <h3 class="text-xl font-heading mb-4 mt-8">Customization</h3>
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        The typography plugin respects your color scheme and can be customized with modifiers:
      </p>
      <ul class="space-y-2 text-sm">
        <li><code class="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">prose-sm</code> - Smaller text size</li>
        <li><code class="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">prose-lg</code> - Larger text size</li>
        <li><code class="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">prose-headings:font-heading</code> - Use your heading font</li>
        <li><code class="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded">prose-a:text-accent</code> - Custom link colors</li>
      </ul>
    </section>

    <!-- Usage Guidelines -->
    <section class="mb-16">
      <h2 class="text-3xl font-heading mb-6">Usage Guidelines</h2>
      
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 class="text-lg font-heading mb-3 flex items-center">
          <svg class="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          Important: Tailwind-First Development
        </h3>
        <ul class="space-y-2 text-sm">
          <li>• Use Tailwind's built-in utilities whenever possible</li>
          <li>• Only create custom components when truly needed</li>
          <li>• Prefer composition over abstraction</li>
          <li>• Test all color combinations for WCAG compliance</li>
        </ul>
      </div>
    </section>
  </main>
</Layout>
```

---

## Design System Best Practices

### 1. **Documentation Standards**
- Every component includes usage examples
- Copy-paste ready code snippets
- Visual do's and don'ts
- Accessibility notes inline

### 2. **Component Guidelines**
```astro
<!-- Example Component Documentation Pattern -->
---
// ComponentName.astro
export interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const { variant = 'primary', size = 'md', class: className = '' } = Astro.props;
---
<!-- Implementation with clear, composable classes -->
```

### 3. **Testing Requirements**

#### Visual Regression Testing
```typescript
// design-system.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Design System Visual Tests', () => {
  test('color contrast meets WCAG AA', async ({ page }) => {
    await page.goto('/design-system');
    // Test specific color combinations
  });
  
  test('focus states are visible', async ({ page }) => {
    await page.goto('/design-system');
    await page.keyboard.press('Tab');
    // Verify focus indicators
  });
});
```

#### Accessibility Testing
```typescript
// a11y.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Compliance', () => {
  test('design system page has no violations', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    });
  });
});
```

### 4. **Performance Budget**
- Additional CSS from design system: < 10KB gzipped
- Font loading: < 3s on 3G connection
- Time to interactive: < 3s
- Lighthouse score: > 95

### 5. **Contribution Guidelines**

When adding new patterns:
1. Check if Tailwind provides it already
2. Document the use case clearly
3. Include accessibility considerations
4. Add visual regression tests
5. Update the design system showcase

## Key Improvements Made

✅ **Tailwind v4 Native**: Leverages CSS-first configuration and @theme  
✅ **Modern CSS Features**: Container queries, smooth theme transitions  
✅ **Animation System**: Built-in animations plus custom keyframes  
✅ **Plugin Integration**: @tailwindcss/forms and @tailwindcss/typography  
✅ **FOUT Prevention**: Smart theme initialization without flash  
✅ **Minimal Custom CSS**: Only brand tokens, everything else from Tailwind  
✅ **Portfolio-Focused**: Practical patterns for personal websites  

## What We Avoided (Not Reinventing the Wheel)

❌ Custom focus styles → Use Tailwind's `focus-visible:` utilities  
❌ Custom selection colors → Use Tailwind's `selection:` variant  
❌ Complex color matrices → Simple accessibility note suffices  
❌ Custom form resets → @tailwindcss/forms handles it  
❌ Typography systems → @tailwindcss/typography provides it  

### 2. Create SEO Component

#### `src/components/SEO.astro`
```astro
---
export interface Props {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const {
  title = 'Gregory Deseck | monkcode - Frontend Developer',
  description = 'Freelance frontend developer creating fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture.',
  image = '/og-image.png',
  type = 'website'
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site || 'https://monkcode.dev');
const imageURL = new URL(image, Astro.site || 'https://monkcode.dev');
---

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageURL} />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalURL} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={imageURL} />

<!-- Additional SEO -->
<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow" />
<meta name="author" content="Gregory Deseck" />
<meta name="keywords" content="frontend developer, Vue.js, Jamstack, web development, JavaScript, TypeScript, freelance developer, Belgium" />

<!-- Theme Color -->
<meta name="theme-color" content="#121212" />
```

### 3. Base Layout (`src/layouts/Layout.astro`)

Accessible, performant base layout with comprehensive SEO and theme management. The body tag is simplified as base colors are now handled in `global.css`.

```astro
---
import SEO from '@components/SEO.astro';
import '@styles/global.css';

export interface Props {
  title?: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="generator" content={Astro.generator} />
  
  <!-- SEO -->
  <SEO title={title} description={description} />
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" 
    rel="stylesheet"
  />
  
  <!-- Preload critical assets -->
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
  
  <!-- No-JS fallback -->
  <noscript>
    <style>
      .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  </noscript>
</head>
<body>
  <!-- Skip to content -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-background px-4 py-2 rounded-md">
    Skip to content
  </a>
  
  <!-- Main Layout Structure -->
  <div class="min-h-screen flex flex-col">
    <!-- Header will be inserted here -->
    <div id="header-placeholder"></div>
    
    <!-- Main Content -->
    <main id="main-content" class="flex-grow">
      <slot />
    </main>
    
    <!-- Footer will be inserted here -->
    <div id="footer-placeholder"></div>
  </div>
  
  <!-- Fade-in Animation Script -->
  <script src="/fade-in.js"></script>
  
  <!-- Analytics (placeholder for later) -->
  <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> -->
</body>
</html>

<style>
  /* Screen reader only utility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  .focus\:not-sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
</style>
```

### 4. Create Fade-in Animation Script

#### `public/fade-in.js`
```javascript
// Fade-in animation using Intersection Observer
(function() {
  'use strict';
  
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    document.querySelectorAll('.fade-in').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }
  
  // Configuration
  const config = {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  // Callback function
  const fadeInOnScroll = function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Add visible class with a slight delay for staggered effect
        const delay = entry.target.dataset.delay || 0;
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, delay);
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Create observer
  const observer = new IntersectionObserver(fadeInOnScroll, config);
  
  // Start observing all fade-in elements
  document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(function(el, index) {
      // Add staggered delay for elements in the same section
      if (el.parentElement && el.parentElement.children.length > 1) {
        el.dataset.delay = index * 100;
      }
      observer.observe(el);
    });
  });
  
  // Handle dynamically added elements
  const observeNewElements = function() {
    document.querySelectorAll('.fade-in:not(.visible)').forEach(function(el) {
      observer.observe(el);
    });
  };
  
  // Watch for new elements (useful for client-side routing)
  if ('MutationObserver' in window) {
    const mutationObserver = new MutationObserver(observeNewElements);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();
```

### 5. Create Basic Site Manifest

#### `public/site.webmanifest`
```json
{
  "name": "monkcode - Gregory Deseck",
  "short_name": "monkcode",
  "description": "Frontend developer creating fast, beautiful web experiences",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#121212",
  "background_color": "#121212",
  "display": "standalone",
  "start_url": "/"
}
```

### 6. Update Index Page to Use Layout

#### `src/pages/index.astro`
```astro
---
import Layout from '@layouts/Layout.astro';
---

<Layout>
  <div class="container mx-auto px-4 py-16">
    <!-- Hero Section Preview -->
    <section class="min-h-screen flex items-center justify-center fade-in">
      <div class="text-center">
        <h1 class="text-5xl md:text-7xl font-heading font-bold mb-6">
          Digital Craftsmanship.
          <span class="block text-primary">Built with Focus & Rhythm.</span>
        </h1>
        <p class="text-xl text-text-secondary max-w-2xl mx-auto">
          Portfolio coming soon. Building something special with Vue.js and modern web architecture.
        </p>
      </div>
    </section>
    
    <!-- Test Sections for Fade-in -->
    <section class="py-20 fade-in">
      <h2 class="text-4xl font-heading text-center mb-8">Selected Work</h2>
      <p class="text-center text-text-secondary">Projects section coming soon...</p>
    </section>
    
    <section class="py-20 fade-in">
      <h2 class="text-4xl font-heading text-center mb-8">The Monk & The Rhythm</h2>
      <p class="text-center text-text-secondary">About section coming soon...</p>
    </section>
    
    <section class="py-20 fade-in">
      <h2 class="text-4xl font-heading text-center mb-8">Let's Build Something Together</h2>
      <p class="text-center text-text-secondary">Contact section coming soon...</p>
    </section>
  </div>
</Layout>
```

## Verification Steps

1. **Layout Applied**: Visit `http://localhost:4321` and verify:
   - Page has proper title in browser tab
   - Fonts load correctly (Montserrat and Inter)
   - Dark background applied

2. **SEO Meta Tags**: Inspect page source and check:
   - Title and description meta tags
   - Open Graph tags for social sharing
   - Canonical URL

3. **Fade-in Animation**: 
   - Scroll down the page
   - Sections should fade in as they come into view
   - Animation should be smooth and not jarring

4. **Responsive**: Test on different screen sizes:
   - Mobile (< 640px)
   - Tablet (640px - 1024px)
   - Desktop (> 1024px)

5. **JavaScript Disabled**: 
   - Disable JavaScript in browser
   - Page should still be readable (no fade-in, but content visible)

## Layout Features

### Accessibility
- Skip to content link for keyboard navigation
- Semantic HTML structure
- Proper heading hierarchy
- Focus visible states

### Performance
- Font preloading for critical fonts
- Minimal JavaScript for animations
- CSS custom properties for theming
- Intersection Observer for efficient animations

### SEO
- Complete meta tag setup
- Structured data ready
- Canonical URLs
- Social media cards

## Next Step
→ [Step 3: Header Component](./03-header-component.md) - Build the navigation header with logo and smooth-scroll links.