<template>
  <StyleProvider>
    <v-app>
      <RouterView />
    </v-app>
  </StyleProvider>
</template>

<script lang="ts" setup>
import StyleProvider from './providers/StyleProvider.vue'
</script>
