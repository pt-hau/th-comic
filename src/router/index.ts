import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'
import ReadView from '@/views/ReadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/types',
      name: 'types',
      component: HomeView
    },
    {
      path: '/genres',
      name: 'genres',
      component: HomeView
    },
    {
      path: '/newest',
      name: 'newest',
      component: HomeView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
    },
    {
      path: '/read/:slug/chapter/:id',
      name: 'read',
      component: ReadView,
      meta: { layout: 'ReadLayout' }
    }
  ]
})

export default router
