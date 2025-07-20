<template>
  <div class="project-filter">
    <!-- Category filters -->
    <div class="filter-section">
      <h3 class="filter-title">Categories</h3>
      <div class="filter-pills">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="[
            'filter-pill',
            { 'active': selectedCategory === category.id }
          ]"
          @click="selectCategory(category.id)"
        >
          <span class="pill-label">{{ category.label }}</span>
          <span class="pill-count" :class="{ 'active': selectedCategory === category.id }">
            {{ category.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- Tag filters -->
    <div class="filter-section">
      <h3 class="filter-title">Technologies</h3>
      <div class="filter-pills">
        <button
          v-for="tag in availableTags"
          :key="tag"
          :class="[
            'filter-pill',
            'tag-pill',
            { 'active': selectedTags.includes(tag) }
          ]"
          @click="toggleTag(tag)"
        >
          <span class="pill-label">{{ tag }}</span>
        </button>
      </div>
    </div>

    <!-- Active filters display -->
    <div v-if="hasActiveFilters" class="active-filters">
      <div class="active-filters-header">
        <span class="active-filters-title">Active Filters</span>
        <button class="clear-filters" @click="clearAllFilters">
          Clear All
        </button>
      </div>
      <div class="active-filter-pills">
        <div 
          v-if="selectedCategory !== 'all'"
          class="active-filter-pill"
        >
          <span>{{ getCategoryLabel(selectedCategory) }}</span>
          <button @click="selectCategory('all')" class="remove-filter">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div 
          v-for="tag in selectedTags" 
          :key="tag"
          class="active-filter-pill"
        >
          <span>{{ tag }}</span>
          <button @click="toggleTag(tag)" class="remove-filter">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <div class="results-count">
      <span class="count-text">
        Showing {{ filteredCount }} of {{ totalCount }} projects
      </span>
      <div class="count-bar">
        <div 
          class="count-progress" 
          :style="{ width: `${(filteredCount / totalCount) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ProjectCategory } from '@/data/projects.js'
import { getAllTags, projectCategories } from '@/data/projects.js'

interface Props {
  selectedCategory?: ProjectCategory | 'all'
  selectedTags?: string[]
  filteredCount: number
  totalCount: number
}

interface Emits {
  (e: 'update:selectedCategory', value: ProjectCategory | 'all'): void
  (e: 'update:selectedTags', value: string[]): void
  (e: 'filter-change'): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedCategory: 'all',
  selectedTags: () => [],
})

const emit = defineEmits<Emits>()

const categories = ref(projectCategories)
const availableTags = ref(getAllTags())
const selectedCategory = ref<ProjectCategory | 'all'>(props.selectedCategory)
const selectedTags = ref<string[]>([...props.selectedTags])

const hasActiveFilters = computed(() => {
  return selectedCategory.value !== 'all' || selectedTags.value.length > 0
})

const selectCategory = (category: ProjectCategory | 'all') => {
  selectedCategory.value = category
  emit('update:selectedCategory', category)
  emit('filter-change')
}

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  emit('update:selectedTags', [...selectedTags.value])
  emit('filter-change')
}

const clearAllFilters = () => {
  selectedCategory.value = 'all'
  selectedTags.value = []
  emit('update:selectedCategory', 'all')
  emit('update:selectedTags', [])
  emit('filter-change')
}

const getCategoryLabel = (categoryId: ProjectCategory | 'all') => {
  const category = categories.value.find((c) => c.id === categoryId)
  return category?.label || 'All'
}

// Watch for prop changes
watch(
  () => props.selectedCategory,
  (newVal) => {
    selectedCategory.value = newVal
  },
)

watch(
  () => props.selectedTags,
  (newVal) => {
    selectedTags.value = [...newVal]
  },
)
</script>

<style scoped>
.project-filter {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  position: sticky;
  top: 100px;
  z-index: 10;
}

[data-theme="dark"] .project-filter {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-foreground);
  margin: 0;
  font-family: var(--font-family-heading);
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-muted-foreground);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
}

.filter-pill:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.filter-pill.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-code-black);
  box-shadow: 0 4px 12px rgba(255, 222, 10, 0.3);
}

.tag-pill {
  padding: 6px 10px;
}

.pill-label {
  font-weight: 500;
}

.pill-count {
  background: rgba(255, 255, 255, 0.15);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-muted-foreground);
  transition: all 0.2s ease;
}

.pill-count.active {
  background: rgba(0, 0, 0, 0.2);
  color: var(--color-code-black);
}

/* Active filters */
.active-filters {
  padding: 16px;
  background: rgba(255, 222, 10, 0.05);
  border: 1px solid rgba(255, 222, 10, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(8px);
}

.active-filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.active-filters-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-foreground);
}

.clear-filters {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.clear-filters:hover {
  background: rgba(255, 222, 10, 0.1);
}

.active-filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.active-filter-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: rgba(255, 222, 10, 0.15);
  border: 1px solid rgba(255, 222, 10, 0.25);
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-foreground);
}

.remove-filter {
  background: none;
  border: none;
  color: var(--color-muted-foreground);
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-filter:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-foreground);
}

/* Results count */
.results-count {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.count-text {
  font-size: 0.875rem;
  color: var(--color-muted-foreground);
  font-weight: 500;
}

.count-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.count-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary));
  border-radius: 2px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.count-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .project-filter {
    position: static;
    padding: 16px;
    gap: 20px;
  }
  
  .filter-pills {
    gap: 6px;
  }
  
  .filter-pill {
    padding: 6px 10px;
    font-size: 0.7rem;
  }
  
  .active-filters-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .filter-pill {
    transition: none;
  }
  
  .filter-pill:hover {
    transform: none;
  }
  
  .count-progress {
    transition: none;
  }
  
  .count-progress::after {
    animation: none;
  }
}
</style>