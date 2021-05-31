import AppContent from '@/AppContent'
import Auth from '@/vue/pages/Auth'
import Login from '@/vue/pages/Login'
import WillRequests from '@/vue/pages/WillRequests'
import WillRequestsList from '@/vue/pages/WillRequestsList'

import { createRouter, createWebHistory } from 'vue-router'
import { vueRoutes } from '@/vue-router/routes'
import { store, vuexTypes } from '@/vuex'

import NProgress from 'nprogress'

const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: vueRoutes.app,
  },
  {
    path: '/auth',
    name: vueRoutes.auth.name,
    component: Auth,
    redirect: vueRoutes.login,
    children: [
      {
        path: '/sign-in',
        name: vueRoutes.login.name,
        component: Login,
        beforeEnter: authPageGuard,
      },
    ],
  },
  {
    path: '/',
    name: vueRoutes.app.name,
    component: AppContent,
    beforeEnter: inAppRouteGuard,
    children: [
      {
        path: '/will-requests',
        name: vueRoutes.willRequests.name,
        component: WillRequests,
        redirect: vueRoutes.willRequestsList,
        beforeEnter: inAppRouteGuard,
        children: [
          {
            path: '/will-requests/list',
            name: vueRoutes.willRequestsList.name,
            component: WillRequestsList,
            beforeEnter: inAppRouteGuard,
          },
        ],
      },
    ],
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

function authPageGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  isLoggedIn ? next(vueRoutes.app) : next()
}

function inAppRouteGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  if (isLoggedIn) {
    next()
  } else {
    next(vueRoutes.login)
  }
}

export default router
