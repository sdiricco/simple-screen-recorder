import { createRouter, createWebHistory } from 'vue-router'

const getHomePage = () => import('@/views/HomePage.vue')
const getRecordPage = () => import('@/views/RecordPage.vue')

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
    },
    {
      path: '/record',
      name: 'record-page',
      component: getRecordPage,
    }
  ]
})

export default router