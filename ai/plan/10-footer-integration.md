# Step 10: Footer & Final Integration

## Goal
Create the footer component and integrate all sections together into a complete, polished portfolio website.

## Prerequisites
- All previous steps completed
- All section components ready
- Layout component configured

## Files to Create/Modify
- `src/components/Footer.astro` (create)
- `src/layouts/Layout.astro` (modify)
- `src/pages/index.astro` (finalize)
- `src/components/BackToTop.vue` (create)

## Code Implementation

### 1. Create Back to Top Component

#### `src/components/BackToTop.vue`
```vue
<template>
  <Transition name="fade-slide">
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="back-to-top"
      aria-label="Back to top"
    >
      <svg 
        class="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial position
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background-color: var(--monk-yellow);
  color: var(--code-black);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 40;
  transition: all var(--transition-base);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.back-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(255, 222, 10, 0.4);
}

.back-to-top:active {
  transform: translateY(-2px);
}

/* Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .back-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
```

### 2. Create Footer Component

#### `src/components/Footer.astro`
```astro
---
const currentYear = new Date().getFullYear();

const footerLinks = [
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com/orgs/monk-code/repositories' },
      { label: 'LinkedIn', href: 'https://be.linkedin.com/in/gregorydeseck' },
      { label: 'Email', href: 'mailto:monkcode@pm.me' }
    ]
  },
  {
    title: 'Navigate',
    links: [
      { label: 'Work', href: '#projects' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' }
    ]
  }
];
---

<footer class="bg-background-light border-t border-background-lighter">
  <div class="container mx-auto px-4 py-12">
    <!-- Main Footer Content -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <!-- Brand Column -->
      <div class="text-center md:text-left">
        <div class="flex items-center gap-2 justify-center md:justify-start mb-4">
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span class="text-background font-heading font-bold text-sm">m</span>
          </div>
          <span class="font-heading font-bold text-lg">monkcode</span>
        </div>
        <p class="text-sm text-text-secondary">
          Digital craftsmanship with focus & rhythm.
        </p>
      </div>
      
      <!-- Links Columns -->
      {footerLinks.map((column) => (
        <div class="text-center md:text-left">
          <h3 class="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-text-secondary">
            {column.title}
          </h3>
          <ul class="space-y-2">
            {column.links.map((link) => (
              <li>
                <a 
                  href={link.href}
                  class="text-sm text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                  {link.href.startsWith('http') && (
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    
    <!-- Divider -->
    <div class="border-t border-background-lighter pt-8">
      <!-- Bottom Row -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        <!-- Copyright -->
        <p>
          © {currentYear} Gregory Deseck | monkcode. All rights reserved.
        </p>
        
        <!-- Tech Stack -->
        <div class="flex items-center gap-2">
          <span>Built with</span>
          <a 
            href="https://astro.build" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            Astro
          </a>
          <span>+</span>
          <a 
            href="https://vuejs.org" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            Vue.js
          </a>
          <span>+</span>
          <a 
            href="https://tailwindcss.com" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            Tailwind CSS
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Optional: Add a subtle pattern or texture to footer */
  footer {
    position: relative;
  }
  
  footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgba(255, 222, 10, 0.01) 35px,
        rgba(255, 222, 10, 0.01) 70px
      );
    pointer-events: none;
  }
</style>
```

### 3. Update Layout to Include Footer

#### `src/layouts/Layout.astro` (modify)
```astro
---
import SEO from '@components/SEO.astro';
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';
import BackToTop from '@components/BackToTop.vue';
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
    
    <!-- Footer -->
    <Footer />
  </div>
  
  <!-- Back to Top Button -->
  <BackToTop client:idle />
  
  <!-- Scripts -->
  <script src="/fade-in.js"></script>
  <script src="/smooth-scroll.js"></script>
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

### 4. Finalize Index Page

#### `src/pages/index.astro` (finalize)
```astro
---
import Layout from '@layouts/Layout.astro';
import Hero from '@components/Hero.astro';
import Projects from '@components/Projects.astro';
import About from '@components/About.astro';
import Contact from '@components/Contact.astro';
---

<Layout 
  title="Gregory Deseck | monkcode - Frontend Developer"
  description="Freelance frontend developer creating fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture."
>
  <!-- Hero Section -->
  <Hero />
  
  <!-- Projects Section -->
  <Projects />
  
  <!-- About Section -->
  <About />
  
  <!-- Contact Section -->
  <Contact />
</Layout>
```

### 5. Create 404 Page (Bonus)

#### `src/pages/404.astro`
```astro
---
import Layout from '@layouts/Layout.astro';
import CTAButton from '@components/CTAButton.vue';
---

<Layout title="404 - Page Not Found | monkcode">
  <section class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <!-- 404 Number -->
      <h1 class="text-8xl md:text-9xl font-heading font-bold text-primary mb-4">
        404
      </h1>
      
      <!-- Message -->
      <h2 class="text-2xl md:text-3xl font-heading mb-4">
        Page Not Found
      </h2>
      
      <p class="text-lg text-text-secondary mb-8 max-w-md mx-auto">
        Looks like this page got lost in the code. 
        Let's get you back on track.
      </p>
      
      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <CTAButton 
          href="/" 
          variant="primary"
          client:load
        >
          Back to Home
        </CTAButton>
        <CTAButton 
          href="/#projects" 
          variant="secondary"
          client:load
        >
          View Projects
        </CTAButton>
      </div>
      
      <!-- ASCII Art (optional fun element) -->
      <pre class="text-xs text-text-secondary mt-12 hidden md:block">
        ___________________________
       /                           \
      |  Lost in the void of      |
      |  undefined references...  |
       \___________________________/
                  ||
                  ||
                 \||/
                  \/
      </pre>
    </div>
  </section>
</Layout>
```

## Verification Steps

1. **Complete Page Flow**:
   - Navigate through all sections
   - Check smooth scrolling between sections
   - Verify all links work correctly

2. **Footer**:
   - Links organized in columns
   - Copyright year updates automatically
   - Tech stack links open in new tabs
   - Responsive layout on mobile

3. **Back to Top**:
   - Button appears after scrolling down
   - Smooth scroll to top when clicked
   - Proper positioning on all screens

4. **Navigation**:
   - Header navigation highlights active section
   - Mobile menu works correctly
   - All anchor links scroll smoothly

5. **404 Page**:
   - Custom design matches site theme
   - Links back to main sections
   - Maintains consistent layout

## Performance Checklist

- [ ] Images optimized (WebP format, proper sizes)
- [ ] Lazy loading for below-fold content
- [ ] Minimal JavaScript bundle size
- [ ] CSS purged of unused styles
- [ ] Fonts preloaded
- [ ] Meta tags for SEO
- [ ] Proper heading hierarchy
- [ ] ARIA labels for accessibility

## Final Polish

### Animations
- All sections fade in on scroll
- Hover effects are consistent
- No janky animations on mobile

### Responsive Design
- Mobile: Clean single column
- Tablet: Appropriate spacing
- Desktop: Full experience
- No horizontal scroll at any size

### Cross-Browser
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for issues
npm run lint
```

## Next Step
→ [Step 11: Assets & Content](./11-assets-content.md) - Prepare all real assets and update placeholder content.