<template>
  <div
    :class="[
      'project-card',
      sizeClass,
      { hover: isHovered, focus: isFocused }
    ]"
    :tabindex="0"
    :role="'article'"
    :aria-label="`${project.title} - ${project.type}`"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focus="isFocused = true"
    @blur="isFocused = false"
    @click="$emit('click', project)"
  >
    <!-- Face 1 - Content (Bottom Layer) -->
    <div class="face face1">
      <div class="content">
        <h2>{{ project.title }}</h2>
        <p class="description">{{ project.description }}</p>
        
        <!-- Tech Stack -->
        <div v-if="project.techStack.length > 0" class="tech-stack">
          <span
            v-for="tech in project.techStack.slice(0, 4)"
            :key="tech"
            class="tech-pill"
          >
            {{ tech }}
          </span>
        </div>

        <!-- CTA Buttons -->
        <div class="cta-buttons">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            data-test="live-button"
            class="cta-button primary"
            @click.stop
          >
            View Live
          </a>
          <a
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            data-test="repo-button"
            class="cta-button secondary"
            @click.stop
          >
            View Code
          </a>
        </div>
      </div>
    </div>

    <!-- Face 2 - Image and Title (Top Layer) -->
    <div 
      class="face face2"
      :style="{
        backgroundImage: `url(${project.imageUrl.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    >
      <div class="face2-overlay"></div>
      <div class="face2-content">
        <div class="project-header">
          <h3 class="project-title">{{ project.title }}</h3>
          <span class="project-type">{{ project.type }}</span>
        </div>
        <div class="project-number">{{ getProjectNumber(project.id) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Project } from '@/types/index.js'

const props = withDefaults(
  defineProps<{
    project: Project
    size?: 'normal' | 'large'
  }>(),
  {
    size: 'normal',
  },
)

const emit = defineEmits<{
  click: [project: Project]
}>()

const isHovered = ref(false)
const isFocused = ref(false)

const sizeClass = computed(() => {
  return props.size === 'large' ? 'size-large' : 'size-normal'
})

const getProjectNumber = (id: string): string => {
  const projectNumbers: Record<string, string> = {
    'bright-energy': '01',
    'bricsys-247': '02',
    'groepspraktijk-paviljoen': '03',
    'dietiste-hanne': '04',
  }
  return projectNumbers[id] || '00'
}

</script>

<style scoped>
@reference "tailwindcss";

/* Card Container */
.project-card {
  position: relative;
  width: 100%;
  max-width: 100%;
  background: #fff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.project-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  transform: translateY(-4px) scale(1.02);
}

/* Static glow effect on hover */
.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 222, 10, 0.15) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.project-card:hover::before {
  opacity: 1;
}

/* Subtle brand accent */
.project-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-monk-yellow), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover::after {
  opacity: 1;
}

/* Size Variations */
.size-normal {
  height: 400px;
}

.size-large {
  height: 400px;
}

@media (min-width: 768px) {
  .size-large {
    height: 500px;
  }
}

/* Face Styles */
.face {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Face 1 - Content */
.face.face1 {
  background: var(--color-silent-white);
  box-sizing: border-box;
  padding: 30px;
  align-items: flex-start;
  z-index: 2;
  position: relative;
}

.face1 .content {
  width: 100%;
  margin-top: 40px;
}

.face1 h2 {
  font-family: var(--font-family-heading);
  font-weight: 700;
  font-size: 1.75rem;
  color: var(--color-code-black);
  margin: 0 0 1rem 0;
}

.face1 .description {
  font-family: var(--font-family-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-rhythm-grey);
  margin-bottom: 1.5rem;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tech-pill {
  font-family: var(--font-family-body);
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-monk-yellow);
  color: var(--color-code-black);
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.2s ease;
  transform: translateZ(0);
}

.project-card:hover .tech-pill {
  transform: translateY(-1px) scale(1.05);
}

.tech-pill:hover {
  background: var(--color-code-black);
  color: var(--color-monk-yellow);
  transform: translateY(-2px) scale(1.1) !important;
}

/* CTA Buttons */
.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.cta-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: var(--font-family-body);
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.cta-button.primary {
  background: var(--color-monk-yellow);
  color: var(--color-code-black);
}

.cta-button.primary {
  position: relative;
  overflow: hidden;
}

.cta-button.primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.cta-button.primary:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 5px 20px rgba(255, 222, 10, 0.6);
}

.cta-button.primary:hover::before {
  width: 300px;
  height: 300px;
}

.cta-button.secondary {
  background: transparent;
  color: var(--color-code-black);
  border: 2px solid var(--color-code-black);
}

.cta-button.secondary {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cta-button.secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--color-code-black);
  transition: left 0.3s ease;
  z-index: -1;
}

.cta-button.secondary:hover {
  color: var(--color-silent-white);
  transform: translateY(-2px) scale(1.05);
  border-color: var(--color-code-black);
}

.cta-button.secondary:hover::before {
  left: 0;
}

/* Face 2 - Image and Title */
.face.face2 {
  background: #111;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 15px;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
  will-change: height, transform;
}

/* Subtle gradient overlay for better text readability */
.face2-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
  border-radius: 15px;
}

/* Glass effect with animated sweep */
.face2::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.15) 50%,
    transparent 60%
  );
  pointer-events: none;
  transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .face2::before {
  left: 100%;
}

/* Face 2 Content Layout */
.face2-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 30px;
  z-index: 1;
  transition: all 0.5s ease;
}

.project-header {
  flex: 1;
}

.project-title {
  font-family: var(--font-family-heading);
  font-weight: 700;
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
}

.project-type {
  font-family: var(--font-family-body);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.7);
}

.project-number {
  font-family: var(--font-family-heading);
  font-weight: 700;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  transition: all 0.5s ease;
  line-height: 1;
}

/* Hover State */
.project-card:hover .face2,
.project-card.hover .face2,
.project-card.focus .face2 {
  height: 60px;
  border-radius: 0 0 15px 15px;
  align-items: center;
  justify-content: flex-start;
}

.project-card:hover .face2-content,
.project-card.hover .face2-content,
.project-card.focus .face2-content {
  align-items: center;
  padding: 0 30px;
}

.project-card:hover .project-title,
.project-card.hover .project-title,
.project-card.focus .project-title {
  font-size: 1rem;
  margin: 0;
}

.project-card:hover .project-type,
.project-card.hover .project-type,
.project-card.focus .project-type {
  font-size: 0.8rem;
  opacity: 0.8;
}

.project-card:hover .project-number,
.project-card.hover .project-number,
.project-card.focus .project-number {
  font-size: 1.5rem;
  opacity: 0.7;
}

/* Dark Mode Adjustments */
[data-theme='dark'] .project-card {
  background: var(--color-code-black);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

[data-theme='dark'] .project-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
}

[data-theme='dark'] .project-card::before {
  background: radial-gradient(
    circle at var(--gradient-x, 50%) var(--gradient-y, 50%),
    rgba(255, 222, 10, 0.1) 0%,
    transparent 50%
  );
}

[data-theme='dark'] .face1 {
  background: #1a1a1a;
}

[data-theme='dark'] .face1 h2 {
  color: var(--color-silent-white);
}

[data-theme='dark'] .face1 .description {
  color: #a1a1aa;
}

[data-theme='dark'] .cta-button.secondary {
  color: var(--color-silent-white);
  border-color: var(--color-silent-white);
}

[data-theme='dark'] .cta-button.secondary::before {
  background: var(--color-silent-white);
}

[data-theme='dark'] .cta-button.secondary:hover {
  color: var(--color-code-black);
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .face2,
  .face2-title,
  .cta-button,
  .tech-pill {
    transition: none !important;
  }
  
  .project-card::before,
  .face2::before,
  .cta-button::before {
    display: none !important;
  }
  
  .project-card:hover {
    transform: translateY(-2px) !important;
  }
}

/* Focus Styles for Accessibility */
.project-card:focus {
  outline: 3px solid var(--color-monk-yellow);
  outline-offset: 2px;
}

/* Prevent text selection on cards */
.project-card {
  user-select: none;
}

/* Allow text selection in content */
.face1 .content {
  user-select: text;
}
</style>