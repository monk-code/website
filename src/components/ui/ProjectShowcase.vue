<template>
  <article
    ref="cardRef"
    :class="[
      'project-showcase-card',
      { 'is-featured': project.featured },
      `category-${project.category}`
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
    :style="cardStyle"
  >
    <!-- Glassmorphism background -->
    <div class="card-glass-bg"></div>
    
    <!-- Gradient border -->
    <div class="card-gradient-border" :style="{ background: `linear-gradient(135deg, ${project.gradient})` }"></div>
    
    <!-- Image container with parallax -->
    <div class="card-image-container">
      <div class="card-image-wrapper" :style="imageStyle">
        <picture>
          <!-- WebP sources with srcset for retina -->
          <source
            type="image/webp"
            :srcset="`${project.image.sources.webp['1x'].src} 1x, ${project.image.sources.webp['2x'].src} 2x`"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
          <!-- PNG sources with srcset for retina -->
          <source
            type="image/png"
            :srcset="`${project.image.sources.png['1x'].src} 1x, ${project.image.sources.png['2x'].src} 2x`"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
          <!-- Fallback image -->
          <img 
            :src="project.image.fallback.src" 
            :alt="project.title"
            width="400"
            height="255"
            class="card-image"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <!-- Image overlay gradient -->
        <div class="image-overlay" :style="{ background: `linear-gradient(135deg, ${project.gradient})` }"></div>
      </div>
      
      <!-- Featured badge -->
      <div v-if="project.featured" class="featured-badge">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span>Featured</span>
      </div>
    </div>
    
    <!-- Card content -->
    <div class="card-content">
      <!-- Header -->
      <div class="card-header">
        <div class="card-title-container">
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-subtitle">{{ project.subtitle }}</p>
        </div>
        <div class="card-category">
          <span class="category-badge" :style="{ backgroundColor: `${project.accentColor}20`, color: project.accentColor }">
            {{ project.category }}
          </span>
        </div>
      </div>
      
      <!-- Description -->
      <div class="card-description">
        <p class="description-text" :class="{ 'expanded': isExpanded }">
          {{ project.description }}
        </p>
        <button 
          v-if="project.description.length > 120"
          @click="toggleExpanded"
          class="expand-button"
        >
          {{ isExpanded ? 'Read less' : 'Read more' }}
        </button>
      </div>
      
      <!-- Tech stack -->
      <div class="card-tech-stack">
        <div class="tech-pills">
          <span 
            v-for="tag in project.tags.slice(0, 4)" 
            :key="tag"
            class="tech-pill"
            :style="{ borderColor: `${project.accentColor}30`, color: project.accentColor }"
          >
            {{ tag }}
          </span>
          <span 
            v-if="project.tags.length > 4"
            class="tech-pill tech-pill-more"
            :style="{ borderColor: `${project.accentColor}30`, color: project.accentColor }"
          >
            +{{ project.tags.length - 4 }}
          </span>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="card-stats">
        <div 
          v-for="stat in project.stats" 
          :key="stat.label"
          class="stat-item"
        >
          <div class="stat-value" :style="{ color: project.accentColor }">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
      
      <!-- Links -->
      <div class="card-links">
        <a 
          v-for="link in project.links" 
          :key="link.type"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="card-link"
          :style="{ 
            backgroundColor: `${project.accentColor}15`,
            color: project.accentColor,
            '--hover-bg': `${project.accentColor}25`
          }"
        >
          <span>{{ link.label }}</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </div>
    
    <!-- Hover glow effect -->
    <div class="card-glow" :style="{ background: `radial-gradient(circle at ${mouseX}% ${mouseY}%, ${project.accentColor}40 0%, transparent 70%)` }"></div>
  </article>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { ModernProject } from '@/data/projects.js'

interface Props {
  project: ModernProject
}

const props = defineProps<Props>()

const cardRef = ref<HTMLElement>()
const isHovered = ref(false)
const isExpanded = ref(false)
const mouseX = ref(50)
const mouseY = ref(50)

const cardStyle = computed(() => ({
  transform: `scale(${isHovered.value ? 1.02 : 1})`,
  '--accent-color': props.project.accentColor,
  '--gradient': props.project.gradient,
}))

const imageStyle = computed(() => ({
  // Remove scaling to prevent blurriness
  transform: 'translate3d(0, 0, 0)',
}))

