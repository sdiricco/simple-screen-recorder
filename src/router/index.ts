import { createRouter, createWebHistory } from 'vue-router'

const getHomePage = () => import('@/views/HomePage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home-page',
      component: getHomePage,

    }
  ]
})

export default router