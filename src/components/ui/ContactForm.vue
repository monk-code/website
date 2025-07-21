<template>
  <form @submit.prevent="handleSubmit" class="contact-form" role="form" aria-label="Contact form">
    <div class="form-header">
      <h3 class="form-title">Send me a message</h3>
      <p class="form-description">I'll get back to you as soon as possible.</p>
    </div>

    <div class="form-grid">
      <FormInput
        v-model="formData.name"
        label="Name"
        type="text"
        :required="true"
        :error="errors.name"
        placeholder="Your name"
        @blur="validateField('name')"
      />
      
      <FormInput
        v-model="formData.email"
        label="Email"
        type="email"
        :required="true"
        :error="errors.email"
        placeholder="your.email@example.com"
        @blur="validateField('email')"
      />
    </div>

    <FormTextarea
      v-model="formData.message"
      label="Message"
      :required="true"
      :error="errors.message"
      :max-length="1000"
      :rows="6"
      placeholder="Tell me about your project..."
      @blur="validateField('message')"
    />

    <!-- Honeypot fields for spam protection -->
    <input 
      v-model="honeypotData.website"
      name="website" 
      type="text" 
      style="display: none;" 
      aria-hidden="true" 
      tabindex="-1"
    />
    <input 
      v-model="honeypotData.phone2"
      name="phone2" 
      type="text" 
      style="position: absolute; left: -9999px;" 
      aria-hidden="true" 
      tabindex="-1"
    />
    
    <!-- Timestamp for time-based validation -->
    <input 
      v-model="formTimestamp"
      name="timestamp" 
      type="hidden"
    />

    <div class="form-actions">
      <button
        type="submit"
        :disabled="isSubmitting || !isFormValid"
        :class="[
          'submit-button',
          {
            'submitting': isSubmitting,
            'disabled': !isFormValid
          }
        ]"
      >
        <span v-if="!isSubmitting">Send Message</span>
        <span v-else class="loading-text">
          <svg class="loading-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z" opacity="0.25"/>
            <path d="M8 0a8 8 0 0 1 8 8h-2a6 6 0 0 0-6-6V0z"/>
          </svg>
          Sending...
        </span>
      </button>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="submitStatus" :class="['submit-message', submitStatus]">
      <div v-if="submitStatus === 'success'" class="success-message">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
        </svg>
        <div>
          <h4>Message sent successfully!</h4>
          <p>Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      </div>
      
      <div v-if="submitStatus === 'error'" class="error-message">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
        </svg>
        <div>
          <h4>Failed to send message</h4>
          <p v-if="errors.message">{{ errors.message }}</p>
          <p v-else>Please try again or contact me directly via email.</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { VALIDATION_RULES } from '@/utils/constants.js'
import FormInput from './FormInput.vue'
import FormTextarea from './FormTextarea.vue'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

interface HoneypotData {
  website: string
  phone2: string
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  message: '',
})

const honeypotData = reactive<HoneypotData>({
  website: '',
  phone2: '',
})

const formTimestamp = ref('')
const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const submitStatus = ref<'success' | 'error' | null>(null)

// Set timestamp when component mounts
onMounted(() => {
  formTimestamp.value = Date.now().toString()
})

// Spam detection function
const detectSpamContent = (data: FormData): boolean => {
  const spamKeywords = [
    'buy now',
    'click here',
    'free money',
    'get rich quick',
    'limited time',
    'urgent',
    'act now',
    'guarantee',
    'http://',
    'https://',
    'www.',
    '.com',
    '.net',
  ]

  const combinedText = `${data.name} ${data.email} ${data.message}`.toLowerCase()

  // Check for multiple spam indicators
  const spamScore = spamKeywords.reduce((score, keyword) => {
    return score + (combinedText.includes(keyword) ? 1 : 0)
  }, 0)

  // Consider it spam if multiple indicators are present
  return spamScore >= 3
}

const isFormValid = computed((): boolean => {
  return !!(
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim() &&
    !errors.name &&
    !errors.email &&
    !errors.message
  )
})

