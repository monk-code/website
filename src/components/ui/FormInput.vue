<template>
  <div class="form-field">
    <label :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'form-input',
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
        {
          'error': !!error,
          'border-red-500': !!error,
          'focus:ring-red-500': !!error,
        }
      ]"
      @input="handleInput"
      @blur="handleBlur"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FormInputType } from '@/types/index.js'

interface Props {
  label: string
  modelValue: string
  type: FormInputType
  required?: boolean
  error?: string
  placeholder?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
})

const emit = defineEmits<Emits>()

const inputId = computed((): string => {
  return `form-input-${props.label.toLowerCase().replace(/\s+/g, '-')}`
})

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
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

.form-input {
  background: var(--color-background);
  border-color: var(--color-muted);
  color: var(--color-foreground);
  font-family: var(--font-family-body);
  font-size: 1rem;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(255, 222, 10, 0.1);
}

.form-input.error {
  border-color: #ef4444;
}

.form-input.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.form-input:disabled {
  background: var(--color-muted);
  color: var(--color-muted-foreground);
  cursor: not-allowed;
}

.error-message {
  font-size: 0.875rem;
  color: #ef4444;
  font-family: var(--font-family-body);
  margin-top: 4px;
}

/* Dark mode adjustments */
[data-theme="dark"] .form-input {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(255, 222, 10, 0.2);
}

[data-theme="dark"] .form-input:disabled {
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-muted-foreground);
}
</style>