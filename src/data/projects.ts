import bricsysImage from '@/assets/images/bricsys-247.png'
import brightEnergyImage from '@/assets/images/bright-energy-web.png'
import dietisteHanneImage from '@/assets/images/dietiste-hanne-van-nuffel.png'
import groepspraktijkImage from '@/assets/images/groepspraktijk-paviljoen.png'
import type { Project } from '@/types/index.js'

export const projects: Project[] = [
  {
    id: 'bricsys-247',
    title: 'Bricsys 24/7',
    description:
      'Cloud-based Common Data Environment (CDE) for construction document management and workflow automation. A comprehensive collaboration platform enabling real-time project management for architecture, engineering, and construction teams.',
    imageUrl: bricsysImage,
    techStack: [
      'React',
      'WebSocket',
      'Cloud Architecture',
      'Real-time Processing',
      'Microservices',
    ],
    liveUrl: 'https://www.bricsys.com/247',
    featured: true,
  },
  {
    id: 'bright-energy',
    title: 'Bright Energy Platform',
    description:
      'Comprehensive energy management platform for construction sites, featuring smart battery systems that replace diesel generators. Combines hardware monitoring, optimization algorithms, and energy trading capabilities.',
    imageUrl: brightEnergyImage,
    techStack: ['Vue.js', 'TypeScript', 'IoT', 'Machine Learning', 'Time-series Database'],
    liveUrl: 'https://app.bright-energy.eu',
    featured: true,
  },
  {
    id: 'groepspraktijk-paviljoen',
    title: 'Groepspraktijk Paviljoen',
    description:
      'Professional website for a multidisciplinary Belgian healthcare practice combining dietetics and contextual therapy. Features online appointment booking and team showcase.',
    imageUrl: groepspraktijkImage,
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    liveUrl: 'https://www.groepspraktijkpaviljoen.be',
    featured: false,
  },
  {
    id: 'dietiste-hanne',
    title: 'Dietiste Hanne Van Nuffel',
    description:
      'Personal branding website for an independent dietitian practice featuring a collaborative team of nutrition specialists with diverse expertise areas.',
    imageUrl: dietisteHanneImage,
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'SEO Optimization'],
    liveUrl: 'https://www.dietistehannevannuffel.be',
    featured: false,
  },
]

export const getUniqueTechnologies = (projects: Project[]): string[] => {
  const allTechnologies = projects.flatMap((project) => project.techStack)
  const uniqueTechnologies = Array.from(new Set(allTechnologies))
  return uniqueTechnologies.sort()
}
