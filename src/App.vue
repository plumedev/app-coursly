<template>
  <StyleProvider>
    <v-app>
      <RouterView />
    </v-app>
  </StyleProvider>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { useThemeStore } from './stores/themeStore'
import StyleProvider from './providers/StyleProvider.vue'

// Initialiser le thème au démarrage
const theme = useTheme()
const themeStore = useThemeStore()

onMounted(() => {
  // Synchroniser le thème Vuetify avec le store
  theme.global.name.value = themeStore.isDark ? 'darkTheme' : 'lightTheme'
  
  // Écouter les changements de thème
  window.addEventListener('theme-changed', ((event: CustomEvent) => {
    theme.global.name.value = event.detail.isDark ? 'darkTheme' : 'lightTheme'
  }) as EventListener)
})
</script>
