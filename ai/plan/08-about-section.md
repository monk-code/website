# Step 8: About Section

## Goal
Create the about section featuring the "Monk & Rhythm" philosophy with engaging typography, visual elements, and animations.

## Prerequisites
- Completed Step 7: Projects Section
- Fade-in animations configured
- Design system ready

## Files to Create/Modify
- `src/components/About.astro` (create)
- `src/components/PhilosophyCard.vue` (create)
- `src/pages/index.astro` (modify)

## Code Implementation

### 1. Create Philosophy Card Component

#### `src/components/PhilosophyCard.vue`
```vue
<template>
  <div 
    class="philosophy-card"
    :class="{ 'is-monk': type === 'monk' }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Icon -->
    <div class="icon-container">
      <div class="icon-bg"></div>
      <component :is="iconComponent" class="icon" />
    </div>
    
    <!-- Content -->
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
    
    <!-- Decorative Elements -->
    <div class="card-decoration"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['monk', 'rhythm'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const isHovered = ref(false);

// Monk Icon Component
const MonkIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 6v6l4 2"/>
      <circle cx="12" cy="12" r="1"/>
    </svg>
  `
};

// Rhythm Icon Component
const RhythmIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  `
};

const iconComponent = computed(() => {
  return props.type === 'monk' ? MonkIcon : RhythmIcon;
});
</script>

<style scoped>
.philosophy-card {
  position: relative;
  padding: 2rem;
  background-color: var(--code-black-light);
  border-radius: 1rem;
  border: 1px solid var(--code-black-lighter);
  transition: all var(--transition-base);
  overflow: hidden;
}

.philosophy-card:hover {
  transform: translateY(-4px);
  border-color: var(--monk-yellow);
}

.philosophy-card.is-monk:hover {
  border-color: var(--silent-white);
}

/* Icon */
.icon-container {
  position: relative;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1.5rem;
}

.icon-bg {
  position: absolute;
  inset: 0;
  background-color: var(--monk-yellow);
  opacity: 0.1;
  border-radius: 50%;
  transition: all var(--transition-base);
}

.philosophy-card.is-monk .icon-bg {
  background-color: var(--silent-white);
}

.philosophy-card:hover .icon-bg {
  opacity: 0.2;
  transform: scale(1.2);
}

.icon {
  width: 100%;
  height: 100%;
  color: var(--monk-yellow);
  position: relative;
  z-index: 1;
}

.philosophy-card.is-monk .icon {
  color: var(--silent-white);
}

/* Content */
.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--font-heading);
  margin-bottom: 1rem;
  color: var(--silent-white);
}

.card-description {
  color: var(--rhythm-grey);
  line-height: 1.8;
}

/* Decoration */
.card-decoration {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--monk-yellow) 0%, transparent 70%);
  opacity: 0;
  filter: blur(60px);
  transition: opacity var(--transition-slow);
  pointer-events: none;
}

.philosophy-card.is-monk .card-decoration {
  background: radial-gradient(circle, var(--silent-white) 0%, transparent 70%);
}

.philosophy-card:hover .card-decoration {
  opacity: 0.05;
}

/* Responsive */
@media (max-width: 768px) {
  .philosophy-card {
    padding: 1.5rem;
  }
  
  .icon-container {
    width: 3rem;
    height: 3rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
}
</style>
```

### 2. Create About Section Component

