<template>
  <div class="project-bento-container">
    <div 
      ref="gridRef"
      class="project-bento-grid"
      :class="{ 'grid-animating': isAnimating }"
    >
      <div 
        v-for="(project, index) in projects" 
        :key="project.id"
        :class="[
          'project-bento-item',
          { 'featured': project.featured },
          { 'fade-in': showAnimation }
        ]"
        :style="{ 
          '--animation-delay': `${index * 0.1}s`,
          '--grid-area': getGridArea(project, index)
        }"
      >
        <ProjectShowcase 
          :project="project"
          @click="onProjectClick(project)"
        />
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-if="projects.length === 0" class="empty-state">
      <div class="empty-state-icon">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <h3 class="empty-state-title">No projects found</h3>
      <p class="empty-state-description">
        Try adjusting your filters or search criteria to find more projects.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import ProjectShowcase from './ProjectShowcase.vue'
import type { ModernProject } from '@/data/projects.js'

interface Props {
  projects: ModernProject[]
}

interface Emits {
  (e: 'project-click', project: ModernProject): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const gridRef = ref<HTMLElement>()
const isAnimating = ref(false)
const showAnimation = ref(false)

const getGridArea = (project: ModernProject, index: number) => {
  if (project.featured) {
    // Featured projects take up more space
    return 'span 2 / span 2'
  }
  return 'span 1 / span 1'
}

const onProjectClick = (project: ModernProject) => {
  emit('project-click', project)
}

const animateLayout = async () => {
  if (!gridRef.value) return
  
  isAnimating.value = true
  showAnimation.value = false
  
  await nextTick()
  
  // Trigger layout animation
  setTimeout(() => {
    showAnimation.value = true
  }, 50)
  
  // Reset animation flag
  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}

// Watch for projects changes and animate
watch(() => props.projects, async () => {
  await animateLayout()
}, { deep: true })

onMounted(async () => {
  await nextTick()
  // Initial animation
  setTimeout(() => {
    showAnimation.value = true
  }, 100)
})
</script>

<style scoped>
.project-bento-container {
  width: 100%;
  min-height: 400px;
  position: relative;
}

.project-bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  container-type: inline-size;
}

/* Dynamic grid layouts based on container size */
@container (min-width: 600px) {
  .project-bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container (min-width: 900px) {
  .project-bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@container (min-width: 1200px) {
  .project-bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Uniform grid items */
.project-bento-item {
  position: relative;
  opacity: 0;
  transform: translateY(15px) scale(0.98);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay);
}

.project-bento-item.fade-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.project-bento-item.featured {
  /* All cards are now uniform - no spanning */
}

/* Responsive adjustments - uniform sizing */
@container (max-width: 600px) {
  .project-bento-item {
    /* All items uniform on small screens */
  }
}

@container (min-width: 900px) and (max-width: 1200px) {
  .project-bento-item {
    /* All items uniform on medium screens */
  }
}

/* Animation states */
.grid-animating .project-bento-item {
  transition-duration: 0.3s;
}

/* Hover effects for grid items */
.project-bento-item:hover {
  z-index: 10;
}

/* Magnetic effect - subtle attraction between adjacent items */
.project-bento-item:hover + .project-bento-item {
  transform: translateY(-2px) scale(1.01);
}

/* Stagger animation for initial load */
.project-bento-item:nth-child(1) { --animation-delay: 0.1s; }
.project-bento-item:nth-child(2) { --animation-delay: 0.2s; }
.project-bento-item:nth-child(3) { --animation-delay: 0.3s; }
.project-bento-item:nth-child(4) { --animation-delay: 0.4s; }
.project-bento-item:nth-child(5) { --animation-delay: 0.5s; }
.project-bento-item:nth-child(6) { --animation-delay: 0.6s; }

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 48px 24px;
  text-align: center;
}

.empty-state-icon {
  margin-bottom: 24px;
  color: var(--color-muted-foreground);
  opacity: 0.5;
}

.empty-state-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-foreground);
  margin-bottom: 12px;
  font-family: var(--font-family-heading);
}

.empty-state-description {
  font-size: 1rem;
  color: var(--color-muted-foreground);
  max-width: 400px;
  line-height: 1.5;
  margin: 0;
}

/* Loading state */
.project-bento-grid.loading {
  opacity: 0.6;
  pointer-events: none;
}

.project-bento-grid.loading .project-bento-item {
  animation: loading-pulse 1.5s ease-in-out infinite;
}

@keyframes loading-pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Responsive gap adjustments */
@media (max-width: 768px) {
  .project-bento-grid {
    gap: 20px;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .project-bento-grid {
    gap: 12px;
  }
  
  .empty-state {
    padding: 32px 16px;
    min-height: 300px;
  }
  
  .empty-state-title {
    font-size: 1.25rem;
  }
  
  .empty-state-description {
    font-size: 0.875rem;
  }
}

/* High contrast mode adjustments */
@media (prefers-contrast: high) {
  .project-bento-item {
    border: 2px solid var(--color-foreground);
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .project-bento-item {
    transition: none;
    opacity: 1;
    transform: none;
  }
  
  .project-bento-item.fade-in {
    transition: none;
  }
  
  .project-bento-item:hover {
    transform: none;
  }
  
  .project-bento-item:hover + .project-bento-item {
    transform: none;
  }
  
  .project-bento-grid {
    transition: none;
  }
  
  .grid-animating .project-bento-item {
    transition: none;
  }
  
  .project-bento-grid.loading .project-bento-item {
    animation: none;
  }
}

/* Print styles */
@media print {
  .project-bento-grid {
    display: block;
  }
  
  .project-bento-item {
    break-inside: avoid;
    margin-bottom: 1rem;
  }
  
  .empty-state {
    display: none;
  }
}
</style>