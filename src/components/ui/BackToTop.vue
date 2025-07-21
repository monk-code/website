<template>
  <button 
    v-show="isVisible"
    aria-label="Back to top"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 bg-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-primary-foreground shadow-lg hover:scale-105 focus:outline-none focus:scale-110 transition-all duration-200 z-50 focus-ring-primary"
  >
    <svg 
      class="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M5 10l7-7m0 0l7 7m-7-7v18" 
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)

const checkScrollPosition = () => {
  isVisible.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  checkScrollPosition()
  window.addEventListener('scroll', checkScrollPosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition)
})
</script>