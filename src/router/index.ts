import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'
import ReadView from '@/views/ReadView.vue'
import NewView from '@/views/NewView.vue'
import IsEeleasingView from '@/views/IsEeleasingView.vue'
import CompleteView from '@/views/CompleteView.vue'
import CategoryView from '@/views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'trang-chu',
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
      name: 'chi-tiet',
      component: DetailView,
    },
    {
      path: '/truyen-moi',
      name: 'truyen-moi',
      component: NewView,
    },
    {
      path: '/dang-phat-hanh',
      name: 'dang-phat-hanh',
      component: IsEeleasingView,
    },
    {
      path: '/hoan-thanh',
      name: 'hoan-thanh',
      component: CompleteView,
    },
    {
      path: '/the-loai/:id',
      name: 'the-loai',
      component: CategoryView,
    },
    {
      path: '/doc/:slug/chuong/:id',
      name: 'doc',
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
