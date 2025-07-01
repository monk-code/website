# Step 9: Contact Section

## Goal
Create an engaging contact section with prominent call-to-action links for email, GitHub, and LinkedIn, plus an optional contact form.

## Prerequisites
- Completed Step 8: About Section
- CTA Button component ready
- Icon components configured

## Files to Create/Modify
- `src/components/Contact.astro` (create)
- `src/components/ContactLink.vue` (create)
- `src/components/ContactForm.vue` (create - optional)
- `src/pages/index.astro` (modify)

## Code Implementation

### 1. Create Contact Link Component

#### `src/components/ContactLink.vue`
```vue
<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="contact-link group"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Icon Container -->
    <div class="icon-container">
      <div class="icon-bg"></div>
      <component :is="iconComponent" class="icon" />
    </div>
    
    <!-- Content -->
    <div class="link-content">
      <span class="link-label">{{ label }}</span>
      <span class="link-value">{{ value }}</span>
    </div>
    
    <!-- Arrow -->
    <svg 
      class="arrow" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M17 8l4 4m0 0l-4 4m4-4H3" 
      />
    </svg>
  </a>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['email', 'github', 'linkedin'].includes(value)
  },
  href: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  external: {
    type: Boolean,
    default: true
  }
});

const isHovered = ref(false);

// Email Icon
const EmailIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  `
};

// GitHub Icon
const GitHubIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  `
};

// LinkedIn Icon
const LinkedInIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  `
};

const iconComponent = computed(() => {
  const icons = {
    email: EmailIcon,
    github: GitHubIcon,
    linkedin: LinkedInIcon
  };
  return icons[props.type];
});
</script>

<style scoped>
.contact-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: var(--code-black-light);
  border: 1px solid var(--code-black-lighter);
  border-radius: 1rem;
  text-decoration: none;
  transition: all var(--transition-base);
  overflow: hidden;
  position: relative;
}

.contact-link:hover {
  transform: translateY(-2px);
  border-color: var(--monk-yellow);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Hover background effect */
.contact-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--monk-yellow) 0%, transparent 100%);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.contact-link:hover::before {
  opacity: 0.05;
}

/* Icon */
.icon-container {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  flex-shrink: 0;
}

.icon-bg {
  position: absolute;
  inset: 0;
  background-color: var(--monk-yellow);
  opacity: 0.1;
  border-radius: 0.75rem;
  transition: all var(--transition-base);
}

.contact-link:hover .icon-bg {
  opacity: 0.2;
  transform: scale(1.1);
}

.icon {
  width: 100%;
  height: 100%;
  padding: 0.875rem;
  color: var(--monk-yellow);
  position: relative;
  z-index: 1;
}

/* Content */
.link-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.link-label {
  font-size: 0.875rem;
  color: var(--rhythm-grey);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.link-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--silent-white);
  font-family: var(--font-heading);
}

