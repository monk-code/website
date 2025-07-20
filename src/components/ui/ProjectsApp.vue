<template>
  <div class="projects-app">
    <!-- Filter Component -->
    <ProjectFilter 
      :selected-category="selectedCategory"
      :selected-tags="selectedTags"
      :filtered-count="filteredCount"
      :total-count="totalCount"
      @update:selected-category="onCategoryChange"
      @update:selected-tags="onTagsChange"
      @filter-change="filterProjects"
    />
    
    <!-- Projects Grid -->
    <div class="projects-grid-section">
      <ProjectBento 
        :projects="filteredProjects"
        :class="{ 'loading': isLoading }"
        @project-click="onProjectClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { ModernProject, ProjectCategory } from '@/data/projects.js'
import { getProjectsByCategory, projects } from '@/data/projects.js'
import ProjectBento from './ProjectBento.vue'
import ProjectFilter from './ProjectFilter.vue'

// Reactive state
const allProjects = ref<ModernProject[]>(projects)
const filteredProjects = ref<ModernProject[]>(projects)
const selectedCategory = ref<ProjectCategory | 'all'>('all')
const selectedTags = ref<string[]>([])
const isLoading = ref(false)

// Computed properties
const filteredCount = computed(() => filteredProjects.value.length)
const totalCount = computed(() => allProjects.value.length)

// Methods
const filterProjects = async () => {
  isLoading.value = true

  // Add slight delay for smooth transitions
  await new Promise((resolve) => setTimeout(resolve, 150))

  // Start with category filter
  let filtered = getProjectsByCategory(selectedCategory.value)

  // Apply tag filters
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter((project) =>
      selectedTags.value.every((tag) => project.tags.includes(tag)),
    )
  }

  // Sort: featured first, then by date
  filtered.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    // Sort by date (newest first)
    const aYear = parseInt(a.dateRange.split('-')[0])
    const bYear = parseInt(b.dateRange.split('-')[0])
    return bYear - aYear
  })

  filteredProjects.value = filtered
  isLoading.value = false
}

const onCategoryChange = (category: ProjectCategory | 'all') => {
  selectedCategory.value = category
  filterProjects()
}

const onTagsChange = (tags: string[]) => {
  selectedTags.value = tags
  filterProjects()
}

const onProjectClick = (project: ModernProject) => {
  // Optional: Handle project click (could open modal, navigate, etc.)
  console.log('Project clicked:', project)

  // Could emit event to parent or handle navigation
  // For now, we'll just log it
}

// Initialize on mount
onMounted(() => {
  filterProjects()
})
</script>

<style scoped>
.projects-app {
  display: contents;
}

.projects-grid-section {
  grid-column: 1 / -1;
  margin-top: 24px;
}

/* Responsive layout */
@media (min-width: 1024px) {
  .projects-app {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    align-items: start;
  }
  
  .projects-grid-section {
    grid-column: 2;
    margin-top: 0;
  }
}

@media (max-width: 1023px) {
  .projects-app {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .projects-grid-section {
    order: -1;
  }
}

/* Loading state */
.projects-grid-section.loading {
  opacity: 0.7;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
</style>