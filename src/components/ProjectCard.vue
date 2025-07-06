<template>
  <article class="project-card group relative bg-background-light rounded-2xl overflow-hidden transition-all duration-base hover:transform hover:-translate-y-1 hover:shadow-xl">
    <div class="image-container relative h-60 overflow-hidden">
      <img 
        :src="imageUrl" 
        :alt="`Screenshot of ${title} project`"
        class="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
        width="600"
        height="400"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 opacity-60 group-hover:opacity-80 transition-opacity duration-base"></div>
    </div>
    
    <div class="card-content p-6 flex flex-col gap-4">
      <h3 class="text-xl font-semibold font-heading text-foreground">{{ title }}</h3>
      <p class="text-muted-foreground leading-relaxed">{{ description }}</p>
      
      <div class="tech-stack flex flex-wrap gap-2 mt-2">
        <TechPill v-for="tech in techStack" :key="tech">
          {{ tech }}
        </TechPill>
      </div>
      
      <div class="project-links flex gap-3 mt-auto pt-2">
        <IconLink
          v-if="liveUrl"
          :href="liveUrl"
          :aria-label="`View live demo of ${title}`"
        >
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </IconLink>
        
        <IconLink
          v-if="repoUrl"
          :href="repoUrl"
          :aria-label="`View source code for ${title}`"
        >
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </IconLink>
      </div>
    </div>
    
    <div class="hover-border absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-base pointer-events-none"></div>
  </article>
</template>

<script setup lang="ts">
import IconLink from './ui/IconLink.vue'
import TechPill from './ui/TechPill.vue'

interface Props {
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
}

defineProps<Props>()
</script>