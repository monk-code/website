<template>
  <div class="philosophy-card" :class="{ 'is-monk': icon === 'monk', 'is-rhythm': icon === 'rhythm' }">
    <div class="card-content">
      <div class="icon-wrapper">
        <svg v-if="icon === 'monk'" class="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Minimalist monk icon representing focus and structure -->
          <rect x="8" y="4" width="8" height="16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else-if="icon === 'rhythm'" class="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Flowing wave icon representing rhythm and creativity -->
          <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 12C8 12 9.5 9 12 9C14.5 9 16 12 16 12C16 12 14.5 15 12 15C9.5 15 8 12 8 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
    <div class="card-accent"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: 'monk' | 'rhythm'
}>()
</script>

<style scoped>
.philosophy-card {
  position: relative;
  background: var(--color-background);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  overflow: hidden;
}

/* Dark mode card background */
[data-theme="dark"] .philosophy-card {
  background: var(--color-card-bg);
  border-color: #374151;
}

.philosophy-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

[data-theme="dark"] .philosophy-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-content {
  position: relative;
  z-index: 2;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  position: relative;
}

.card-icon {
  width: 100%;
  height: 100%;
  color: var(--color-primary);
  transition: transform 0.3s ease;
}

.philosophy-card:hover .card-icon {
  transform: scale(1.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--font-family-heading);
  color: var(--color-foreground);
  margin-bottom: 12px;
}

.card-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-muted-foreground);
}

/* Card accent background */
.card-accent {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  opacity: 0.05;
  pointer-events: none;
  transition: all 0.5s ease;
}

/* Monk card - structured pattern */
.is-monk .card-accent {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    var(--color-primary) 10px,
    var(--color-primary) 11px
  );
}

/* Rhythm card - flowing pattern */
.is-rhythm .card-accent {
  background: radial-gradient(
    circle at 80% 20%,
    var(--color-primary) 0%,
    transparent 50%
  );
  animation: rhythm-flow 20s infinite ease-in-out;
}

@keyframes rhythm-flow {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
}

.philosophy-card:hover .card-accent {
  opacity: 0.1;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .philosophy-card {
    padding: 24px;
  }
  
  .icon-wrapper {
    width: 40px;
    height: 40px;
    margin-bottom: 16px;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-description {
    font-size: 0.9375rem;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .philosophy-card {
    transition: none;
  }
  
  .philosophy-card:hover {
    transform: none;
  }
  
  .card-icon {
    transition: none;
  }
  
  .philosophy-card:hover .card-icon {
    transform: none;
  }
  
  .is-rhythm .card-accent {
    animation: none;
  }
}
</style>