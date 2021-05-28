import AppContent from '@/AppContent'

import { createRouter, createWebHistory } from 'vue-router'
import { vueRoutes } from '@/vue-router/routes'

import NProgress from 'nprogress'

const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: vueRoutes.app,
  },
  {
    path: '/',
    name: vueRoutes.app.name,
    component: AppContent,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: _ => ({ x: 0, y: 0 }),
})

router.beforeEach(async (to, from, next) => {
  if (to.name !== from.name) NProgress.start()
  next()
})

NProgress.configure({ showSpinner: false })

router.afterEach((to, from) => { NProgress.done() })

export default router
