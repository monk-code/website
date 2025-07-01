# Step 7: Projects Section

## Goal
Create the projects section that displays a responsive grid of project cards with filtering capabilities and smooth animations.

## Prerequisites
- Completed Step 6: Project Card Component
- ProjectCard.vue component ready
- Fade-in animation configured

## Files to Create/Modify
- `src/components/Projects.astro` (create)
- `src/components/ProjectFilter.vue` (create)
- `src/data/projects.js` (create)
- `src/pages/index.astro` (modify)

## Code Implementation

### 1. Create Projects Data

#### `src/data/projects.js`
```javascript
export const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Modern shopping experience with real-time inventory and Stripe payments',
    imageUrl: '/images/project-ecommerce.webp',
    techStack: ['Vue.js', 'Nuxt.js', 'Stripe API', 'Tailwind CSS'],
    category: 'web-app',
    featured: true,
    liveUrl: 'https://example-shop.com',
    repoUrl: 'https://github.com/monk-code/ecommerce-platform',
    year: 2024
  },
  {
    id: 2,
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization platform for business intelligence',
    imageUrl: '/images/project-analytics.webp',
    techStack: ['Vue 3', 'D3.js', 'WebSocket', 'TypeScript'],
    category: 'web-app',
    featured: true,
    liveUrl: 'https://analytics-demo.com',
    repoUrl: 'https://github.com/monk-code/analytics-dashboard',
    year: 2024
  },
  {
    id: 3,
    title: 'Healthcare Portal',
    description: 'Patient management system with appointment scheduling',
    imageUrl: '/images/project-healthcare.webp',
    techStack: ['Nuxt.js', 'Vuetify', 'Node.js', 'PostgreSQL'],
    category: 'web-app',
    featured: false,
    liveUrl: '#',
    repoUrl: 'https://github.com/monk-code/healthcare-portal',
    year: 2023
  },
  {
    id: 4,
    title: 'Component Library',
    description: 'Reusable Vue components with comprehensive documentation',
    imageUrl: '/images/project-components.webp',
    techStack: ['Vue 3', 'Storybook', 'Vite', 'CSS'],
    category: 'open-source',
    featured: false,
    liveUrl: 'https://components.monkcode.dev',
    repoUrl: 'https://github.com/monk-code/vue-components',
    year: 2023
  },
  {
    id: 5,
    title: 'Mobile Banking App',
    description: 'Secure banking interface with biometric authentication',
    imageUrl: '/images/project-banking.webp',
    techStack: ['Vue.js', 'Capacitor', 'Ionic', 'Firebase'],
    category: 'mobile',
    featured: false,
    liveUrl: '#',
    repoUrl: '#',
    year: 2023
  },
  {
    id: 6,
    title: 'SaaS Landing Page',
    description: 'High-converting landing page with A/B testing integration',
    imageUrl: '/images/project-landing.webp',
    techStack: ['Astro', 'Vue Islands', 'Tailwind CSS', 'Netlify'],
    category: 'website',
    featured: false,
    liveUrl: 'https://saas-landing-demo.com',
    repoUrl: 'https://github.com/monk-code/saas-landing',
    year: 2024
  }
];

export const categories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  { id: 'web-app', label: 'Web Apps', count: projects.filter(p => p.category === 'web-app').length },
  { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'website', label: 'Websites', count: projects.filter(p => p.category === 'website').length },
  { id: 'open-source', label: 'Open Source', count: projects.filter(p => p.category === 'open-source').length }
];
```

### 2. Create Project Filter Component

#### `src/components/ProjectFilter.vue`
```vue
<template>
  <div class="filter-container">
    <button
      v-for="category in categories"
      :key="category.id"
      @click="$emit('filter', category.id)"
      :class="[
        'filter-button',
        { active: activeCategory === category.id }
      ]"
    >
      <span class="label">{{ category.label }}</span>
      <span class="count">{{ category.count }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    required: true
  }
});

defineEmits(['filter']);
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.filter-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: transparent;
  border: 1px solid var(--code-black-lighter);
  border-radius: 9999px;
  color: var(--rhythm-grey);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
}

.filter-button:hover {
  border-color: var(--monk-yellow);
  color: var(--silent-white);
}

.filter-button.active {
  background-color: var(--monk-yellow);
  border-color: var(--monk-yellow);
  color: var(--code-black);
}

.label {
  display: inline-block;
}

.count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.375rem;
  background-color: var(--code-black-light);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.filter-button.active .count {
  background-color: var(--code-black);
  color: var(--monk-yellow);
}

/* Responsive */
@media (max-width: 640px) {
  .filter-container {
    gap: 0.5rem;
  }
  
  .filter-button {
    padding: 0.5rem 1rem;
    font-size: 0.813rem;
  }
}
</style>
```

### 3. Create Projects Section Component

