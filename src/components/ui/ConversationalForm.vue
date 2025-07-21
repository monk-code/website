<template>
  <div class="w-full max-w-2xl mx-auto">
    <div v-if="!selectedPurpose" class="text-center">
      <h3 class="text-3xl font-semibold font-heading mb-8 text-foreground">What brings you here today?</h3>
      <div class="flex flex-col gap-4">
        <button
          data-testid="project-option"
          @click="selectPurpose('project')"
          class="flex items-center gap-4 px-6 py-5 bg-card-bg border-2 border-card-border rounded-xl font-body text-lg font-medium text-foreground cursor-pointer transition-all duration-200 text-left hover:border-primary hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus:outline-none focus-ring-primary"
        >
          <span class="text-2xl flex-shrink-0">💼</span>
          <span class="flex-1">I have a project in mind</span>
        </button>
        <button
          data-testid="hello-option"
          @click="selectPurpose('hello')"
          class="flex items-center gap-4 px-6 py-5 bg-card-bg border-2 border-card-border rounded-xl font-body text-lg font-medium text-foreground cursor-pointer transition-all duration-200 text-left hover:border-primary hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus:outline-none focus-ring-primary"
        >
          <span class="text-2xl flex-shrink-0">👋</span>
          <span class="flex-1">Just want to say hello</span>
        </button>
        <button
          data-testid="collaboration-option"
          @click="selectPurpose('collaboration')"
          class="flex items-center gap-4 px-6 py-5 bg-card-bg border-2 border-card-border rounded-xl font-body text-lg font-medium text-foreground cursor-pointer transition-all duration-200 text-left hover:border-primary hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus:outline-none focus-ring-primary"
        >
          <span class="text-2xl flex-shrink-0">🤝</span>
          <span class="flex-1">Interested in collaboration</span>
        </button>
      </div>
    </div>

    <form
      v-else
      @submit.prevent="handleSubmit"
      class="animate-fade-in-up"
    >
      <button
        type="button"
        data-testid="back-button"
        @click="goBack"
        class="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-transparent border-none text-muted-foreground font-body text-sm font-medium cursor-pointer transition-colors duration-200 hover:text-foreground"
      >
        ← Back
      </button>

      <div class="mb-8">
        <h3 class="text-3xl font-semibold font-heading mb-2 text-foreground">{{ formTitle }}</h3>
        <p class="text-lg text-muted-foreground font-body">{{ formDescription }}</p>
      </div>

      <div class="flex flex-col gap-6 mb-8">
        <div class="flex flex-col gap-2 animate-fade-in-up animate-delay-100">
          <label for="name" class="text-sm font-medium text-foreground font-body">Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            :placeholder="namePlaceholder"
            class="px-4 py-3 bg-card-bg border-2 border-card-border rounded-lg font-body text-base text-foreground transition-all duration-200 placeholder:text-muted-foreground placeholder:opacity-70 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(255,222,10,0.2)]"
          />
        </div>

        <div class="flex flex-col gap-2 animate-fade-in-up animate-delay-200">
          <label for="email" class="text-sm font-medium text-foreground font-body">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            :placeholder="emailPlaceholder"
            class="px-4 py-3 bg-card-bg border-2 border-card-border rounded-lg font-body text-base text-foreground transition-all duration-200 placeholder:text-muted-foreground placeholder:opacity-70 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(255,222,10,0.2)]"
          />
        </div>

        <div class="flex flex-col gap-2 animate-fade-in-up animate-delay-300">
          <label for="message" class="text-sm font-medium text-foreground font-body">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            required
            :rows="6"
            :placeholder="messagePlaceholder"
            class="px-4 py-3 bg-card-bg border-2 border-card-border rounded-lg font-body text-base text-foreground transition-all duration-200 placeholder:text-muted-foreground placeholder:opacity-70 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,222,10,0.1)] resize-y min-h-[120px]"
          ></textarea>
        </div>
      </div>

      <button type="submit" class="w-full px-8 py-4 bg-primary text-primary-foreground border-none rounded-lg font-body text-lg font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,222,10,0.3)] active:translate-y-0 animate-fade-in-up animate-delay-500">
        Send Message
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Purpose = 'project' | 'hello' | 'collaboration' | null

interface FormData {
  purpose: Purpose
  name: string
  email: string
  message: string
}

interface Props {
  onSubmit: (data: FormData) => void
}

const props = defineProps<Props>()

const selectedPurpose = ref<Purpose>(null)
const formData = ref<FormData>({
  purpose: null,
  name: '',
  email: '',
  message: '',
})

const formTitle = computed(() => {
  switch (selectedPurpose.value) {
    case 'project':
      return 'Tell me about your project'
    case 'hello':
      return 'Say hello'
    case 'collaboration':
      return "Let's explore collaboration"
    default:
      return ''
  }
})

const formDescription = computed(() => {
  switch (selectedPurpose.value) {
    case 'project':
      return "I'd love to hear about what you're building"
    case 'hello':
      return 'Drop me a line, always happy to connect'
    case 'collaboration':
      return 'Tell me about your ideas'
    default:
      return ''
  }
})

const namePlaceholder = computed(() => {
  switch (selectedPurpose.value) {
    case 'project':
      return 'The person behind the project'
    case 'hello':
      return 'Your name'
    case 'collaboration':
      return 'Who am I speaking with?'
    default:
      return ''
  }
})

const emailPlaceholder = computed(() => {
  return 'Where should I send my response?'
})

const messagePlaceholder = computed(() => {
  switch (selectedPurpose.value) {
    case 'project':
      return 'Share your vision - timeline, tech stack, goals...'
    case 'hello':
      return 'What would you like to say?'
    case 'collaboration':
      return 'What kind of collaboration do you have in mind?'
    default:
      return ''
  }
})

const selectPurpose = (purpose: Purpose) => {
  selectedPurpose.value = purpose
  formData.value.purpose = purpose
}

const goBack = () => {
  selectedPurpose.value = null
  formData.value = {
    purpose: null,
    name: '',
    email: '',
    message: '',
  }
}

const handleSubmit = () => {
  if (formData.value.name && formData.value.email && formData.value.message) {
    props.onSubmit(formData.value)
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .text-3xl {
    font-size: 1.75rem;
  }
  
  .text-lg {
    font-size: 1.125rem;
  }
  
  /* Increase tap targets for mobile */
  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
}

@media (max-width: 640px) {
  .text-3xl {
    font-size: 1.5rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  /* Even larger tap targets for small screens */
  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .py-5 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  
  /* Make form fields more accessible on mobile */
  .px-4.py-3 {
    padding: 1rem 1.25rem;
  }
  
  /* Ensure submit button is thumb-friendly */
  .px-8.py-4 {
    padding: 1.25rem 2rem;
    min-height: 3rem; /* 48px minimum for accessibility */
  }
}

@media (max-width: 480px) {
  /* Reduce margin/padding for very small screens */
  .mb-8 {
    margin-bottom: 1.5rem;
  }
  
  .gap-6 {
    gap: 1rem;
  }
  
  .max-w-2xl {
    max-width: 100%;
    padding: 0 1rem;
  }
}

/* Improve touch targets for all interactive elements */
@media (hover: none) and (pointer: coarse) {
  button {
    min-height: 44px; /* iOS guideline minimum */
    min-width: 44px;
  }
  
  input, textarea {
    min-height: 44px;
  }
}
</style>