// Brand Constants
export const BRAND_COLORS = {
  monkYellow: '#FFDE0A',
  codeBlack: '#121212',
  silentWhite: '#F5F5F5',
  rhythmGrey: '#4a5568',
  monkYellowContrast: '#B8A200',
} as const

// Typography Constants
export const FONT_FAMILIES = {
  heading: 'Montserrat, ui-sans-serif, system-ui, sans-serif',
  body: 'Inter, ui-sans-serif, system-ui, sans-serif',
  mono: 'JetBrains Mono, ui-monospace, monospace',
} as const

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 150,
  base: 200,
  slow: 300,
  slower: 500,
} as const

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Z-Index Scale
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// Navigation Items
export const NAVIGATION_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const

// Contact Information
export const CONTACT_INFO = {
  email: 'gdseck@monk-code.dev',
  github: 'https://github.com/orgs/monk-code/repositories',
  linkedin: 'https://be.linkedin.com/in/gregorydeseck',
} as const

// Site Metadata
export const SITE_CONFIG = {
  name: 'MONKCODE',
  title: 'MONKCODE - Digital Craftsmanship',
  description:
    'Frontend developer specializing in fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture.',
  url: 'https://monk-code.dev',
  author: {
    name: 'Gregory Deseck',
    email: 'gdseck@monk-code.dev',
  },
  social: {
    github: 'https://github.com/orgs/monk-code/repositories',
    linkedin: 'https://be.linkedin.com/in/gregorydeseck',
  },
} as const

// Theme Constants
export const THEMES = ['light', 'dark'] as const
export const DEFAULT_THEME = 'light' as const

// Button Variants and Sizes
export const BUTTON_VARIANTS = ['primary', 'secondary', 'ghost'] as const
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const

// Form Validation
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minNameLength: 2,
  maxNameLength: 50,
  minMessageLength: 10,
  maxMessageLength: 1000,
} as const

// Performance and SEO
export const SEO_DEFAULTS = {
  titleTemplate: '%s | MONKCODE',
  defaultTitle: 'MONKCODE - Digital Craftsmanship',
  description:
    'Frontend developer specializing in fast, beautiful, and maintainable web experiences with Vue.js and modern Jamstack architecture.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'MONKCODE',
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@monkcode_dev',
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  formSubmitted: 'Thank you! Your message has been sent.',
  themeSwitched: 'Theme updated successfully.',
  copied: 'Copied to clipboard!',
} as const
