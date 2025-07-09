<template>
  <div
    :class="[
      'project-card-3d',
      'relative',
      'cursor-pointer',
      'preserve-3d',
      'motion-safe:transition-transform',
      'duration-700',
      'ease-in-out',
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
    <!-- Front Face - Shows Image and Title -->
    <div
      class="face-front absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-card-bg border border-card-border shadow-card-shadow"
    >
      <div class="relative h-full">
        <img
          :src="project.imageUrl.src"
          :alt="project.title"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        >
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 class="text-2xl font-bold mb-1">{{ project.title }}</h3>
            <p class="text-sm opacity-90">{{ project.type }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Back Face - Shows Details -->
    <div
      class="face-back absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-card-bg border border-card-border shadow-card-shadow rotate-y-180"
    >
      <div class="p-6 h-full flex flex-col">
        <div class="flex-1 overflow-y-auto">
          <h3 class="text-xl font-bold mb-3 text-foreground">{{ project.title }}</h3>
          <p class="text-sm text-muted-foreground mb-4">{{ project.description }}</p>

          <!-- Tech Stack -->
          <div v-if="project.techStack.length > 0" class="tech-pills-container mb-4">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="tech-pill text-xs px-2 py-1 rounded-full bg-primary/10 text-primary-foreground border border-primary/20"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Key Features -->
          <div v-if="project.keyFeatures && project.keyFeatures.length > 0" class="features-list">
            <ul class="space-y-1">
              <li
                v-for="(feature, index) in project.keyFeatures.slice(0, 3)"
                :key="index"
                class="feature-item text-xs text-muted-foreground flex items-start"
              >
                <span class="text-primary mr-2">•</span>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex gap-3 mt-4">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            data-test="live-button"
            class="flex-1 text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            View Live
          </a>
          <a
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            data-test="repo-button"
            class="flex-1 text-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium"
          >
            View Code
          </a>
        </div>
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
</script>

<style scoped>
@reference "tailwindcss";

/* 3D Transform Styles */
.preserve-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Card Transform on Hover */
.project-card-3d {
  transform: rotateY(0deg);
}

.project-card-3d.hover,
.project-card-3d.focus {
  transform: rotateY(180deg);
}

/* Size Variations */
.size-normal {
  @apply w-full h-80;
}

.size-large {
  @apply w-full h-96 lg:h-[32rem];
}

/* Smooth Scrolling for Features */
.features-list {
  max-height: 120px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 222, 10, 0.2) transparent;
}

.features-list::-webkit-scrollbar {
  width: 4px;
}

.features-list::-webkit-scrollbar-track {
  background: transparent;
}

.features-list::-webkit-scrollbar-thumb {
  background-color: rgba(255, 222, 10, 0.2);
  border-radius: 2px;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .project-card-3d {
    transition: none !important;
  }
}

/* Dark Mode Adjustments */
:root[data-theme='dark'] .face-front img {
  opacity: 0.9;
}

:root[data-theme='dark'] .face-back {
  background: var(--color-card-bg);
}
</style>