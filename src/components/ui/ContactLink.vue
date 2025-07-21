<template>
  <component
    :is="type === 'email' ? 'button' : 'a'"
    :href="type !== 'email' ? href : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel"
    :title="tooltipText"
    @click="handleClick"
    class="contact-link inline-flex items-center group transition-all duration-base focus:outline-none"
    :class="{ 'icon-only': iconOnly }"
  >
    <div class="icon-container">
      <svg
        v-if="type === 'email'"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="Email icon"
      >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
      
      <svg
        v-else-if="type === 'github'"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="GitHub icon"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      
      <svg
        v-else-if="type === 'linkedin'"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="LinkedIn icon"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </div>
    <span v-if="!iconOnly" class="contact-value">{{ value }}</span>
    
    <!-- Copy feedback message -->
    <span v-if="showCopied" class="copied-message">Copied!</span>
    
    <!-- Arrow icon for external links only when not icon-only -->
    <svg
      v-if="!iconOnly && isExternal"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="arrow-icon"
      aria-label="External link"
    >
      <path d="M6.22 3a.75.75 0 0 1 0-1.5h6.25a.75.75 0 0 1 .75.75v6.25a.75.75 0 0 1-1.5 0V3.56L3.28 11.78a.75.75 0 0 1-1.06-1.06l8.22-8.22H6.22z"/>
    </svg>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ContactLinkType } from '@/types/index.js'

interface Props {
  type: ContactLinkType
  label: string
  value: string
  iconOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconOnly: false,
})

const showCopied = ref(false)

const href = computed((): string => {
  switch (props.type) {
    case 'email':
      return `mailto:${props.value}`
    case 'github':
    case 'linkedin':
      return props.value
    default:
      return '#'
  }
})

const isExternal = computed((): boolean => {
  return props.type === 'github' || props.type === 'linkedin'
})

const ariaLabel = computed((): string => {
  if (props.type === 'email') {
    return `Copy email address: ${props.value}`
  }
  return `${props.label}: ${props.value}`
})

const tooltipText = computed((): string => {
  if (props.iconOnly) {
    switch (props.type) {
      case 'email':
        return `Click to copy ${props.value} to clipboard`
      case 'github':
        return `Visit GitHub profile`
      case 'linkedin':
        return `Visit LinkedIn profile`
      default:
        return props.label
    }
  }
  return ''
})

const handleClick = async (event: Event) => {
  if (props.type === 'email') {
    event.preventDefault()
    await copyToClipboard()
  }
  // For other types, let the default link behavior happen
}

const copyToClipboard = async () => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(props.value)
      showCopiedFeedback()
    }
  } catch (error) {
    // Silently fail - clipboard API might not be available
    console.warn('Failed to copy to clipboard:', error)
  }
}

const showCopiedFeedback = () => {
  showCopied.value = true
  setTimeout(() => {
    showCopied.value = false
  }, 1500)
}
</script>

<style scoped>
.contact-link {
  padding: 12px 0;
  text-decoration: none;
  color: inherit;
  width: 100%;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.contact-link:last-child {
  border-bottom: none;
}

/* Enhanced focus styles for beautiful keyboard navigation */
.contact-link:focus {
  border-radius: 8px;
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px rgba(255, 222, 10, 0.25);
}

.contact-link.icon-only:focus {
  transform: translateY(-2px);
  box-shadow: 0 0 0 3px rgba(255, 222, 10, 0.3), 0 0 12px rgba(255, 222, 10, 0.2);
}

/* Icon-only mode styles */
.contact-link.icon-only {
  width: auto;
  padding: 12px;
  border-bottom: none;
  border-radius: 12px;
  position: relative;
}

.contact-link.icon-only:hover {
  background: rgba(255, 222, 10, 0.08);
}

.contact-link:hover {
  color: var(--color-primary);
}

.contact-link:hover .icon-container {
  background: rgba(255, 222, 10, 0.15);
}

.contact-link:hover .arrow-icon {
  transform: translate(2px, -2px);
}

.icon-container {
  width: 36px;
  height: 36px;
  background: rgba(255, 222, 10, 0.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

/* Larger icons in icon-only mode */
.contact-link.icon-only .icon-container {
  width: 48px;
  height: 48px;
  background: rgba(255, 222, 10, 0.1);
}

.contact-link.icon-only .icon-container svg {
  width: 24px;
  height: 24px;
}

.contact-value {
  font-size: 0.9375rem;
  color: var(--color-foreground);
  font-weight: 500;
  word-break: break-all;
  overflow-wrap: break-word;
  hyphens: auto;
  flex: 1;
  font-family: var(--font-family-body);
}

.arrow-icon {
  opacity: 0.4;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.contact-link:hover .arrow-icon {
  opacity: 1;
}

/* Copied message styles */
.copied-message {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 10;
  animation: fadeInUp 0.2s ease;
}

.copied-message::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--color-primary);
}

/* Ensure proper positioning for copied message */
.contact-link.icon-only {
  position: relative;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .contact-link {
  border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .icon-container {
  background: rgba(255, 222, 10, 0.06);
}

[data-theme="dark"] .contact-link:hover .icon-container {
  background: rgba(255, 222, 10, 0.12);
}

[data-theme="dark"] .contact-link.icon-only .icon-container {
  background: rgba(255, 222, 10, 0.08);
}

[data-theme="dark"] .contact-link.icon-only:hover {
  background: rgba(255, 222, 10, 0.05);
}

[data-theme="dark"] .contact-link.icon-only:hover .icon-container {
  background: rgba(255, 222, 10, 0.15);
}

/* Dark mode focus enhancements */
[data-theme="dark"] .contact-link:focus {
  box-shadow: 0 0 0 3px rgba(255, 222, 10, 0.15);
}

[data-theme="dark"] .contact-link.icon-only:focus {
  box-shadow: 0 0 0 3px rgba(255, 222, 10, 0.2), 0 0 16px rgba(255, 222, 10, 0.15);
}
</style>