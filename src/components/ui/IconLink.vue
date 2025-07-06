<template>
  <a 
    :href="href" 
    :aria-label="ariaLabel"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background-light border border-muted-foreground/30 text-muted-foreground transition-all duration-base hover:text-primary hover:border-primary hover:-translate-y-0.5"
    @click="handleClick"
  >
    <span class="flex items-center justify-center w-5 h-5">
      <slot />
    </span>
  </a>
</template>

<script setup lang="ts">
interface Props {
  href: string
  ariaLabel: string
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  external: true,
})

const handleClick = (event: MouseEvent): void => {
  if (props.href === '#') {
    event.preventDefault()
  }
}
</script>