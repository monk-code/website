<template>
  <a v-if="href" :href="href" :class="buttonClasses" :tabindex="0" @click="handleClick">
    <span class="relative z-10">
      <slot />
    </span>
  </a>
  <router-link v-else-if="to" :to="to" :class="buttonClasses" :tabindex="0" @click="handleClick">
    <span class="relative z-10">
      <slot />
    </span>
  </router-link>
  <button v-else :class="buttonClasses" :tabindex="0" @click="handleClick">
    <span class="relative z-10">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonSize, ButtonVariant } from '@/types/index.js'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  to?: string
  onClick?: (event: MouseEvent) => void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const handleClick = (event: MouseEvent): void => {
  if (props.onClick) {
    props.onClick(event)
  }
}

const buttonClasses = computed((): string => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold transition-all duration-base focus:outline-none focus-ring-primary rounded-md relative overflow-hidden group'

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-button-primary text-button-primary-text shadow-lg hover:shadow-xl hover:shadow-primary/25 transform hover:-translate-y-0.5',
    secondary:
      'bg-transparent text-primary border-2 border-primary hover:bg-button-primary hover:text-button-primary-text transform hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-muted-foreground hover:text-primary underline-offset-4 hover:underline',
  }

  return [baseClasses, sizeClasses[props.size], variantClasses[props.variant]].join(' ')
})
</script>

<style scoped>
/* Ripple effect for primary variant */
.group:hover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
}

.group:hover::before {
  transform: scale(2);
}

/* Glow effect */
.group::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--color-monk-yellow);
  border-radius: inherit;
  opacity: 0;
  filter: blur(15px);
  transition: opacity 150ms ease;
  z-index: -1;
}

.group:hover::after {
  opacity: 0.3;
}

/* Focus handled by Tailwind utilities: focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background */

/* Respect reduced motion preferences with elegant alternatives */
@media (prefers-reduced-motion: reduce) {
  .group {
    transition: box-shadow 0.2s ease, background-color 0.2s ease;
  }
  
  .group:hover {
    transform: none; /* Remove transform animations */
  }
  
  .group::before,
  .group::after {
    display: none; /* Remove complex animations */
  }
  
  /* Enhanced focus for reduced motion users */
  .group:focus {
    box-shadow: 0 0 0 3px rgba(255, 222, 10, 0.4);
  }
}
</style>