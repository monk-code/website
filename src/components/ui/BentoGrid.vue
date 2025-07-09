<template>
  <div
    :class="gridClasses"
    :role="'grid'"
    class="bento-grid"
  >
    <!-- Featured Slot -->
    <div
      v-if="$slots.featured"
      class="bento-grid-featured col-span-1 md:col-span-2 lg:row-span-2"
    >
      <slot name="featured" />
    </div>
    
    <!-- Default Slot -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ColumnConfig {
  default?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

const props = withDefaults(
  defineProps<{
    gap?: string
    cols?: ColumnConfig
    autoFit?: boolean
    aspectRatio?: string
  }>(),
  {
    gap: '4',
    cols: () => ({
      default: 1,
      md: 2,
      lg: 3,
    }),
    autoFit: false,
  },
)

const gridClasses = computed(() => {
  const classes = [
    'grid',
    'container-type-inline-size',
    props.gap ? `gap-${props.gap}` : 'gap-4',
    !props.gap || props.gap === '4' ? 'lg:gap-6' : '',
  ]

  // Apply column configuration
  if (props.cols.default) {
    classes.push(`grid-cols-${props.cols.default}`)
  }
  if (props.cols.sm) {
    classes.push(`sm:grid-cols-${props.cols.sm}`)
  }
  if (props.cols.md) {
    classes.push(`md:grid-cols-${props.cols.md}`)
  }
  if (props.cols.lg) {
    classes.push(`lg:grid-cols-${props.cols.lg}`)
  }
  if (props.cols.xl) {
    classes.push(`xl:grid-cols-${props.cols.xl}`)
  }

  // Auto-fit mode
  if (props.autoFit) {
    classes.push('grid-auto-fit')
  }

  // Aspect ratio
  if (props.aspectRatio) {
    classes.push(`aspect-${props.aspectRatio}`)
  }

  return classes.filter(Boolean)
})
</script>

<style scoped>
@reference "tailwindcss";

/* Custom grid styles for auto-fit behavior */
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Container overflow control */
.bento-grid {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

/* Ensure grid items stay within bounds */
.bento-grid > * {
  position: relative;
  z-index: 1;
  max-width: 100%;
  overflow: hidden;
}

/* Featured item styling */
.bento-grid-featured {
  z-index: 2;
}

/* Container query support */
.container-type-inline-size {
  container-type: inline-size;
}

/* Responsive grid adjustments */
@container (min-width: 768px) {
  .bento-grid {
    --grid-auto-rows: minmax(0, 1fr);
  }
}
</style>