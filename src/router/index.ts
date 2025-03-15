import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'
import ReadView from '@/views/ReadView.vue'
import StatusView from '@/views/StatusView.vue'
import TypeView from '@/views/TypeView.vue'

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
      path: '/chi-tiet/:id',
      name: 'detail',
      component: DetailView,
    },
    {
      path: '/truyen-moi',
      name: 'truyen moi',
      component: StatusView,
    },
    {
      path: '/dang-phat-hanh',
      name: 'dang phat hanh',
      component: StatusView,
    },
    {
      path: '/hoan-thanh',
      name: 'hoan thanh',
      component: StatusView,
    },
    {
      path: '/the-loai/:id',
      name: 'the loai',
      component: TypeView,
    },
    {
      path: '/doc/:slug/chuong/:id',
      name: 'read',
      component: ReadView,
      meta: { layout: 'ReadLayout' }
    },
    {
      path: '/:pathMatch(.*)*', 
      redirect: '/'
    }

  ]
})

export default router
