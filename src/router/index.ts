import { createRouter, createWebHashHistory } from 'vue-router'

const getHomePage = () => import('@/views/HomePage.vue')
const getRecordPage = () => import('@/views/RecordPage.vue')

const router = createRouter({
  history: createWebHashHistory(),
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
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home'
    }
  ]
})

export default router