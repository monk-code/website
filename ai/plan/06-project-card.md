# Step 6: Project Card Component

## Goal
Build a reusable Vue.js project card component with sophisticated hover effects, tech stack pills, and links to live demo and repository.

## Prerequisites
- Completed Step 5: Hero Section
- Vue.js integration configured
- CTA Button component created

## Files to Create/Modify
- `src/components/ProjectCard.vue` (create)
- `src/components/TechPill.vue` (create)
- `src/components/IconLink.vue` (create)
- `public/images/project-placeholder.webp` (placeholder)

## Code Implementation

### 1. Create Tech Pill Component

#### `src/components/TechPill.vue`
```vue
<template>
  <span 
    class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border transition-all duration-base"
    :class="pillClasses"
  >
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'subtle'].includes(value)
  }
});

const pillClasses = computed(() => {
  const variants = {
    default: 'bg-background border-text-secondary-dark text-text-secondary hover:border-primary hover:text-primary',
    primary: 'bg-primary/10 border-primary/30 text-primary',
    subtle: 'bg-background-light border-background-lighter text-text-secondary'
  };
  
  return variants[props.variant];
});
</script>
```

### 2. Create Icon Link Component

#### `src/components/IconLink.vue`
```vue
<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel"
    class="icon-link"
    @click="handleClick"
  >
    <span class="icon-wrapper">
      <slot />
    </span>
    <span v-if="showTooltip" class="tooltip">{{ tooltip }}</span>
  </a>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  href: {
    type: String,
    required: true
  },
  external: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    required: true
  },
  tooltip: String
});

const showTooltip = ref(false);

const handleClick = (event) => {
  if (props.href === '#') {
    event.preventDefault();
  }
};
</script>

<style scoped>
.icon-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: var(--code-black);
  border: 1px solid var(--code-black-lighter);
  color: var(--rhythm-grey);
  transition: all var(--transition-base);
}

.icon-link:hover {
  color: var(--monk-yellow);
  border-color: var(--monk-yellow);
  transform: translateY(-2px);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: var(--code-black-lighter);
  color: var(--silent-white);
  font-size: 0.75rem;
  white-space: nowrap;
  border-radius: 0.25rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-fast);
}

.icon-link:hover .tooltip {
  opacity: 1;
}
</style>
```

### 3. Create Project Card Component

