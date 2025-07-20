<template>
  <div class="form-field">
    <label :for="textareaId" class="form-label">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
      :rows="rows"
      :class="[
        'form-textarea',
        'w-full',
        'px-4',
        'py-3',
        'rounded-lg',
        'border',
        'transition-all',
        'duration-base',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-primary',
        'focus:ring-offset-2',
        'resize-vertical',
        {
          'error': !!error,
          'border-red-500': !!error,
          'focus:ring-red-500': !!error,
        }
      ]"
      @input="handleInput"
      @blur="handleBlur"
    />
    <div v-if="maxLength || error" class="form-footer">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-if="maxLength" :class="characterCountClass">
        {{ characterCount }} / {{ maxLength }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  modelValue: string
  required?: boolean
  error?: string
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  rows?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  rows: 4,
})

const emit = defineEmits<Emits>()

const textareaId = computed((): string => {
  return `form-textarea-${props.label.toLowerCase().replace(/\s+/g, '-')}`
})

const characterCount = computed((): number => {
  return props.modelValue.length
})

const characterCountClass = computed((): string => {
  const baseClass = 'character-count'

  if (!props.maxLength) return baseClass

  const percentage = (characterCount.value / props.maxLength) * 100

  if (percentage > 100) return `${baseClass} error`
  if (percentage > 90) return `${baseClass} warning`

  return baseClass
})

const handleInput = (event: Event): void => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event)
}
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-foreground);
  font-family: var(--font-family-body);
}

.required-indicator {
  color: #ef4444;
  margin-left: 4px;
}

.form-textarea {
  background: var(--color-background);
  border-color: var(--color-muted);
  color: var(--color-foreground);
  font-family: var(--font-family-body);
  font-size: 1rem;
  line-height: 1.5;
  min-height: 120px;
}

.form-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(255, 222, 10, 0.1);
}

.form-textarea.error {
  border-color: #ef4444;
}

.form-textarea.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.form-textarea:disabled {
  background: var(--color-muted);
  color: var(--color-muted-foreground);
  cursor: not-allowed;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.error-message {
  font-size: 0.875rem;
  color: #ef4444;
  font-family: var(--font-family-body);
  flex: 1;
}

.character-count {
  font-size: 0.875rem;
  color: var(--color-muted-foreground);
  font-family: var(--font-family-body);
  white-space: nowrap;
}

.character-count.warning {
  color: #f59e0b;
}

.character-count.error {
  color: #ef4444;
}

/* Dark mode adjustments */
[data-theme="dark"] .form-textarea {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .form-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(255, 222, 10, 0.2);
}

[data-theme="dark"] .form-textarea:disabled {
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-muted-foreground);
}
</style>