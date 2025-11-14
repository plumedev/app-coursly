import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import RouteName from './RouteName'

// Déclaration TypeScript simple pour les métadonnées de route
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.SHOPPING_LIST,
    component: () => import('@/views/shopping-list-view/ShoppingListView.vue'),
    meta: {
      title: 'Liste de Courses'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard simple pour les titres de page
router.beforeEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} - Vue Starter Kit`
  }
  return true
})

export default router
