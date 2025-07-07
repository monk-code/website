<template>
  <article 
    class="project-card"
    :class="{ 'project-card-hero': isHero }"
    :style="{ '--animation-delay': `${animationDelay}ms` }"
    :data-project-id="project.id"
  >
    <!-- Visual Identity Layer -->
    <div class="card-identity" aria-hidden="true">
      <div class="rhythm-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- Main Content - Always Visible -->
    <div class="card-content">
      <!-- Header -->
      <header class="card-header">
        <h3 class="card-title">{{ project.title }}</h3>
        <span v-if="project.featured" class="featured-badge">Featured</span>
      </header>

      <!-- Description -->
      <p class="card-description">
        {{ project.description }}
      </p>

      <!-- Tech Stack -->
      <div class="tech-stack" role="list" aria-label="Technologies used">
        <span 
          v-for="tech in displayTechStack"
          :key="tech"
          class="tech-tag"
          role="listitem"
        >
          {{ tech }}
        </span>
        <span v-if="remainingTechCount > 0" class="tech-more">
          +{{ remainingTechCount }}
        </span>
      </div>

      <!-- Actions -->
      <div class="card-actions">
        <a 
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-link action-primary"
          :aria-label="`View ${project.title} live demo`"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>View Project</span>
        </a>
        <a 
          v-if="project.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-link action-secondary"
          :aria-label="`View ${project.title} source code`"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>Source</span>
        </a>
      </div>
    </div>

    <!-- Background Image Layer -->
    <div v-if="project.imageUrl" class="card-background" aria-hidden="true">
      <img 
        :src="project.imageUrl.src"
        alt=""
        loading="lazy"
        decoding="async"
        class="background-image"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '@/types/index.js'

interface Props {
  project: Project
  isHero?: boolean
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  isHero: false,
  animationDelay: 0,
})

const displayTechStack = computed(() => {
  const limit = props.isHero ? 4 : 3
  return props.project.techStack.slice(0, limit)
})

const remainingTechCount = computed(() => {
  const limit = props.isHero ? 4 : 3
  return props.project.techStack.length - limit
})
</script>

<style scoped>
/* Base Card Styles */
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--color-card-shadow);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease,
              background-color 0.3s ease;
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: var(--animation-delay);
  cursor: pointer;
  contain: layout style;
}

/* Hero variant */
.project-card-hero {
  min-height: 360px;
}

.project-card-hero .card-title {
  font-size: 1.875rem;
}

.project-card-hero .card-description {
  -webkit-line-clamp: 3;
}

/* Visual Identity - Rhythm Indicator */
.card-identity {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.rhythm-indicator {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 20px;
}

.rhythm-indicator span {
  width: 3px;
  background: var(--color-primary);
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s ease;
}

.rhythm-indicator span:nth-child(1) {
  height: 12px;
  animation-delay: 0s;
}

.rhythm-indicator span:nth-child(2) {
  height: 18px;
  animation-delay: 0.2s;
}

.rhythm-indicator span:nth-child(3) {
  height: 8px;
  animation-delay: 0.4s;
}

/* Animate only on hover */
.project-card:hover .rhythm-indicator span {
  animation: rhythmPulse 1s ease-in-out infinite;
}

.project-card:hover .rhythm-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.project-card:hover .rhythm-indicator span:nth-child(2) {
  animation-delay: 0.1s;
}

.project-card:hover .rhythm-indicator span:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes rhythmPulse {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
}

/* Content Layer */
.card-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.95) 100%
  );
}

:global([data-theme="dark"]) .card-content {
  background: linear-gradient(
    to bottom,
    rgba(30, 30, 30, 0.98) 0%,
    rgba(32, 32, 32, 0.95) 100%
  );
}

/* Header */
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.card-title {
  font-family: var(--font-family-heading);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-foreground);
  margin: 0;
}

.featured-badge {
  flex-shrink: 0;
  padding: 0.25rem 0.75rem;
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 2rem;
}

/* Description */
.card-description {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-muted-foreground);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.tech-tag {
  padding: 0.25rem 0.625rem;
  background: var(--color-background);
  border: 1px solid var(--color-card-border);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-foreground);
  transition: all 0.2s ease;
}

:global([data-theme="dark"]) .tech-tag {
  background: rgba(255, 222, 10, 0.08);
  border-color: rgba(255, 222, 10, 0.2);
  color: #e4e4e7;
}

.project-card:hover .tech-tag {
  border-color: var(--color-primary);
  background: var(--color-emphasis-bg);
}

.tech-more {
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  color: var(--color-muted-foreground);
  font-style: italic;
}

/* Actions */
.card-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action-primary {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border: 1px solid var(--color-primary);
}

.action-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 222, 10, 0.3);
}

.action-secondary {
  background: transparent;
  color: var(--color-foreground);
  border: 1px solid var(--color-card-border);
}

.action-secondary:hover {
  background: var(--color-emphasis-bg);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

:global([data-theme="dark"]) .action-secondary {
  border-color: rgba(255, 255, 255, 0.2);
}

:global([data-theme="dark"]) .action-secondary:hover {
  background: rgba(255, 222, 10, 0.1);
  border-color: var(--color-primary);
  color: var(--color-foreground);
}

/* Background Image */
.card-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.08;
  transition: all 0.3s ease;
}

:global([data-theme="dark"]) .card-background {
  opacity: 0.35;
  filter: brightness(1.1) contrast(0.9);
  mix-blend-mode: luminosity;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hover States */
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.project-card:hover {
  background: var(--color-background);
}

:global([data-theme="dark"]) .project-card:hover {
  border-color: var(--color-primary);
  background: #1f1f1f;
  box-shadow: 
    0 0 30px rgba(255, 222, 10, 0.15),
    0 8px 24px rgba(0, 0, 0, 0.6);
}

.project-card:hover .card-background {
  opacity: 0.12;
}

:global([data-theme="dark"]) .project-card:hover .card-background {
  opacity: 0.45;
}

/* Focus States */
.project-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .project-card {
    min-height: 240px;
  }
  
  .card-content {
    padding: 1.25rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-description {
    font-size: 0.8125rem;
  }
  
  .action-link {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
  
  .action-link svg {
    width: 14px;
    height: 14px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .project-card {
    animation: none;
  }
  
  .project-card:hover .rhythm-indicator span {
    animation: none;
  }
  
  .project-card,
  .action-link,
  .tech-tag,
  .card-background,
  .rhythm-indicator span {
    transition: none;
  }
}
</style>