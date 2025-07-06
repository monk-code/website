// Theme types
export type Theme = 'light' | 'dark'

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  external?: boolean
}

// Project types
export interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

// Button component types
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  to?: string
  onClick?: (event: MouseEvent) => void
}

// SEO types
export interface SEOProps {
  title?: string
  description?: string
  ogImage?: string
  noindex?: boolean
}

// Layout types
export interface LayoutProps extends SEOProps {
  title?: string
  description?: string
  ogImage?: string
  noindex?: boolean
}

// Contact information types
export interface ContactInfo {
  email: string
  github: string
  linkedin: string
}

// Brand colors (for type safety in CSS custom properties)
export interface BrandColors {
  monkYellow: string
  codeBlack: string
  silentWhite: string
  rhythmGrey: string
  monkYellowContrast: string
}

// Animation types
export type AnimationDuration = 'fast' | 'base' | 'slow'
export type AnimationEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'

// Mobile menu types
export interface MobileMenuState {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

// Theme state types
export interface ThemeState {
  currentTheme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  isDark: boolean
}

// Component Props
export type TechPillProps = object

export interface IconLinkProps {
  href: string
  ariaLabel: string
  external?: boolean
}

export interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
}