#### `src/components/ProjectCard.vue`
```vue
<template>
  <article 
    class="project-card group"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Image Section -->
    <div class="image-container">
      <img 
        :src="imageUrl" 
        :alt="`Screenshot of ${title} project`"
        class="project-image"
        loading="lazy"
        width="600"
        height="400"
      />
      <div class="image-overlay"></div>
      
      <!-- Quick View Badge -->
      <div class="quick-view-badge">
        <span>View Project</span>
      </div>
    </div>
    
    <!-- Content Section -->
    <div class="card-content">
      <!-- Title -->
      <h3 class="project-title">{{ title }}</h3>
      
      <!-- Description -->
      <p class="project-description">{{ description }}</p>
      
      <!-- Tech Stack -->
      <div class="tech-stack">
        <TechPill 
          v-for="tech in techStack" 
          :key="tech"
          variant="default"
        >
          {{ tech }}
        </TechPill>
      </div>
      
      <!-- Links -->
      <div class="project-links">
        <IconLink 
          :href="liveUrl" 
          :aria-label="`View live demo of ${title}`"
          tooltip="Live Demo"
        >
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </IconLink>
        
        <IconLink 
          :href="repoUrl" 
          :aria-label="`View source code for ${title}`"
          tooltip="Source Code"
        >
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </IconLink>
      </div>
    </div>
    
    <!-- Hover Border Effect -->
    <div class="hover-border"></div>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import TechPill from './TechPill.vue';
import IconLink from './IconLink.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  techStack: {
    type: Array,
    required: true,
    validator: (value) => Array.isArray(value) && value.every(item => typeof item === 'string')
  },
  liveUrl: {
    type: String,
    default: '#'
  },
  repoUrl: {
    type: String,
    default: '#'
  }
});

const isHovered = ref(false);
</script>

<style scoped>
.project-card {
  position: relative;
  background-color: var(--code-black-light);
  border-radius: 1rem;
  overflow: hidden;
  transition: all var(--transition-base);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Image Container */
.image-container {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(18, 18, 18, 0.9) 100%);
  opacity: 0.6;
  transition: opacity var(--transition-base);
}

.project-card:hover .image-overlay {
  opacity: 0.8;
}

/* Quick View Badge */
.quick-view-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--monk-yellow);
  color: var(--code-black);
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  opacity: 0;
  transition: all var(--transition-base);
}

.project-card:hover .quick-view-badge {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
}

/* Content */
.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  font-family: var(--font-heading);
  color: var(--silent-white);
  margin: 0;
}

.project-description {
  color: var(--rhythm-grey);
  line-height: 1.6;
  margin: 0;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

/* Hover Border Effect */
.hover-border {
  position: absolute;
  inset: 0;
  border: 2px solid var(--monk-yellow);
  border-radius: 1rem;
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
}

.project-card:hover .hover-border {
  opacity: 1;
}

/* Glow Effect */
.project-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--monk-yellow);
  border-radius: 1rem;
  opacity: 0;
  filter: blur(20px);
  transition: opacity var(--transition-base);
  z-index: -1;
}

.project-card:hover::before {
  opacity: 0.2;
}

/* Responsive */
@media (max-width: 640px) {
  .image-container {
    height: 200px;
  }
  
  .card-content {
    padding: 1.25rem;
  }
}
</style>
```

### 4. Create Project Placeholder Image

```bash
# Create placeholder project images
curl -o public/images/project-placeholder.webp "https://via.placeholder.com/600x400/1A1A1A/888888?text=Project"
```

## Verification Steps

1. **Card Appearance**:
   - Dark background with rounded corners
   - Image at top with overlay gradient
   - Content properly spaced below

2. **Hover Effects**:
   - Card lifts up slightly
   - Yellow border appears
   - Subtle glow effect
   - Image zooms slightly
   - "View Project" badge appears

3. **Tech Pills**:
   - Small rounded badges
   - Hover state changes color
   - Wrap properly on small screens

4. **Icon Links**:
   - GitHub and external link icons
   - Hover tooltips appear
   - Links open in new tabs

5. **Responsive**:
   - Card adapts to container width
   - Image height adjusts on mobile
   - Content remains readable

## Component Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | String | Yes | - | Project name |
| description | String | Yes | - | Brief project description |
| imageUrl | String | Yes | - | Path to project screenshot |
| techStack | Array | Yes | - | Array of technology names |
| liveUrl | String | No | '#' | URL to live demo |
| repoUrl | String | No | '#' | URL to repository |

## Usage Example

```vue
<ProjectCard
  title="E-commerce Platform"
  description="A modern shopping experience built with Vue.js and Stripe"
  imageUrl="/images/project-ecommerce.webp"
  :techStack="['Vue.js', 'Nuxt', 'Stripe API', 'Tailwind CSS']"
  liveUrl="https://example.com"
  repoUrl="https://github.com/example/repo"
/>
```

## Customization Options

### Visual Variants
1. **Minimal**: Remove glow effects for cleaner look
2. **Colorful**: Add category-based color accents
3. **Featured**: Larger card for highlighting key projects

### Additional Features
1. **Category Badge**: Add project type indicator
2. **Status Indicator**: Show if project is live/WIP
3. **View Count**: Display popularity metrics
4. **Case Study Link**: Add third action button

## Next Step
→ [Step 7: Projects Section](./07-projects-section.md) - Create the projects section that displays a grid of project cards.