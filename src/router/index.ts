import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import info from '@/views/Info.vue'
import Final from '@/views/Final.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/info',
      name: 'info',
      component: info,
    },
    {
      path: '/final',
      name: 'final',
      component: Final,
    },
  ],
})

export default router
