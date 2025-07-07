<template>
  <section class="projects-section" role="region" aria-labelledby="projects-heading">
    <div class="projects-container">
      <!-- Section Header with Brand Elements -->
      <div class="section-header">
        <div class="monk-structure">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h2 id="projects-heading" class="section-title">
          Selected Work
        </h2>
        <p class="section-subtitle">
          Where disciplined craft meets creative rhythm
        </p>
      </div>

      <!-- Enhanced Technology Filter -->
      <div class="tech-filter-container">
        <div class="filter-rhythm-line" aria-hidden="true"></div>
        <div class="tech-filter-scroll">
          <button 
            @click="handleFilterChange(null)"
            :class="[
              'tech-filter-item',
              { 'tech-filter-active': selectedTechnology === null }
            ]"
            :aria-pressed="selectedTechnology === null"
          >
            <span class="filter-label">All Projects</span>
            <span class="filter-count">{{ projects.length }}</span>
          </button>
          <button 
            v-for="tech in uniqueTechnologies"
            :key="tech"
            @click="handleFilterChange(tech)"
            :class="[
              'tech-filter-item',
              { 'tech-filter-active': selectedTechnology === tech }
            ]"
            :aria-pressed="selectedTechnology === tech"
          >
            <span class="filter-label">{{ tech }}</span>
            <span class="filter-count">{{ getProjectCountForTech(tech) }}</span>
          </button>
        </div>
      </div>

      <!-- Improved Grid Layout -->
      <div class="projects-grid">
        <TransitionGroup name="project-fade" tag="div" class="grid-wrapper">
          <div 
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="grid-item"
            :class="getGridClass(project, index)"
          >
            <ProjectCard
              :project="project"
              :is-hero="project.featured && index === 0"
              :animation-delay="index * 100"
            />
          </div>
        </TransitionGroup>
      </div>

      <!-- Enhanced Footer with Brand Touch -->
      <div class="section-footer">
        <div class="footer-rhythm" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a 
          href="https://github.com/monk-code"
          class="github-link"
        >
          <span>Explore more on GitHub</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import type { Project } from '@/types/index.js'

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()

const selectedTechnology = ref<string | null>(null)

const uniqueTechnologies = computed(() => {
  const allTechnologies = props.projects.flatMap((project) => project.techStack)
  const uniqueTechnologies = Array.from(new Set(allTechnologies))
  return uniqueTechnologies.sort()
})

const filteredProjects = computed(() => {
  if (!selectedTechnology.value) {
    return props.projects
  }
  return props.projects.filter((project) => project.techStack.includes(selectedTechnology.value!))
})

const getProjectCountForTech = (tech: string) => {
  return props.projects.filter((project) => project.techStack.includes(tech)).length
}

const getGridClass = (project: Project, index: number) => {
  if (project.featured && index === 0) return 'grid-item-hero'
  if (project.featured && index === 1) return 'grid-item-secondary'
  return 'grid-item-standard'
}

const handleFilterChange = (technology: string | null) => {
  selectedTechnology.value = technology
}
</script>

<style scoped>
/* Base Container */
.projects-section {
  padding: 6rem 0 8rem;
  position: relative;
  overflow: hidden;
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Section Header with Brand Elements */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.monk-structure {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.monk-structure span {
  width: 4px;
  height: 40px;
  background: var(--color-primary);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.monk-structure span:nth-child(2) {
  height: 50px;
  opacity: 0.8;
}

.monk-structure span:nth-child(3) {
  opacity: 0.6;
}

.section-title {
  font-family: var(--font-family-heading);
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-foreground);
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--color-muted-foreground);
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
}

/* Enhanced Technology Filter */
.tech-filter-container {
  position: relative;
  margin-bottom: 4rem;
}

.filter-rhythm-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-muted) 20%,
    var(--color-muted) 80%,
    transparent
  );
  opacity: 0.2;
  z-index: -1;
}

.tech-filter-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  padding: 1rem 0;
}

.tech-filter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-foreground);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px var(--color-card-shadow);
}

.tech-filter-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tech-filter-item:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tech-filter-item:hover::before {
  opacity: 0.05;
}

.tech-filter-active {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border-color: var(--color-primary);
  font-weight: 600;
}

.tech-filter-active::before {
  opacity: 1;
}

.filter-label {
  position: relative;
  z-index: 1;
}

.filter-count {
  position: relative;
  z-index: 1;
  padding: 0.125rem 0.5rem;
  background: var(--color-muted-foreground);
  color: var(--color-background);
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.tech-filter-active .filter-count {
  background: var(--color-primary-foreground);
  color: var(--color-primary);
}

:global([data-theme="dark"]) .filter-count {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-foreground);
}

:global([data-theme="dark"]) .tech-filter-active .filter-count {
  background: rgba(0, 0, 0, 0.3);
  color: var(--color-primary);
}

/* Projects Grid */
.projects-grid {
  position: relative;
  margin-bottom: 4rem;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.grid-item {
  position: relative;
}

.grid-item-hero {
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .grid-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-item-hero {
    grid-column: span 2;
  }
}

@media (min-width: 1024px) {
  .grid-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .grid-item-hero {
    grid-column: span 2;
    grid-row: span 1;
  }
  
  .grid-item-secondary {
    grid-column: span 1;
  }
}

/* Transitions */
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.project-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.project-fade-move {
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Section Footer */
.section-footer {
  text-align: center;
  margin-top: 6rem;
  position: relative;
}

.footer-rhythm {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 2rem;
}

.footer-rhythm span {
  width: 3px;
  height: 20px;
  background: var(--color-muted-foreground);
  border-radius: 2px;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.footer-rhythm span:nth-child(1) {
  height: 16px;
}

.footer-rhythm span:nth-child(2) {
  height: 24px;
  opacity: 0.7;
}

.footer-rhythm span:nth-child(3) {
  height: 12px;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  background: var(--color-card-bg);
  color: var(--color-foreground);
  border: 1px solid var(--color-card-border);
  border-radius: 2rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--color-card-shadow);
}

.github-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent,
    var(--color-primary),
    transparent
  );
  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.5s ease;
}

.github-link:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.github-link:hover::before {
  opacity: 0.1;
  transform: translateX(100%);
}

.github-link svg {
  transition: transform 0.3s ease;
}

.github-link:hover svg {
  transform: rotate(360deg);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .projects-section {
    padding: 4rem 0 6rem;
  }
  
  .projects-container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.125rem;
  }
  
  .tech-filter-scroll {
    gap: 0.5rem;
  }
  
  .tech-filter-item {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }
  
  .filter-count {
    padding: 0.125rem 0.375rem;
    font-size: 0.6875rem;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .monk-structure span,
  .footer-rhythm span,
  .tech-filter-item,
  .github-link,
  .github-link::before {
    animation: none;
    transition: none;
  }
  
  .project-fade-enter-active,
  .project-fade-leave-active,
  .project-fade-move {
    transition: none;
  }
}
</style>