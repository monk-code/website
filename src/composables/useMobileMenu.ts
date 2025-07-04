import { type Ref, ref } from 'vue'

interface MobileMenuComposable {
  isOpen: Ref<boolean>
  toggle: () => void
  close: () => void
  open: () => void
}

export const useMobileMenu = (): MobileMenuComposable => {
  const isOpen = ref(false)

  const toggle = (): void => {
    isOpen.value = !isOpen.value
  }

  const close = (): void => {
    isOpen.value = false
  }

  const open = (): void => {
    isOpen.value = true
  }

  return {
    isOpen,
    toggle,
    close,
    open,
  }
}
