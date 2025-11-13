import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './plugins/i18n'
import { vuetify } from './plugins/vuetify'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia()).use(router).use(i18n).use(vuetify)

app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, 'Vue instance:', instance, 'Error info:', info)
}

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason)
  event.preventDefault()
  return false
})

app.mount('#app')
