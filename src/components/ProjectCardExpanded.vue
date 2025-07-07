<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div 
        v-if="isOpen" 
        class="project-overlay"
        @click.self="$emit('close')"
      >
        <div 
          class="expanded-card"
          :style="expandedStyle"
        >
          <!-- Background -->
          <div class="card-background">
            <img 
              v-if="project.imageUrl"
              :src="project.imageUrl.src"
              :alt="`${project.title} project screenshot`"
              class="background-image"
            />
            <div class="background-overlay"></div>
          </div>

          <!-- Content -->
          <div class="card-content">
            <!-- Header -->
            <div class="content-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <div class="project-type">
                {{ isHero ? 'Featured Project' : 'Project' }}
              </div>
              <button 
                class="close-button"
                @click="$emit('close')"
                aria-label="Close expanded view"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Description -->
            <p class="project-description">{{ project.description }}</p>

            <!-- Tech Stack -->
            <div class="tech-stack">
              <div class="tech-stack-label">Built with</div>
              <div class="tech-icons">
                <div 
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="tech-icon-wrapper"
                >
                  <div class="tech-icon-container">
                    <TechIcon :technology="tech" />
                  </div>
                  <span class="tech-label">{{ tech }}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
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
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import TechIcon from '@/components/ui/TechIcon.vue'
import type { Project } from '@/types/index.js'

interface Props {
  project: Project
  isHero?: boolean
  isOpen: boolean
  sourceRect?: DOMRect
}

const props = withDefaults(defineProps<Props>(), {
  isHero: false,
})

const emit = defineEmits<{
  close: []
}>()

const expandedStyle = computed(() => {
  if (!props.sourceRect) return {}

  const padding = 40
  const maxWidth = Math.min(800, window.innerWidth - padding * 2)
  const maxHeight = Math.min(600, window.innerHeight - padding * 2)

  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  return {
    width: `${maxWidth}px`,
    height: `${maxHeight}px`,
    left: `${centerX - maxWidth / 2}px`,
    top: `${centerY - maxHeight / 2}px`,
  }
})

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.project-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
}

.expanded-card {
  position: fixed;
  background: var(--color-background);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  cursor: default;
  contain: layout style paint;
}

:global([data-theme="dark"]) .expanded-card {
  background: #1a1a1a;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8);
}

/* Background */
.card-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
}

.background-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
}

/* Content */
.card-content {
  position: relative;
  z-index: 1;
  padding: 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.content-header {
  position: relative;
  margin-bottom: 2rem;
}

.project-title {
  font-family: var(--font-family-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.project-type {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.project-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 65ch;
}

/* Tech Stack */
.tech-stack {
  margin-bottom: 2.5rem;
}

.tech-stack-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tech-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-icon-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.tech-icon-container {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

/* Actions */
.project-actions {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-size: 0.875rem;
}

.action-button.primary {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 222, 10, 0.4);
}

.action-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-button.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.action-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Transitions */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.overlay-fade-enter-active .expanded-card {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.overlay-fade-leave-active .expanded-card {
  transition: transform 0.2s ease-in, opacity 0.2s ease;
}

.overlay-fade-enter-from .expanded-card {
  transform: scale(0.9);
  opacity: 0;
}

.overlay-fade-leave-to .expanded-card {
  transform: scale(0.95);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .card-content {
    padding: 2rem;
  }
  
  .project-title {
    font-size: 2rem;
  }
  
  .project-description {
    font-size: 1rem;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .overlay-fade-enter-active,
  .overlay-fade-leave-active,
  .overlay-fade-enter-active .expanded-card,
  .overlay-fade-leave-active .expanded-card {
    transition: none;
  }
}
</style>