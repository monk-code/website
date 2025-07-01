# Step 3: Layout Foundation

## Goal
Create the main layout component that will wrap all pages, including SEO meta tags, font imports, global styles, and the fade-in animation script.

## Prerequisites
- Completed Step 1: Project Setup
- Completed Step 2: Design System
- Global CSS file created

## Files to Create/Modify
- `src/layouts/Layout.astro` (create)
- `src/components/SEO.astro` (create)
- `src/pages/index.astro` (modify)
- `public/fade-in.js` (create)

## Code Implementation

### 1. Create SEO Component

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

### 2. Create Main Layout Component

#### `src/layouts/Layout.astro`
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

### 3. Create Fade-in Animation Script

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

### 4. Update Index Page to Use Layout

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
→ [Step 4: Header Component](./04-header-component.md) - Build the navigation header with logo and smooth-scroll links.