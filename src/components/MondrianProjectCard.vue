<template>
  <div 
    class="mondrian-project-card"
    :class="{ 
      'card-hero': isHero, 
      'card-hovered': isHovered,
      'card-has-image': project.imageUrl,
      'card-visible': isVisible
    }"
    @click="handleClick"
    ref="cardRef"
  >
    <!-- Background Image -->
    <div class="card-background">
      <img 
        v-if="project.imageUrl"
        :src="project.imageUrl.src"
        :alt="`${project.title} project screenshot`"
        class="background-image"
      />
      <div class="background-overlay"></div>
      <div class="background-gradient"></div>
    </div>

    <!-- Default State Content -->
    <div class="card-default-content" :class="{ 'content-hidden': isHovered }">
      <div class="project-branding">
        <h3 class="project-title-minimal">{{ project.title }}</h3>
        <div class="project-indicator"></div>
      </div>
    </div>

    <!-- Hover State Content -->
    <div class="card-hover-content" :class="{ 'content-visible': isHovered }">
      <div class="hover-content-inner">
        <!-- Project Header -->
        <div class="project-header">
          <h3 class="project-title">{{ project.title }}</h3>
          <div class="project-type">
            {{ isHero ? 'Featured Project' : 'Project' }}
          </div>
        </div>

        <!-- Project Description -->
        <p class="project-description">{{ project.description }}</p>

        <!-- Technology Stack -->
        <div class="tech-stack">
          <div class="tech-stack-label">Built with</div>
          <div class="tech-icons">
            <div 
              v-for="tech in project.techStack.slice(0, isHero ? 6 : 4)"
              :key="tech"
              class="tech-icon-wrapper"
            >
              <div class="tech-icon-container">
                <TechIcon :technology="tech" />
              </div>
              <span class="tech-label">{{ tech }}</span>
            </div>
            <span v-if="project.techStack.length > (isHero ? 6 : 4)" class="tech-more">
              +{{ project.techStack.length - (isHero ? 6 : 4) }} more
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="project-actions">
          <a 
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="action-button primary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
          <a 
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="action-button secondary"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Source Code
          </a>
        </div>
      </div>
    </div>

    <!-- Futuristic Glow Effect -->
    <div class="glow-effect" :class="{ 'glow-active': isHovered }"></div>

    <!-- Corner Accent -->
    <div class="corner-accent"></div>
  </div>
  
  <!-- Expanded Overlay -->
  <ProjectCardExpanded
    v-if="showExpanded"
    :project="project"
    :is-hero="isHero"
    :is-open="showExpanded"
    :source-rect="cardRect"
    @close="showExpanded = false"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TechIcon from '@/components/ui/TechIcon.vue'
import type { Project } from '@/types/index.js'
import ProjectCardExpanded from './ProjectCardExpanded.vue'

interface Props {
  project: Project
  isHero?: boolean
  isHovered?: boolean
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  isHero: false,
  isHovered: false,
  animationDelay: 0,
})

const cardRef = ref<HTMLElement>()
const showExpanded = ref(false)
const cardRect = ref<DOMRect>()
const isVisible = ref(false)

const handleClick = () => {
  if (cardRef.value) {
    cardRect.value = cardRef.value.getBoundingClientRect()
  }
  showExpanded.value = true
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            isVisible.value = true
          }, props.animationDelay)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  if (cardRef.value) {
    observer.observe(cardRef.value)
  }
})
</script>

<style scoped>
.mondrian-project-card {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 240px;
  background: var(--color-background);
  border-radius: 1.25rem;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              background 0.4s ease;
  border: 1px solid transparent;
  background-image: linear-gradient(var(--color-background), var(--color-background)),
                    linear-gradient(135deg, var(--color-muted-foreground), transparent);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  contain: layout style paint;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.card-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

:global([data-theme="dark"]) .mondrian-project-card {
  background: #0a0a0a;
  background-image: linear-gradient(#0a0a0a, #0a0a0a),
                    linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

/* Hover state elevation */
.card-hovered {
  z-index: 100;
  transform: translateY(-6px) scale(1.02) translate3d(0, 0, 0);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 222, 10, 0.1);
  background-image: linear-gradient(var(--color-background), var(--color-background)),
                    linear-gradient(135deg, var(--color-primary), rgba(255, 222, 10, 0.3));
}

:global([data-theme="dark"]) .card-hovered {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7),
              0 0 30px rgba(255, 222, 10, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  background-image: linear-gradient(#0a0a0a, #0a0a0a),
                    linear-gradient(135deg, rgba(255, 222, 10, 0.2), rgba(255, 222, 10, 0.05));
}

/* Background Image Setup */
.card-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #000;
  border-radius: 1.25rem;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 0.4s ease;
  opacity: 0.85;
  transform: scale(1);
}

.card-hovered .background-image {
  opacity: 0.4;
  transform: scale(1.1);
}

.background-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.7) 100%
  );
  transition: background 0.4s ease;
}