#### `src/components/Projects.astro`
```astro
---
import ProjectCard from './ProjectCard.vue';
import ProjectFilter from './ProjectFilter.vue';
import { projects, categories } from '../data/projects.js';
---

<section id="projects" class="py-20 lg:py-32">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <div class="text-center mb-12 fade-in">
      <h2 class="text-4xl md:text-5xl font-heading font-bold mb-4">
        Selected Work
      </h2>
      <p class="text-lg text-text-secondary max-w-2xl mx-auto">
        A collection of projects that showcase my expertise in Vue.js, 
        modern web architecture, and creating delightful user experiences.
      </p>
    </div>
    
    <!-- Filter Component -->
    <div class="fade-in" data-delay="100">
      <ProjectFilter 
        client:load
        :categories="categories"
        activeCategory="all"
      />
    </div>
    
    <!-- Projects Grid -->
    <div id="projects-grid" class="projects-grid">
      {projects.map((project, index) => (
        <div 
          class="project-item fade-in" 
          data-category={project.category}
          data-delay={150 + (index * 50)}
        >
          <ProjectCard
            client:visible
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            techStack={project.techStack}
            liveUrl={project.liveUrl}
            repoUrl={project.repoUrl}
          />
        </div>
      ))}
    </div>
    
    <!-- View More -->
    <div class="text-center mt-12 fade-in" data-delay="500">
      <a 
        href="https://github.com/orgs/monk-code/repositories" 
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group"
      >
        <span>View more on GitHub</span>
        <svg 
          class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>
</section>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .project-item {
    transition: all 0.3s ease;
  }
  
  .project-item.hidden {
    opacity: 0;
    transform: scale(0.95);
    display: none;
  }
  
  /* Featured projects span 2 columns on large screens */
  @media (min-width: 1024px) {
    .project-item[data-featured="true"] {
      grid-column: span 2;
    }
  }
  
  /* Responsive grid */
  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>

<script>
  // Handle project filtering
  document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectItems = document.querySelectorAll('.project-item');
    
    // Add event listener to filter component
    const filterComponent = document.querySelector('.filter-container')?.parentElement;
    if (filterComponent) {
      filterComponent.addEventListener('filter', (event) => {
        const category = event.detail;
        filterProjects(category);
        updateActiveFilter(category);
      });
    }
    
    function filterProjects(category) {
      projectItems.forEach((item, index) => {
        const itemCategory = item.dataset.category;
        const shouldShow = category === 'all' || itemCategory === category;
        
        if (shouldShow) {
          item.classList.remove('hidden');
          // Stagger animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, index * 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 300);
        }
      });
    }
    
    function updateActiveFilter(category) {
      // Update active state in Vue component
      const filterComponent = document.querySelector('.filter-container')?.parentElement;
      if (filterComponent && filterComponent.__vueParentComponent) {
        filterComponent.__vueParentComponent.props.activeCategory = category;
      }
    }
  });
</script>
```

### 4. Update Index Page

#### `src/pages/index.astro` (modify)
```astro
---
import Layout from '@layouts/Layout.astro';
import Hero from '@components/Hero.astro';
import Projects from '@components/Projects.astro';
---

<Layout>
  <!-- Hero Section -->
  <Hero />
  
  <!-- Projects Section -->
  <Projects />
  
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

1. **Section Display**:
   - Title and description centered
   - Filter buttons display with counts
   - Projects grid shows all cards

2. **Filtering**:
   - Click filter buttons - projects animate in/out
   - Active filter highlighted in yellow
   - Counts match actual projects

3. **Grid Layout**:
   - Responsive columns (1 on mobile, 2-3 on desktop)
   - Cards maintain aspect ratio
   - Proper spacing between cards

4. **Animations**:
   - Section fades in on scroll
   - Cards stagger animation on filter
   - Smooth transitions

5. **Responsive**:
   - Mobile: Single column, smaller filters
   - Tablet: 2 columns
   - Desktop: 3 columns (or 2 for featured)

## Customization Options

### Layout Variations
1. **Masonry Grid**: Variable height cards
2. **List View**: Alternate layout option
3. **Featured Section**: Separate featured projects

### Filter Enhancements
1. **Sort Options**: By date, name, category
2. **Search Bar**: Text-based filtering
3. **Tags**: More granular filtering
4. **View Toggle**: Grid/List view switch

### Loading States
1. **Skeleton Cards**: While loading
2. **Progressive Loading**: Load more button
3. **Infinite Scroll**: Auto-load on scroll

## Performance Tips

- Use `client:visible` for cards below fold
- Lazy load project images
- Optimize image sizes (600x400px)
- Consider pagination for many projects

## Next Step
→ [Step 8: About Section](./08-about-section.md) - Create the about section with the "Monk & Rhythm" philosophy content.