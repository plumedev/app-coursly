import { defineStore } from 'pinia'
import { ref } from 'vue'

export type WeightUnit = 'kg' | 'g' | 'L' | 'ml' | 'unité' | ''

export const useUnitStore = defineStore('unit', () => {
  // Fonction pour obtenir l'unité initiale depuis localStorage
  const getInitialUnit = (): WeightUnit => {
    if (typeof window === 'undefined') return ''
    const saved = localStorage.getItem('preferredUnit')
    if (saved && ['kg', 'g', 'L', 'ml', 'unité', ''].includes(saved)) {
      return saved as WeightUnit
    }
    return ''
  }

  const preferredUnit = ref<WeightUnit>(getInitialUnit())

  // Fonction pour définir l'unité préférée
  const setPreferredUnit = (unit: WeightUnit) => {
    preferredUnit.value = unit
    localStorage.setItem('preferredUnit', unit)
  }

  return {
    preferredUnit,
    setPreferredUnit
  }
})
