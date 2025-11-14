import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Fonction pour obtenir la valeur initiale
  const getInitialTheme = (): boolean => {
    // Récupérer la préférence depuis localStorage ou utiliser la préférence système
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    // Utiliser la préférence système
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const isDark = ref<boolean>(getInitialTheme())

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    // Mettre à jour le thème Vuetify via l'événement personnalisé
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('theme-changed', { detail: { isDark: isDark.value } }))
    }
  }

  // Fonction pour définir le thème
  const setTheme = (dark: boolean) => {
    isDark.value = dark
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('theme-changed', { detail: { isDark: dark } }))
    }
  }

  return {
    isDark,
    toggleTheme,
    setTheme
  }
})

