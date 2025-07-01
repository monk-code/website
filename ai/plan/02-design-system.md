# Step 2: Design System

## Goal
Create the visual foundation for the monkcode portfolio by setting up brand colors, typography, CSS variables, and Tailwind configuration.

## Prerequisites
- Completed Step 1: Project Setup
- Astro project with Tailwind CSS installed

## Files to Create/Modify
- `src/styles/global.css` (create)
- `tailwind.config.mjs` (modify)
- `src/pages/index.astro` (create - temporary test page)

## Code Implementation

### 1. Create Global CSS with Brand Colors

#### `src/styles/global.css`
```css
/* Brand Colors */
:root {
  --monk-yellow: #FFDE0A;
  --code-black: #121212;
  --silent-white: #F5F5F5;
  --rhythm-grey: #888888;
  
  /* Additional shades for depth */
  --code-black-light: #1A1A1A;
  --code-black-lighter: #242424;
  --rhythm-grey-light: #A0A0A0;
  --rhythm-grey-dark: #666666;
  
  /* Typography */
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing Scale */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}

/* Base Styles */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--code-black);
  color: var(--silent-white);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography Base */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

p {
  margin: 0;
}

a {
  color: var(--monk-yellow);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

a:hover {
  opacity: 0.8;
}

/* Utility Classes */
.text-primary {
  color: var(--silent-white);
}

.text-secondary {
  color: var(--rhythm-grey);
}

.text-accent {
  color: var(--monk-yellow);
}

/* Animation Classes */
.fade-in {
  opacity: 0;
  transition: opacity var(--transition-slow), 
              transform var(--transition-slow);
  transform: translateY(20px);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hover Glow Effect */
.hover-glow {
  position: relative;
  transition: all var(--transition-base);
}

.hover-glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: var(--monk-yellow);
  border-radius: inherit;
  opacity: 0;
  filter: blur(10px);
  transition: opacity var(--transition-base);
  z-index: -1;
}

.hover-glow:hover::before {
  opacity: 0.3;
}

/* Focus Styles */
:focus-visible {
  outline: 2px solid var(--monk-yellow);
  outline-offset: 2px;
}

/* Selection */
::selection {
  background-color: var(--monk-yellow);
  color: var(--code-black);
}

/* Scrollbar Styles (Webkit browsers) */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--code-black-light);
}

::-webkit-scrollbar-thumb {
  background: var(--rhythm-grey-dark);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--rhythm-grey);
}
```

### 2. Configure Tailwind with Custom Theme

#### `tailwind.config.mjs`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--monk-yellow)',
        background: 'var(--code-black)',
        'background-light': 'var(--code-black-light)',
        'background-lighter': 'var(--code-black-lighter)',
        'text-primary': 'var(--silent-white)',
        'text-secondary': 'var(--rhythm-grey)',
        'text-secondary-light': 'var(--rhythm-grey-light)',
        'text-secondary-dark': 'var(--rhythm-grey-dark)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'full': 'var(--radius-full)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        glowPulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