const onMouseEnter = () => {
  isHovered.value = true
}

const onMouseLeave = () => {
  isHovered.value = false
  mouseX.value = 50
  mouseY.value = 50
}

const onMouseMove = (event: MouseEvent) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  mouseX.value = (x / rect.width) * 100
  mouseY.value = (y / rect.height) * 100
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// Cleanup on unmount
onUnmounted(() => {
  isHovered.value = false
})
</script>

<style scoped>
.project-showcase-card {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-out;
  container-type: inline-size;
  transform: translate3d(0, 0, 0);
  contain: layout style paint;
}

.project-showcase-card.is-featured {
  min-height: 300px;
}

/* Simplified background */
.card-glass-bg {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: inherit;
  z-index: 1;
}

[data-theme="dark"] .card-glass-bg {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Simplified border */
.card-gradient-border {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  opacity: 0.2;
  z-index: 0;
  transition: opacity 0.2s ease;
}

.project-showcase-card:hover .card-gradient-border {
  opacity: 0.4;
}

/* Image container */
.card-image-container {
  position: relative;
  width: 100%;
  height: 140px;
  overflow: hidden;
  z-index: 2;
  aspect-ratio: 16/9;
  contain: layout style paint;
}

.is-featured .card-image-container {
  height: 140px;
  aspect-ratio: 16/9;
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease-out;
  will-change: transform;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}

.image-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  mix-blend-mode: overlay;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.project-showcase-card:hover .image-overlay {
  opacity: 0.15;
}

/* Featured badge */
.featured-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(255, 222, 10, 0.9);
  color: var(--color-code-black);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 3;
  backdrop-filter: blur(8px);
}

/* Card content */
.card-content {
  position: relative;
  padding: 16px;
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 2;
}

.is-featured .card-content {
  height: calc(100% - 140px);
  padding: 16px;
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.card-title-container {
  flex: 1;
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-foreground);
  margin: 0 0 2px 0;
  line-height: 1.3;
  font-family: var(--font-family-heading);
}

.is-featured .card-title {
  font-size: 1.125rem;
}

.card-subtitle {
  font-size: 0.75rem;
  color: var(--color-muted-foreground);
  margin: 0;
  opacity: 0.8;
}

.card-category {
  flex-shrink: 0;
}

.category-badge {
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: capitalize;
}

/* Description */
.card-description {
  flex: 1;
}

.description-text {
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--color-muted-foreground);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.description-text.expanded {
  -webkit-line-clamp: unset;
  display: block;
}

.expand-button {
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: 0.625rem;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 0;
  margin-top: 2px;
  transition: opacity 0.2s ease;
}

.expand-button:hover {
  opacity: 0.8;
}

/* Tech stack */
.card-tech-stack {
  margin-top: auto;
}

.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.tech-pill {
  padding: 3px 6px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 0.625rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  line-height: 1.2;
  height: auto;
  display: flex;
  align-items: center;
}

.tech-pill:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.tech-pill-more {
  background: rgba(255, 255, 255, 0.08);
  font-weight: 600;
}

/* Stats */
.card-stats {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-value {
  font-size: 0.875rem;
  font-weight: 700;
  font-family: var(--font-family-heading);
  margin-bottom: 1px;
}

.stat-label {
  font-size: 0.625rem;
  color: var(--color-muted-foreground);
  opacity: 0.8;
}

/* Links */
.card-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.card-link {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.625rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.card-link:hover {
  background: var(--hover-bg) !important;
  transform: translateY(-1px);
}

/* Hover glow effect */
.card-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.project-showcase-card:hover .card-glow {
  opacity: 1;
}

/* Responsive adjustments */
@container (max-width: 300px) {
  .card-content {
    padding: 12px;
    gap: 10px;
  }
  
  .card-title {
    font-size: 0.875rem;
  }
  
  .card-subtitle {
    font-size: 0.7rem;
  }
  
  .card-stats {
    flex-direction: column;
    gap: 6px;
    padding: 6px 0;
  }
  
  .stat-item {
    text-align: left;
  }
  
  .stat-value {
    font-size: 0.75rem;
  }
  
  .stat-label {
    font-size: 0.6rem;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .project-showcase-card {
    transition: none;
  }
  
  .card-image-wrapper {
    transition: none;
  }
  
  .project-showcase-card:hover {
    transform: none;
  }
}
</style>