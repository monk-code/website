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
import { ref, computed } from 'vue'
import type { Project } from '@/types/index.js'

const props = withDefaults(
  defineProps<{
    project: Project
    size?: 'normal' | 'large'
  }>(),
  {
    size: 'normal'
  }
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
    'dietiste-hanne': '04'
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
  transform: translateY(-5px);
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

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 222, 10, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: var(--color-code-black);
  border: 2px solid var(--color-code-black);
}

.cta-button.secondary:hover {
  background: var(--color-code-black);
  color: var(--color-silent-white);
}

/* Face 2 - Image and Title */
.face.face2 {
  background: #111;
  transition: 0.5s;
  border-radius: 15px;
  flex-direction: column;
  justify-content: center;
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

/* Glass effect */
.face2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px 0 0 15px;
  pointer-events: none;
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

[data-theme='dark'] .cta-button.secondary:hover {
  background: var(--color-silent-white);
  color: var(--color-code-black);
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .face2,
  .face2-title,
  .cta-button {
    transition: none !important;
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