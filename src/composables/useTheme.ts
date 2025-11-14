import { onMounted, onUnmounted, watch } from 'vue'
import { useTheme } from 'vuetify'
import { useThemeStore } from '@/stores/themeStore'

export function useAppTheme() {
  const theme = useTheme()
  const themeStore = useThemeStore()

  // Synchroniser le thème Vuetify avec le store
  const updateVuetifyTheme = () => {
    theme.global.name.value = themeStore.isDark ? 'darkTheme' : 'lightTheme'
  }

  // Écouter les changements du store
  watch(() => themeStore.isDark, () => {
    updateVuetifyTheme()
  })

  // Écouter les événements personnalisés
  const handleThemeChange = () => {
    updateVuetifyTheme()
  }

  onMounted(() => {
    updateVuetifyTheme()
    window.addEventListener('theme-changed', handleThemeChange as EventListener)
  })

  onUnmounted(() => {
    window.removeEventListener('theme-changed', handleThemeChange as EventListener)
  })

  return {
    isDark: themeStore.isDark,
    toggleTheme: themeStore.toggleTheme
  }
}

