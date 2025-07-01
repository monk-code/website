# Step 4: Header Component

## Goal
Build a sticky navigation header with the monkcode logo and smooth-scrolling navigation links, including mobile responsiveness.

## Prerequisites
- Completed Step 3: Layout Foundation
- Layout component ready
- Global styles configured

## Files to Create/Modify
- `src/components/Header.astro` (create)
- `src/components/MobileMenu.vue` (create)
- `src/layouts/Layout.astro` (modify)
- `public/smooth-scroll.js` (create)

## Code Implementation

### 1. Create Header Component

#### `src/components/Header.astro`
```astro
---
import MobileMenu from './MobileMenu.vue';

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];
---

<header class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-background-light">
  <nav class="container mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2 group">
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
          <span class="text-background font-heading font-bold text-lg">m</span>
        </div>
        <span class="font-heading font-bold text-xl hidden sm:block">monkcode</span>
      </a>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <a 
            href={item.href}
            class="nav-link text-text-secondary hover:text-primary transition-colors duration-base relative py-2"
          >
            {item.label}
          </a>
        ))}
      </nav>
      
      <!-- Mobile Menu -->
      <div class="md:hidden">
        <MobileMenu client:load navItems={navItems} />
      </div>
    </div>
  </nav>
</header>

<!-- Header spacer to prevent content from going under fixed header -->
<div class="h-[73px]"></div>

<style>
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--monk-yellow);
    transition: width var(--transition-base);
  }
  
  .nav-link:hover::after {
    width: 100%;
  }
  
  /* Active section indicator */
  .nav-link.active {
    color: var(--silent-white);
  }
  
  .nav-link.active::after {
    width: 100%;
  }
</style>

<script>
  // Highlight active section on scroll
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
      rootMargin: '-30% 0px -70% 0px'
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  });
</script>
```

### 2. Create Mobile Menu Component

#### `src/components/MobileMenu.vue`
```vue
<template>
  <div>
    <!-- Menu Button -->
    <button
      @click="toggleMenu"
      class="relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
      :aria-expanded="isOpen"
      aria-label="Toggle navigation menu"
    >
      <span class="sr-only">Menu</span>
      <div class="w-6 h-5 flex flex-col justify-between">
        <span
          class="block h-0.5 w-full bg-text-primary transform transition-all duration-300"
          :class="isOpen ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="block h-0.5 w-full bg-text-primary transition-all duration-300"
          :class="isOpen ? 'opacity-0' : ''"
        ></span>
        <span
          class="block h-0.5 w-full bg-text-primary transform transition-all duration-300"
          :class="isOpen ? '-rotate-45 -translate-y-2' : ''"
        ></span>
      </div>
    </button>
    
    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-background/95 backdrop-blur-md z-40"
        @click="closeMenu"
      ></div>
    </Transition>
    
    <!-- Mobile Menu Panel -->
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-[73px] right-0 bottom-0 w-full max-w-sm bg-background-light z-50 overflow-y-auto"
      >
        <nav class="p-8">
          <ul class="space-y-6">
            <li v-for="item in navItems" :key="item.href">
              <a
                :href="item.href"
                @click="closeMenu"
                class="block text-2xl font-heading font-semibold text-text-secondary hover:text-primary transition-colors"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
          
          <!-- Social Links -->
          <div class="mt-12 pt-8 border-t border-background-lighter">
            <p class="text-sm text-text-secondary mb-4">Connect</p>
            <div class="flex space-x-4">
              <a
                href="https://github.com/orgs/monk-code/repositories"
                target="_blank"
                rel="noopener noreferrer"
                class="text-text-secondary hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://be.linkedin.com/in/gregorydeseck"
                target="_blank"
                rel="noopener noreferrer"
                class="text-text-secondary hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:monkcode@pm.me"
                class="text-text-secondary hover:text-primary transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  navItems: {
    type: Array,
    required: true
  }
});

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  document.body.style.overflow = isOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
};

// Close menu on escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu();
  }
};

// Set up and clean up event listeners
watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleEscape);
  } else {
    document.removeEventListener('keydown', handleEscape);
  }
});
</script>

<style scoped>
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

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
```

### 3. Create Smooth Scroll Script

#### `public/smooth-scroll.js`
```javascript
// Smooth scrolling for anchor links
(function() {
  'use strict';
  
  // Only apply to same-page anchors
  document.addEventListener('click', function(e) {
    // Check if clicked element is an anchor with hash
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (!target) return;
    
    // Prevent default anchor behavior
    e.preventDefault();
    
    // Calculate scroll position (account for fixed header)
    const headerHeight = 73; // Height of fixed header
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    // Smooth scroll to target
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Update URL without jumping
    if (history.pushState) {
      history.pushState(null, null, targetId);
    }
    
    // Set focus for accessibility
    target.setAttribute('tabindex', '-1');
    target.focus();
  });
  
  // Handle browser back/forward with smooth scroll
  window.addEventListener('popstate', function() {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const headerHeight = 73;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        setTimeout(function() {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 0);
      }
    }
  });
})();
```

### 4. Update Layout to Include Header

#### `src/layouts/Layout.astro` (modify)
```astro
---
import SEO from '@components/SEO.astro';
import Header from '@components/Header.astro';
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
  <!-- [Previous head content remains the same] -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="generator" content={Astro.generator} />
  
  <!-- SEO -->
  <SEO title={title} description={description} />
  
  <!-- [Rest of head content...] -->
</head>
<body>
  <!-- Skip to content -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-background px-4 py-2 rounded-md z-50">
    Skip to content
  </a>
  
  <!-- Header -->
  <Header />
  
  <!-- Main Layout Structure -->
  <div class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <main id="main-content" class="flex-grow">
      <slot />
    </main>
    
    <!-- Footer will be inserted here -->
    <div id="footer-placeholder"></div>
  </div>
  
  <!-- Scripts -->
  <script src="/fade-in.js"></script>
  <script src="/smooth-scroll.js"></script>
</body>
</html>

<!-- [Previous styles remain the same] -->
```

## Verification Steps

1. **Header Display**: 
   - Logo visible on the left
   - Navigation links on desktop
   - Mobile menu button on mobile

2. **Sticky Behavior**:
   - Scroll down - header should remain fixed at top
   - Background should have blur effect

3. **Navigation Links**:
   - Hover over links - see underline animation
   - Click links - smooth scroll to sections
   - Active section highlighted as you scroll

4. **Mobile Menu**:
   - Click hamburger icon - menu slides in from right
   - Click outside or on link - menu closes
   - Hamburger animates to X when open

5. **Accessibility**:
   - Tab through navigation - focus states visible
   - Screen reader announces menu state
   - Escape key closes mobile menu

## Responsive Breakpoints

- **Mobile**: < 768px (hamburger menu)
- **Desktop**: ≥ 768px (horizontal nav)

## Customization Options

### Logo Variations
- Replace the "m" with an SVG icon
- Add hover animation effects
- Use full logo image instead

### Navigation Styles
- Change underline to background highlight
- Add icon indicators for sections
- Implement dropdown submenus if needed

## Next Step
→ [Step 5: Hero Section](./05-hero-section.md) - Create the impressive hero section with headline, sub-headline, and call-to-action buttons.