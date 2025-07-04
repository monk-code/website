<template>
  <header role="banner" class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-neutral-800">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Brand -->
        <a href="/" class="font-montserrat font-bold text-xl text-primary hover:opacity-80 transition-opacity">
          {{ SITE_CONFIG.name }}
        </a>
        
        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a 
            v-for="item in NAVIGATION_ITEMS" 
            :key="item.href"
            :href="item.href" 
            class="text-foreground hover:text-primary transition-colors"
          >
            {{ item.label }}
          </a>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!isMobileMenuOpen" d="M3 12h18M3 6h18M3 18h18" />
            <path v-else d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <nav 
        v-if="isMobileMenuOpen"
        class="md:hidden py-4 border-t border-neutral-800"
      >
        <a 
          v-for="item in NAVIGATION_ITEMS"
          :key="`mobile-${item.href}`"
          :href="item.href" 
          class="block py-2 text-foreground hover:text-primary transition-colors"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useMobileMenu } from '@/composables/useMobileMenu.js'
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/utils/constants.js'

const {
  isOpen: isMobileMenuOpen,
  toggle: toggleMobileMenu,
  close: closeMobileMenu,
} = useMobileMenu()
</script>