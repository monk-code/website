<template>
  <section
    id="projects"
    :aria-labelledby="'projects-title'"
    class="projects-section fade-in py-16 md:py-24 lg:py-32"
  >
    <div class="container mx-auto px-4 md:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2
          id="projects-title"
          class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          Featured Projects
        </h2>
        <p class="section-description text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of my featured work showcasing modern web development, 
          IoT solutions, and enterprise applications.
        </p>
      </div>

      <!-- Projects Grid -->
      <BentoGrid
        :cols="{
          default: 1,
          md: 2,
          lg: 4
        }"
        :gap="'6'"
      >
        <!-- Featured Project (Bright Energy) -->
        <template #featured>
          <div
            v-if="featuredProject"
            :data-featured="'true'"
          >
            <ProjectCard
              :project="featuredProject"
              :size="'large'"
              @click="handleProjectClick"
            />
          </div>
        </template>

        <!-- Regular Projects -->
        <div
          v-for="project in regularProjects"
          :key="project.id"
          :data-featured="'false'"
        >
          <ProjectCard
            :project="project"
            :size="'normal'"
            @click="handleProjectClick"
          />
        </div>
      </BentoGrid>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import BentoGrid from '@/components/ui/BentoGrid.vue'
import { projects } from '../../../ai-workspace/projects-data-backup'
import type { Project } from '@/types/index.js'

// Separate featured and regular projects
const featuredProject = computed(() => 
  projects.find(p => p.id === 'bright-energy')
)

const regularProjects = computed(() => 
  projects.filter(p => p.id !== 'bright-energy')
)

// Handle project click events (for future analytics or navigation)
const handleProjectClick = (project: Project) => {
  // Could emit to parent or track analytics here
  console.log('Project clicked:', project.id)
}
</script>

<style scoped>
@reference "tailwindcss";

/* Section-specific styles */
.projects-section {
  position: relative;
  overflow: hidden;
}

/* Add subtle background pattern */
.projects-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, var(--color-primary) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, var(--color-primary) 0%, transparent 50%);
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
}

/* Ensure content is above background */
.projects-section > * {
  position: relative;
  z-index: 1;
}

/* Dark mode adjustments */
[data-theme='dark'] .projects-section::before {
  opacity: 0.02;
}

/* Container query for responsive title sizing */
@container (min-width: 640px) {
  #projects-title {
    font-size: 3rem;
  }
}

@container (min-width: 1024px) {
  #projects-title {
    font-size: 3.75rem;
  }
}
</style>