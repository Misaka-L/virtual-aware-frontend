import { createRouter, createWebHistory } from 'vue-router'
import RadarView from '../views/RadarView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import EventView from '../views/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'radar',
      component: RadarView
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView
    },
    {
      path: '/event',
      name: 'event',
      component: EventView
    }
  ]
})

export default router