```

### 3. Create Test Page to Verify Design System

#### `src/pages/index.astro`
```astro
---
import '../styles/global.css';
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design System Test - monkcode</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <div class="p-8 max-w-6xl mx-auto">
    <h1 class="text-6xl font-heading mb-8">Design System Test</h1>
    
    <!-- Colors -->
    <section class="mb-12">
      <h2 class="text-3xl font-heading mb-4">Colors</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 bg-primary text-background rounded-md">
          <p class="font-semibold">Monk Yellow</p>
          <p class="text-sm">#FFDE0A</p>
        </div>
        <div class="p-4 bg-background border border-text-secondary rounded-md">
          <p class="font-semibold">Code Black</p>
          <p class="text-sm">#121212</p>
        </div>
        <div class="p-4 bg-background-light rounded-md">
          <p class="font-semibold">Code Black Light</p>
          <p class="text-sm">#1A1A1A</p>
        </div>
        <div class="p-4 bg-text-secondary text-background rounded-md">
          <p class="font-semibold">Rhythm Grey</p>
          <p class="text-sm">#888888</p>
        </div>
      </div>
    </section>
    
    <!-- Typography -->
    <section class="mb-12">
      <h2 class="text-3xl font-heading mb-4">Typography</h2>
      <div class="space-y-4">
        <h1 class="text-5xl font-heading">Heading 1 - Montserrat</h1>
        <h2 class="text-4xl font-heading">Heading 2 - Montserrat</h2>
        <h3 class="text-3xl font-heading">Heading 3 - Montserrat</h3>
        <p class="text-lg">Body text large - Inter</p>
        <p>Body text regular - Inter</p>
        <p class="text-sm text-secondary">Body text small secondary - Inter</p>
      </div>
    </section>
    
    <!-- Buttons -->
    <section class="mb-12">
      <h2 class="text-3xl font-heading mb-4">Buttons & Links</h2>
      <div class="flex flex-wrap gap-4">
        <button class="px-6 py-3 bg-primary text-background font-semibold rounded-md hover-glow transition-all hover:scale-105">
          Primary Button
        </button>
        <button class="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-background transition-all">
          Secondary Button
        </button>
        <a href="#" class="text-primary underline underline-offset-4">Link with underline</a>
      </div>
    </section>
    
    <!-- Cards -->
    <section class="mb-12">
      <h2 class="text-3xl font-heading mb-4">Card Example</h2>
      <div class="bg-background-light p-6 rounded-lg border border-background-lighter hover-glow">
        <h3 class="text-xl font-heading mb-2">Card Title</h3>
        <p class="text-secondary mb-4">This is a card component with hover glow effect.</p>
        <div class="flex gap-2">
          <span class="px-3 py-1 bg-background text-xs rounded-full border border-text-secondary-dark">Vue.js</span>
          <span class="px-3 py-1 bg-background text-xs rounded-full border border-text-secondary-dark">Tailwind</span>
        </div>
      </div>
    </section>
    
    <!-- Animations -->
    <section>
      <h2 class="text-3xl font-heading mb-4">Animations</h2>
      <div class="space-y-4">
        <div class="p-4 bg-background-light rounded-md animate-fade-in">
          Fade In Animation
        </div>
        <div class="p-4 bg-background-light rounded-md animate-slide-up">
          Slide Up Animation
        </div>
        <div class="inline-block px-4 py-2 bg-primary text-background rounded-md animate-glow-pulse">
          Glow Pulse Animation
        </div>
      </div>
    </section>
  </div>
</body>
</html>
```

## Verification Steps

1. **Start Dev Server**: Run `npm run dev` and open `http://localhost:4321`

2. **Check Colors**: Verify all brand colors display correctly:
   - Monk Yellow (#FFDE0A)
   - Code Black (#121212)
   - Silent White (#F5F5F5)
   - Rhythm Grey (#888888)

3. **Test Typography**: Confirm fonts load properly:
   - Montserrat for headings (bold, clean)
   - Inter for body text (readable, modern)

4. **Hover Effects**: Test the glow effect on cards and buttons

5. **Responsive**: Resize browser to check responsive grid layouts

6. **Dark Theme**: Ensure the dark theme feels cohesive and easy on the eyes

## Design Tokens Reference

### Colors
- **Primary**: `var(--monk-yellow)` or `bg-primary`
- **Background**: `var(--code-black)` or `bg-background`
- **Text Primary**: `var(--silent-white)` or `text-text-primary`
- **Text Secondary**: `var(--rhythm-grey)` or `text-text-secondary`

### Typography
- **Headings**: `font-heading` (Montserrat)
- **Body**: `font-body` (Inter)

### Spacing
- Use Tailwind's spacing scale or custom CSS variables
- Consistent spacing creates visual rhythm

## Next Step
→ [Step 3: Layout Foundation](./03-layout-foundation.md) - Create the main layout component with SEO setup and global structure.