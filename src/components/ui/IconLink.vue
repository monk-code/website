<template>
  <a 
    :href="href" 
    :aria-label="ariaLabel"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted/5 text-muted-foreground transition-all duration-500 ease-out hover:text-primary hover:bg-primary/5 hover:scale-105 border-0"
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