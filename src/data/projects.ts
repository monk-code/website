import type { ImageMetadata } from 'astro'

// Original images (for fallback)
import bricsysImage from '@/assets/images/bricsys-247.png'
// Optimized images - 400x255
import bricsys400png from '@/assets/images/bricsys-247_400_255.png'
import bricsys400webp from '@/assets/images/bricsys-247_400_255.webp'
// Optimized images - 800x450 (retina)
import bricsys800png from '@/assets/images/bricsys-247_800_450.png'
import bricsys800webp from '@/assets/images/bricsys-247_800_450.webp'
import brightEnergyImage from '@/assets/images/bright-energy.png'
import brightEnergy400png from '@/assets/images/bright-energy_400_255.png'
import brightEnergy400webp from '@/assets/images/bright-energy_400_255.webp'
import brightEnergy800png from '@/assets/images/bright-energy_800_450.png'
import brightEnergy800webp from '@/assets/images/bright-energy_800_450.webp'
import dietisteImage from '@/assets/images/dietiste-hanne-van-nuffel.png'
import dietiste400png from '@/assets/images/dietiste-hanne-van-nuffel_400_255.png'
import dietiste400webp from '@/assets/images/dietiste-hanne-van-nuffel_400_255.webp'
import dietiste800png from '@/assets/images/dietiste-hanne-van-nuffel_800_450.png'
import dietiste800webp from '@/assets/images/dietiste-hanne-van-nuffel_800_450.webp'
import groepspraktijkImage from '@/assets/images/groepspraktijk-paviljoen.png'
import groepspraktijk400png from '@/assets/images/groepspraktijk-paviljoen_400_255.png'
import groepspraktijk400webp from '@/assets/images/groepspraktijk-paviljoen_400_255.webp'
import groepspraktijk800png from '@/assets/images/groepspraktijk-paviljoen_800_450.png'
import groepspraktijk800webp from '@/assets/images/groepspraktijk-paviljoen_800_450.webp'

export type ProjectCategory = 'enterprise' | 'energy' | 'healthcare' | 'opensource'

export interface ProjectLink {
  type: 'live' | 'app' | 'marketing' | 'github' | 'company'
  url: string
  label: string
}

export interface ProjectStat {
  label: string
  value: string
}

export interface ResponsiveImage {
  fallback: ImageMetadata
  sources: {
    webp: {
      '1x': ImageMetadata
      '2x': ImageMetadata
    }
    png: {
      '1x': ImageMetadata
      '2x': ImageMetadata
    }
  }
}

export interface ModernProject {
  id: string
  title: string
  subtitle: string
  description: string
  image: ResponsiveImage
  tags: string[]
  category: ProjectCategory
  featured: boolean
  gradient: string
  accentColor: string
  stats: ProjectStat[]
  links: ProjectLink[]
  dateRange: string
  keyFeatures: string[]
}