#### `src/components/About.astro`
```astro
---
import PhilosophyCard from './PhilosophyCard.vue';
---

<section id="about" class="py-20 lg:py-32 bg-background-light relative overflow-hidden">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
  </div>
  
  <div class="container mx-auto px-4 relative z-10">
    <!-- Section Header -->
    <div class="text-center mb-16 fade-in">
      <h2 class="text-4xl md:text-5xl font-heading font-bold mb-4">
        The Monk & The Rhythm
      </h2>
      <div class="w-24 h-1 bg-primary mx-auto"></div>
    </div>
    
    <!-- Main Content -->
    <div class="max-w-4xl mx-auto">
      <!-- Introduction -->
      <div class="prose prose-invert prose-lg mx-auto text-center mb-16 fade-in" data-delay="100">
        <p class="text-xl text-text-secondary leading-relaxed">
          I'm <span class="text-text-primary font-semibold">Gregory Deseck</span>, 
          the frontend developer behind <span class="text-primary font-heading font-semibold">monkcode</span>. 
          My approach to building software is rooted in a duality I see in all great 
          craftsmanship: the balance between disciplined structure and creative flow.
        </p>
      </div>
      
      <!-- Philosophy Cards -->
      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <div class="fade-in" data-delay="200">
          <PhilosophyCard
            client:visible
            type="monk"
            title="The Monk"
            description="Represents focus and discipline. It's my dedication to writing clean, structured, and maintainable code. It's the quiet pursuit of the craft, understanding that quality is built on a foundation of sound principles and responsibility."
          />
        </div>
        
        <div class="fade-in" data-delay="300">
          <PhilosophyCard
            client:visible
            type="rhythm"
            title="The Rhythm"
            description="Comes from a love for creative problem-solving. It's the fluidity and improvisation needed to build elegant solutions. It's knowing the rules so well that you can artfully bend them to create seamless, intuitive user experiences."
          />
        </div>
      </div>
      
      <!-- Conclusion -->
      <div class="text-center fade-in" data-delay="400">
        <blockquote class="relative">
          <div class="absolute -top-8 -left-4 text-6xl text-primary/20 font-heading">"</div>
          <p class="text-xl md:text-2xl font-heading text-text-primary italic relative z-10 px-8">
            It's not about choosing one over the other; it's about the harmony between them. 
            This is how I build software that is not only functional and robust, 
            but also a pleasure to use.
          </p>
          <div class="absolute -bottom-8 -right-4 text-6xl text-primary/20 font-heading rotate-180">"</div>
        </blockquote>
      </div>
      
      <!-- Skills/Expertise -->
      <div class="mt-20 fade-in" data-delay="500">
        <h3 class="text-2xl font-heading font-semibold text-center mb-8">
          Technical Expertise
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { category: 'Frontend', skills: ['Vue.js', 'Nuxt.js', 'React'] },
            { category: 'Styling', skills: ['Tailwind CSS', 'SCSS', 'CSS-in-JS'] },
            { category: 'Tools', skills: ['Vite', 'Webpack', 'TypeScript'] },
            { category: 'Architecture', skills: ['Jamstack', 'PWA', 'SSR/SSG'] }
          ].map((group) => (
            <div class="text-center">
              <h4 class="text-sm font-semibold text-primary mb-3">{group.category}</h4>
              <ul class="space-y-2">
                {group.skills.map((skill) => (
                  <li class="text-sm text-text-secondary">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <!-- Values -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 fade-in" data-delay="600">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 class="font-heading font-semibold mb-2">Quality First</h4>
          <p class="text-sm text-text-secondary">Every line of code is written with maintainability and performance in mind</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 class="font-heading font-semibold mb-2">Fast Delivery</h4>
          <p class="text-sm text-text-secondary">Efficient development without compromising on quality or user experience</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h4 class="font-heading font-semibold mb-2">User Focused</h4>
          <p class="text-sm text-text-secondary">Creating intuitive interfaces that solve real problems for real people</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Custom quote styling */
  blockquote {
    position: relative;
    padding: 2rem 0;
  }
  
  /* Skill grid hover effect */
  @media (min-width: 768px) {
    .grid > div:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease;
    }
  }
</style>
```

### 3. Update Index Page

#### `src/pages/index.astro` (modify)
```astro
---
import Layout from '@layouts/Layout.astro';
import Hero from '@components/Hero.astro';
import Projects from '@components/Projects.astro';
import About from '@components/About.astro';
---

<Layout>
  <!-- Hero Section -->
  <Hero />
  
  <!-- Projects Section -->
  <Projects />
  
  <!-- About Section -->
  <About />
  
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

1. **Section Layout**:
   - Background has subtle gradient orbs
   - Content is centered and readable
   - Philosophy cards displayed side by side

2. **Philosophy Cards**:
   - Monk card has white accents
   - Rhythm card has yellow accents
   - Hover effects work smoothly
   - Icons display correctly

3. **Typography**:
   - Quote has decorative quotation marks
   - Text hierarchy is clear
   - Emphasis on key words (Monk, Rhythm)

4. **Skills Grid**:
   - 4 columns on desktop, 2 on mobile
   - Categories clearly labeled
   - Hover effects on desktop

5. **Values Section**:
   - Icons centered in circles
   - 3 columns on desktop, 1 on mobile
   - Consistent spacing

## Content Variations

### Philosophy Presentation
1. **Timeline**: Show journey/evolution
2. **Comparison Table**: Monk vs Rhythm traits
3. **Interactive**: Hover to reveal more

### Skills Display
1. **Progress Bars**: Show proficiency levels
2. **Tag Cloud**: Visual skill representation
3. **Certifications**: Add credentials

### Personal Touch
1. **Photo**: Add personal photo
2. **Signature**: Handwritten signature SVG
3. **Fun Facts**: Hobbies/interests section

## Animation Enhancements

- Parallax scrolling for background
- Number counters for statistics
- Skill bars that animate on scroll
- Card flip animations

## Next Step
→ [Step 9: Contact Section](./09-contact-section.md) - Create the contact section with prominent call-to-action links.