const validateField = (field: keyof FormData): void => {
  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = 'Name is required'
      } else if (formData.name.length < VALIDATION_RULES.minNameLength) {
        errors.name = `Name must be at least ${VALIDATION_RULES.minNameLength} characters`
      } else if (formData.name.length > VALIDATION_RULES.maxNameLength) {
        errors.name = `Name must be less than ${VALIDATION_RULES.maxNameLength} characters`
      } else {
        delete errors.name
      }
      break

    case 'email':
      if (!formData.email.trim()) {
        errors.email = 'Email is required'
      } else if (!VALIDATION_RULES.email.test(formData.email)) {
        errors.email = 'Please enter a valid email address'
      } else {
        delete errors.email
      }
      break

    case 'message':
      if (!formData.message.trim()) {
        errors.message = 'Message is required'
      } else if (formData.message.length < VALIDATION_RULES.minMessageLength) {
        errors.message = `Message must be at least ${VALIDATION_RULES.minMessageLength} characters`
      } else if (formData.message.length > VALIDATION_RULES.maxMessageLength) {
        errors.message = `Message must be less than ${VALIDATION_RULES.maxMessageLength} characters`
      } else {
        delete errors.message
      }
      break
  }
}

const validateAllFields = (): boolean => {
  validateField('name')
  validateField('email')
  validateField('message')

  return Object.keys(errors).length === 0
}

const resetForm = (): void => {
  formData.name = ''
  formData.email = ''
  formData.message = ''
  Object.keys(errors).forEach((key) => delete errors[key as keyof FormErrors])
  submitStatus.value = null
}

const handleSubmit = async (): Promise<void> => {
  if (!validateAllFields()) return

  isSubmitting.value = true
  submitStatus.value = null

  try {
    // Spam protection checks

    // 1. Honeypot check - if any honeypot field is filled, it's a bot
    if (honeypotData.website || honeypotData.phone2) {
      submitStatus.value = 'error'
      return
    }

    // 2. Time-based validation - minimum 3 seconds since page load
    const timeElapsed = Date.now() - parseInt(formTimestamp.value)
    if (timeElapsed < 3000) {
      submitStatus.value = 'error'
      return
    }

    // 3. Spam content detection
    if (detectSpamContent(formData)) {
      submitStatus.value = 'error'
      errors.message = 'Message appears to contain spam content'
      return
    }

    // 4. Submit to Web3forms
    const web3formsData = {
      access_key: import.meta.env.WEB3FORMS_ACCESS_KEY || 'b665046e-1b13-4b84-8eac-d87e7ecc93fa',
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: formTimestamp.value,
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(web3formsData),
    })

    const data = await response.json()

    if (data.success) {
      submitStatus.value = 'success'
      resetForm()
    } else {
      submitStatus.value = 'error'
    }
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-form {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-header {
  text-align: center;
  margin-bottom: 8px;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-foreground);
  font-family: var(--font-family-heading);
  margin-bottom: 8px;
}

.form-description {
  color: var(--color-muted-foreground);
  font-family: var(--font-family-body);
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.form-actions {
  margin-top: 8px;
}

.submit-button {
  width: 100%;
  padding: 16px 24px;
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border: none;
  border-radius: 12px;
  font-family: var(--font-family-body);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-button:hover:not(:disabled) {
  background: var(--color-monk-yellow-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 222, 10, 0.3);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  background: rgba(255, 222, 10, 0.3);
  color: rgba(18, 18, 18, 0.5);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.submit-message {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid;
}

.submit-message.success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.submit-message.error {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.success-message,
.error-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.success-message h4,
.error-message h4 {
  margin: 0 0 4px 0;
  font-size: 1rem;
  font-weight: 600;
}

.success-message p,
.error-message p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Dark mode adjustments */
[data-theme="dark"] .contact-form {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .submit-message.success {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.25);
}

[data-theme="dark"] .submit-message.error {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.25);
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-form {
    padding: 24px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .contact-form {
    padding: 20px;
  }
}
</style>