export const projects: ModernProject[] = [
  {
    id: 'bricsys-247',
    title: 'Bricsys 24/7',
    subtitle: 'Enterprise SaaS Platform',
    description:
      'Cloud-based Common Data Environment (CDE) for construction document management. Built real-time collaboration features, 3D model viewing, and automated workflows for architecture and engineering teams.',
    image: {
      fallback: bricsysImage,
      sources: {
        webp: {
          '1x': bricsys400webp,
          '2x': bricsys800webp,
        },
        png: {
          '1x': bricsys400png,
          '2x': bricsys800png,
        },
      },
    },
    tags: ['React', 'Vue.js', 'WebSocket', 'Cloud', 'Real-time', 'BIM'],
    category: 'enterprise',
    featured: true,
    gradient: 'from-blue-600 via-purple-600 to-indigo-700',
    accentColor: '#3B82F6',
    stats: [
      { label: 'File Formats', value: '70+' },
      { label: 'Users', value: 'Unlimited' },
      { label: 'Time Saved', value: '60%' },
    ],
    links: [
      { type: 'live', url: 'https://www.bricsys.com/247', label: 'Live Platform' },
      { type: 'company', url: 'https://www.bricsys.com', label: 'Company' },
    ],
    dateRange: '2023-2024',
    keyFeatures: [
      'Real-time document streaming viewer',
      'Graphical workflow editor',
      '3D model & point cloud visualization',
      'Mobile field annotations',
      'API integration with SharePoint',
    ],
  },
  {
    id: 'bright-energy',
    title: 'Bright Energy',
    subtitle: 'IoT Energy Management',
    description:
      'Comprehensive energy management platform combining smart battery systems, optimization algorithms, and energy trading. Replaces diesel generators with zero-emission mobile battery units.',
    image: {
      fallback: brightEnergyImage,
      sources: {
        webp: {
          '1x': brightEnergy400webp,
          '2x': brightEnergy800webp,
        },
        png: {
          '1x': brightEnergy400png,
          '2x': brightEnergy800png,
        },
      },
    },
    tags: ['Vue.js', 'IoT', 'ML', 'Trading', 'Analytics', 'Mobile'],
    category: 'energy',
    featured: true,
    gradient: 'from-green-500 via-teal-600 to-cyan-700',
    accentColor: '#10B981',
    stats: [
      { label: 'Cost Reduction', value: '60%' },
      { label: 'Emissions', value: 'Zero' },
      { label: 'Sites Managed', value: 'Multi' },
    ],
    links: [
      { type: 'marketing', url: 'https://www.bright-energy.eu', label: 'Marketing Site' },
      { type: 'app', url: 'https://app.bright-energy.eu', label: 'Application' },
    ],
    dateRange: '2024-Present',
    keyFeatures: [
      'Real-time energy monitoring',
      'Smart optimization algorithms',
      'Energy market trading integration',
      'Predictive maintenance alerts',
      'Multi-site management dashboard',
    ],
  },
  {
    id: 'groepspraktijk-paviljoen',
    title: 'Groepspraktijk Paviljoen',
    subtitle: 'Healthcare Practice Website',
    description:
      'Professional website for Belgian multidisciplinary healthcare practice. Features online appointment booking, team showcases, and service specialization for dietetics and therapy.',
    image: {
      fallback: groepspraktijkImage,
      sources: {
        webp: {
          '1x': groepspraktijk400webp,
          '2x': groepspraktijk800webp,
        },
        png: {
          '1x': groepspraktijk400png,
          '2x': groepspraktijk800png,
        },
      },
    },
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Booking API', 'Responsive'],
    category: 'healthcare',
    featured: false,
    gradient: 'from-rose-500 via-pink-600 to-purple-700',
    accentColor: '#EC4899',
    stats: [
      { label: 'Services', value: '2 Core' },
      { label: 'Booking', value: 'Integrated' },
      { label: 'Design', value: 'Responsive' },
    ],
    links: [{ type: 'live', url: 'https://www.groepspraktijkpaviljoen.be', label: 'Live Site' }],
    dateRange: '2023',
    keyFeatures: [
      'Online appointment booking system',
      'Multi-practitioner profiles',
      'Service specialization showcase',
      'Insurance information integration',
      'Google Maps integration',
    ],
  },
  {
    id: 'dietiste-hanne',
    title: 'Dietiste Hanne',
    subtitle: 'Personal Nutrition Practice',
    description:
      'Personal branding website for independent dietitian practice. Showcases collaborative team of nutrition specialists with diverse expertise and personal storytelling approach.',
    image: {
      fallback: dietisteImage,
      sources: {
        webp: {
          '1x': dietiste400webp,
          '2x': dietiste800webp,
        },
        png: {
          '1x': dietiste400png,
          '2x': dietiste800png,
        },
      },
    },
    tags: ['HTML5', 'CSS3', 'CMS', 'SEO', 'Mobile', 'Branding'],
    category: 'healthcare',
    featured: false,
    gradient: 'from-orange-500 via-red-600 to-pink-700',
    accentColor: '#F97316',
    stats: [
      { label: 'Languages', value: 'Multi' },
      { label: 'SEO', value: 'Optimized' },
      { label: 'Specialties', value: 'Diverse' },
    ],
    links: [{ type: 'live', url: 'https://www.dietistehannevannuffel.be', label: 'Live Site' }],
    dateRange: '2023',
    keyFeatures: [
      'Individual practitioner showcases',
      'Specialization matching system',
      'Professional photography gallery',
      'Personal storytelling approach',
      'Multi-language support',
    ],
  },
]

export const projectCategories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  {
    id: 'enterprise',
    label: 'Enterprise',
    count: projects.filter((p) => p.category === 'enterprise').length,
  },
  { id: 'energy', label: 'Energy', count: projects.filter((p) => p.category === 'energy').length },
  {
    id: 'healthcare',
    label: 'Healthcare',
    count: projects.filter((p) => p.category === 'healthcare').length,
  },
]

export const getAllTags = (): string[] => {
  const allTags = projects.flatMap((project) => project.tags)
  return [...new Set(allTags)].sort()
}

export const getProjectsByCategory = (category: ProjectCategory | 'all'): ModernProject[] => {
  if (category === 'all') return projects
  return projects.filter((project) => project.category === category)
}

export const getFeaturedProjects = (): ModernProject[] => {
  return projects.filter((project) => project.featured)
}