.card-hovered .background-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.85) 100%
  );
}

:global([data-theme="dark"]) .card-hovered .background-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.8) 50%,
    rgba(0, 0, 0, 0.95) 100%
  );
}

.background-gradient {
  display: none;
}

/* Default Content */
.card-default-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  transition: opacity 0.3s ease;
}

.content-hidden {
  opacity: 0;
}

.project-branding {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.project-title-minimal {
  font-family: var(--font-family-heading);
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7),
               0 1px 2px rgba(0, 0, 0, 0.9);
  letter-spacing: -0.03em;
  transition: transform 0.3s ease;
}

.card-hero .project-title-minimal {
  font-size: 2.25rem;
}

.card-hovered .project-title-minimal {
  transform: translateX(4px);
}

.project-indicator {
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 222, 10, 0.8),
              0 0 40px rgba(255, 222, 10, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hovered .project-indicator {
  transform: scale(1.2);
  box-shadow: 0 0 30px rgba(255, 222, 10, 1),
              0 0 60px rgba(255, 222, 10, 0.6);
}

/* Hover Content - Glass morphism preview */
.card-hover-content {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
  backdrop-filter: blur(8px) saturate(1.2);
  -webkit-backdrop-filter: blur(8px) saturate(1.2);
  border-radius: 1.25rem;
}

.content-visible {
  opacity: 1;
}

.hover-content-inner {
  width: 100%;
}

.project-header {
  margin-bottom: 1rem;
}

.project-title {
  font-family: var(--font-family-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.card-hero .project-title {
  font-size: 1.5rem;
}

.project-type {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.project-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tech Stack Preview */
.tech-stack {
  margin-bottom: 1rem;
}

.tech-stack-label {
  font-size: 0.625rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.tech-icons {
  display: flex;
  gap: 0.5rem;
}

.tech-icon-wrapper {
  padding: 0.375rem 0.625rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
}

.tech-icon-wrapper:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.tech-icon-container {
  display: none;
}

.tech-label {
  font-size: 0.625rem;
  font-weight: 500;
}

.tech-more {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Action Buttons */
.project-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-decoration: none;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.2s ease;
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.action-button svg {
  display: none;
}

/* Futuristic Glow Effect */
.glow-effect {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, 
    transparent,
    rgba(255, 222, 10, 0.1),
    transparent,
    rgba(255, 222, 10, 0.1)
  );
  background-size: 200% 200%;
  border-radius: 1.25rem;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
  animation: shimmer 3s ease-in-out infinite;
}

.card-hovered .glow-effect {
  opacity: 1;
}

@keyframes shimmer {
  0% {
    background-position: -200% -200%;
  }
  100% {
    background-position: 200% 200%;
  }
}

/* Corner Accent */
.corner-accent {
  display: none;
}

/* Hero Specific Styles */
.card-hero {
  min-height: 320px;
}

.card-hero.card-hovered {
  transform: translateY(-8px) scale(1.03) translate3d(0, 0, 0);
}

.card-hero .card-default-content {
  padding: 2rem;
}

.card-hero .card-hover-content {
  padding: 2.5rem;
}

/* Ensure proper overflow handling */
.mondrian-project-card {
  overflow: hidden;
}

.card-hover-content {
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-default-content,
  .card-hover-content {
    padding: 1.5rem;
  }
  
  .card-hero .card-default-content,
  .card-hero .card-hover-content {
    padding: 2rem;
  }
  
  .project-title {
    font-size: 1.5rem;
  }
  
  .card-hero .project-title {
    font-size: 2rem;
  }
  
  .project-description {
    font-size: 0.9rem;
  }
  
  .tech-icons {
    gap: 0.5rem;
  }
  
  .action-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}

/* Removed heavy animations for better performance */

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .mondrian-project-card,
  .background-image,
  .card-default-content,
  .card-hover-content,
  .tech-icon-wrapper,
  .action-button {
    transition: none;
  }
  
  .glow-active {
    animation: none;
  }
}
</style>