/// <reference types="astro/client" />
/// <reference types="vite/client" />

// Vue module declarations
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

// Astro module declarations
declare module '*.astro' {
  const Component: (...args: unknown[]) => unknown
  export default Component
}