/* Arrow */
.arrow {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--rhythm-grey);
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.contact-link:hover .arrow {
  color: var(--monk-yellow);
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 640px) {
  .contact-link {
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .icon-container {
    width: 3rem;
    height: 3rem;
  }
  
  .link-value {
    font-size: 1rem;
  }
}
</style>
```

### 2. Create Optional Contact Form Component

#### `src/components/ContactForm.vue`
```vue
<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <div class="form-grid">
      <!-- Name Field -->
      <div class="form-group">
        <label for="name" class="form-label">Your Name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="form-input"
          placeholder="John Doe"
        />
      </div>
      
      <!-- Email Field -->
      <div class="form-group">
        <label for="email" class="form-label">Email Address</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="form-input"
          placeholder="john@example.com"
        />
      </div>
    </div>
    
    <!-- Message Field -->
    <div class="form-group">
      <label for="message" class="form-label">Your Message</label>
      <textarea
        id="message"
        v-model="formData.message"
        required
        rows="5"
        class="form-input"
        placeholder="Tell me about your project..."
      ></textarea>
    </div>
    
    <!-- Submit Button -->
    <button
      type="submit"
      class="submit-button"
      :disabled="isSubmitting"
    >
      <span v-if="!isSubmitting">Send Message</span>
      <span v-else class="flex items-center gap-2">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      </span>
    </button>
    
    <!-- Success Message -->
    <Transition name="fade">
      <div v-if="showSuccess" class="success-message">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span>Message sent successfully! I'll get back to you soon.</span>
      </div>
    </Transition>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formData = reactive({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // Simulate form submission (replace with actual API call)
  try {
    // Example: Send to Formspree, Netlify Forms, or custom endpoint
    // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    formData.name = '';
    formData.email = '';
    formData.message = '';
    
    // Show success
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error('Form submission error:', error);
    // Handle error
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--silent-white);
}

.form-input {
  padding: 0.75rem 1rem;
  background-color: var(--code-black-light);
  border: 1px solid var(--code-black-lighter);
  border-radius: 0.5rem;
  color: var(--silent-white);
  font-size: 1rem;
  transition: all var(--transition-base);
}

.form-input:focus {
  outline: none;
  border-color: var(--monk-yellow);
  box-shadow: 0 0 0 3px rgba(255, 222, 10, 0.1);
}

.form-input::placeholder {
  color: var(--rhythm-grey-dark);
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: var(--monk-yellow);
  color: var(--code-black);
  font-weight: 600;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 222, 10, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 0.5rem;
  color: rgb(34, 197, 94);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

### 3. Create Contact Section Component

#### `src/components/Contact.astro`
```astro
---
import ContactLink from './ContactLink.vue';
import ContactForm from './ContactForm.vue';
import CTAButton from './CTAButton.vue';

const showForm = false; // Toggle this to show/hide the form
---

<section id="contact" class="py-20 lg:py-32 relative overflow-hidden">
  <!-- Background Decoration -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
  </div>
  
  <div class="container mx-auto px-4 relative z-10">
    <!-- Section Header -->
    <div class="text-center mb-16 fade-in">
      <h2 class="text-4xl md:text-5xl font-heading font-bold mb-6">
        Let's Build Something Together
      </h2>
      <p class="text-lg text-text-secondary max-w-2xl mx-auto">
        Have a project in mind, or just want to talk code? I'm always open to new 
        opportunities and collaborations. Reach out and let's get the conversation started.
      </p>
    </div>
    
    <!-- Contact Methods -->
    <div class="max-w-4xl mx-auto">
      <!-- Contact Links -->
      <div class="grid gap-4 mb-12 fade-in" data-delay="100">
        <ContactLink
          client:visible
          type="email"
          href="mailto:monkcode@pm.me"
          label="Email"
          value="monkcode@pm.me"
          :external="false"
        />
        
        <ContactLink
          client:visible
          type="github"
          href="https://github.com/orgs/monk-code/repositories"
          label="GitHub"
          value="github.com/monk-code"
        />
        
        <ContactLink
          client:visible
          type="linkedin"
          href="https://be.linkedin.com/in/gregorydeseck"
          label="LinkedIn"
          value="linkedin.com/in/gregorydeseck"
        />
      </div>
      
      <!-- Optional: Contact Form -->
      {showForm && (
        <div class="mt-16 pt-16 border-t border-background-light fade-in" data-delay="200">
          <h3 class="text-2xl font-heading font-semibold text-center mb-8">
            Or Send a Direct Message
          </h3>
          <ContactForm client:visible />
        </div>
      )}
      
      <!-- Availability Status -->
      <div class="text-center mt-16 fade-in" data-delay="300">
        <div class="inline-flex items-center gap-3 px-6 py-3 bg-background-light rounded-full border border-background-lighter">
          <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium">Currently available for freelance projects</span>
        </div>
      </div>
      
      <!-- Calendar Link (Optional) -->
      <div class="text-center mt-8 fade-in" data-delay="400">
        <p class="text-text-secondary mb-4">Prefer to schedule a call?</p>
        <CTAButton
          href="https://calendly.com/your-link"
          variant="secondary"
          size="md"
          client:visible
        >
          Book a 30-min Call
        </CTAButton>
      </div>
    </div>
  </div>
</section>

<style>
  /* Additional styling if needed */
</style>
```

### 4. Update Index Page

#### `src/pages/index.astro` (modify)
```astro
---
import Layout from '@layouts/Layout.astro';
import Hero from '@components/Hero.astro';
import Projects from '@components/Projects.astro';
import About from '@components/About.astro';
import Contact from '@components/Contact.astro';
---

<Layout>
  <!-- Hero Section -->
  <Hero />
  
  <!-- Projects Section -->
  <Projects />
  
  <!-- About Section -->
  <About />
  
  <!-- Contact Section -->
  <Contact />
</Layout>
```

## Verification Steps

1. **Contact Links**:
   - All three links display correctly
   - Icons show in yellow
   - Hover effects work (lift, glow, arrow move)
   - Links open correctly (email client, new tabs)

2. **Form (if enabled)**:
   - Fields have proper validation
   - Submit button shows loading state
   - Success message appears after submission
   - Form resets after successful send

3. **Responsive Design**:
   - Links stack properly on mobile
   - Form fields adapt to screen size
   - Text remains readable

4. **Availability Status**:
   - Green pulse animation works
   - Badge displays correctly

5. **Calendar Link**:
   - Button styled consistently
   - Opens calendar booking page

## Integration Options

### Form Backends
1. **Formspree**: Simple form endpoint service
2. **Netlify Forms**: Built-in form handling
3. **EmailJS**: Client-side email sending
4. **Custom API**: Your own backend endpoint

### Calendar Integration
1. **Calendly**: Popular scheduling tool
2. **Cal.com**: Open-source alternative
3. **Google Calendar**: Direct calendar links
4. **Custom Solution**: Build your own

### Additional Features
1. **Office Hours**: Show availability times
2. **Response Time**: Expected reply timeline
3. **Preferred Contact**: Highlight best method
4. **Social Proof**: Testimonials or stats

## Next Step
→ [Step 10: Footer & Final Integration](./10-footer-integration.md) - Create the footer and integrate all components together.