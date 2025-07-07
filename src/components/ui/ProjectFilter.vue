<template>
  <div class="project-filter">
    <button 
      @click="handleFilterChange(null)"
      :class="[
        'filter-pill',
        'filter-pill-transition',
        { 'filter-pill-active': selectedTechnology === null }
      ]"
    >
      All
    </button>
    <button 
      v-for="tech in technologies"
      :key="tech"
      @click="handleFilterChange(tech)"
      :class="[
        'filter-pill',
        'filter-pill-transition',
        { 'filter-pill-active': selectedTechnology === tech }
      ]"
    >
      {{ tech }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  technologies: string[]
  selectedTechnology?: string | null
  onFilterChange?: (technology: string | null) => void
}

const props = defineProps<Props>()

const handleFilterChange = (technology: string | null) => {
  props.onFilterChange?.(technology)
}
</script>

<style scoped>
.project-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 4xl;
  margin: 0 auto;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 400;
  background-color: transparent;
  border: 1px solid var(--color-card-border);
  color: var(--color-muted-foreground);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: var(--font-family-body);
}

.filter-pill:hover {
  border-color: var(--color-primary);
  color: var(--color-foreground);
  background-color: rgba(255, 222, 10, 0.05);
}

.filter-pill:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--color-primary);
}

.filter-pill-transition {
  transition: all 0.2s ease-in-out;
}

.filter-pill-transition:hover {
  transform: translateY(-0.05rem);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05);
}

.filter-pill-active {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  border-color: var(--color-primary);
  box-shadow: 0 4px 8px -2px rgba(255, 222, 10, 0.3);
  font-weight: 500;
}

.filter-pill-active:hover {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .filter-pill-transition:hover {
    transform: none;
  }
}
</style>