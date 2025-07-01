# Step 5: Hero Section

## Goal
Create the impressive hero section with a two-column layout featuring the headline, sub-headline, CTA buttons, and portrait image.

## Prerequisites
- Completed Step 4: Header Component
- Layout and design system ready
- Placeholder portrait image

## Files to Create/Modify
- `src/components/Hero.astro` (create)
- `src/components/CTAButton.vue` (create)
- `src/pages/index.astro` (modify)
- `public/images/portrait-placeholder.webp` (placeholder)

## Code Implementation

### 1. Create CTA Button Component

#### `src/components/CTAButton.vue`
```vue
<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span class="relative z-10">
      <slot />
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  href: String,
  to: String,
  onClick: Function
});

// Determine component type
const tag = computed(() => {
  if (props.href) return 'a';
  if (props.to) return 'router-link';
  return 'button';
});

// Handle click event
const handleClick = (event) => {
  if (props.onClick) {
    props.onClick(event);
  }
};

// Compute button classes
const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md relative overflow-hidden group';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-primary text-background hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5',
    secondary: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-background',
    ghost: 'bg-transparent text-text-secondary hover:text-primary underline-offset-4 hover:underline'
  };
  
  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ].join(' ');
});
</script>

<style scoped>
/* Ripple effect for primary variant */
.group:hover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
}

.group:hover::before {
  transform: scale(2);
}

/* Glow effect */
.group::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--monk-yellow);
  border-radius: inherit;
  opacity: 0;
  filter: blur(15px);
  transition: opacity var(--transition-base);
  z-index: -1;
}

.group:hover::after {
  opacity: 0.3;
}
</style>
```

### 2. Create Hero Component

#### `src/components/Hero.astro`
```astro
---
import CTAButton from './CTAButton.vue';
---

<section id="hero" class="min-h-screen flex items-center pt-20 pb-12 md:py-0 relative overflow-hidden">
  <!-- Background Elements -->
  <div class="absolute inset-0 z-0">
    <!-- Gradient Orbs -->
    <div class="absolute top-20 -left-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
    <div class="absolute bottom-20 -right-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
  </div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Content Column -->
      <div class="text-center lg:text-left space-y-8">
        <!-- Headline -->
        <h1 class="text-5xl md:text-6xl xl:text-7xl font-heading font-bold leading-tight">
          <span class="block text-text-primary">Digital Craftsmanship.</span>
          <span class="block text-primary mt-2">Built with Focus & Rhythm.</span>
        </h1>
        
        <!-- Sub-headline -->
        <p class="text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
          I'm Gregory, a freelance frontend developer specializing in fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <CTAButton 
            href="#projects" 
            variant="primary" 
            size="lg"
            client:load
          >
            View My Work
          </CTAButton>
          <CTAButton 
            href="#contact" 
            variant="secondary" 
            size="lg"
            client:load
          >
            Get In Touch
          </CTAButton>
        </div>
        
        <!-- Social Proof / Quick Stats -->
        <div class="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-text-secondary pt-4">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span>5+ Years Experience</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
            </svg>
            <span>20+ Projects Delivered</span>
          </div>
        </div>
      </div>
      
      <!-- Image Column -->
      <div class="relative">
        <!-- Portrait Container -->
        <div class="relative mx-auto lg:mx-0 max-w-md lg:max-w-none">
          <!-- Decorative Elements -->
          <div class="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl"></div>
          
          <!-- Main Image -->
          <div class="relative rounded-2xl overflow-hidden bg-background-light border border-background-lighter">
            <img 
              src="/images/portrait.webp" 
              alt="Gregory Deseck - Frontend Developer"
              class="w-full h-auto object-cover"
              loading="eager"
              width="600"
              height="700"
            />
            
            <!-- Overlay Gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </div>
          
          <!-- Floating Badge -->
          <div class="absolute -bottom-6 -right-6 bg-background-light border border-background-lighter rounded-lg p-4 shadow-xl">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium">Available for Projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <a href="#projects" class="text-text-secondary hover:text-primary transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </a>
  </div>
</section>

<style>
  /* Custom animations */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  /* Apply float animation to image on desktop */
  @media (min-width: 1024px) {
    section:hover img {
      animation: float 3s ease-in-out infinite;
    }
  }
</style>
```

### 3. Create Placeholder Portrait Image

For now, create a simple placeholder. In the actual implementation, this would be replaced with the real portrait.

#### Create placeholder with this bash command:
```bash
# Create a placeholder image (you'll replace this with actual portrait)
mkdir -p public/images
# For now, you can use any placeholder image service or create a simple colored rectangle
# Example: Download from placeholder service
curl -o public/images/portrait.webp "https://via.placeholder.com/600x700/1A1A1A/888888?text=Portrait"
```

### 4. Update Index Page

#### `src/pages/index.astro` (modify)
```astro
---
import Layout from '@layouts/Layout.astro';
import Hero from '@components/Hero.astro';
---

<Layout>
  <!-- Hero Section -->
  <Hero />
  
  <!-- Projects Section (placeholder) -->
  <section id="projects" class="py-20 fade-in">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-heading text-center mb-8">Selected Work</h2>
      <p class="text-center text-text-secondary">Projects section coming soon...</p>
    </div>
  </section>
  
  <!-- About Section (placeholder) -->
  <section id="about" class="py-20 fade-in bg-background-light">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-heading text-center mb-8">The Monk & The Rhythm</h2>
      <p class="text-center text-text-secondary">About section coming soon...</p>
    </div>
  </section>
  
  <!-- Contact Section (placeholder) -->
  <section id="contact" class="py-20 fade-in">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-heading text-center mb-8">Let's Build Something Together</h2>
      <p class="text-center text-text-secondary">Contact section coming soon...</p>
    </div>
  </section>
</Layout>
```

## Verification Steps

1. **Hero Layout**:
   - Two columns on desktop, stacked on mobile
   - Content aligned left on desktop, center on mobile
   - Image displays properly with decorative elements

2. **Typography**:
   - Headline is large and impactful
   - "Focus & Rhythm" in yellow color
   - Sub-headline is readable and secondary color

3. **CTA Buttons**:
   - Primary button (yellow) stands out
   - Secondary button has border style
   - Both have hover effects
   - Smooth scroll when clicked

4. **Responsive Design**:
   - Mobile (< 768px): Single column, centered
   - Tablet (768px - 1023px): Adjusted spacing
   - Desktop (≥ 1024px): Two columns, left-aligned text

5. **Animations**:
   - Background orbs pulse subtly
   - Scroll indicator bounces
   - Image has float effect on hover (desktop)
   - Available badge has pulse indicator

## Design Variations

### Alternative Layouts
1. **Centered Hero**: Center all content for a different feel
2. **Full-Width Image**: Make image extend to viewport edge
3. **Video Background**: Replace static image with video loop

### CTA Variations
1. **Single CTA**: Focus on one primary action
2. **Icon Buttons**: Add icons to CTAs
3. **Animated CTAs**: Add more elaborate hover animations

## Performance Considerations

- Use WebP format for portrait image
- Lazy load images below the fold
- Optimize image size (600x700px max)
- Consider using `srcset` for responsive images

## Next Step
→ [Step 6: Project Card Component](./06-project-card.md) - Build the reusable project card component with Vue.js for the portfolio section.