import AppContent from '@/AppContent'
import Auth from '@/vue/pages/Auth'
import Login from '@/vue/pages/Login'
import SignUpKyc from '@/vue/pages/SignUpKyc'
import SignUp from '@/vue/pages/SignUp'
import Profile from '@/vue/pages/Profile'
import WillRequests from '@/vue/pages/WillRequests/WillRequests'
import WillRequestsList from '@/vue/pages/WillRequests/WillRequestsList'
import WillRequestsDetails from '@/vue/pages/WillRequests/WillRequestsDetails'

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
      {
        path: '/sign-up',
        name: vueRoutes.signUp.name,
        component: SignUp,
        beforeEnter: authPageGuard,
      },
      {
        path: '/sign-up-kyc',
        name: vueRoutes.signUpKyc.name,
        component: SignUpKyc,
        beforeEnter: authPageGuard,
      },
    ],
  },
  {
    path: '/',
    name: vueRoutes.app.name,
    meta: { isNavigationRendered: true },
    redirect: vueRoutes.willRequests,
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
          {
            path: '/will-requests/:id',
            name: vueRoutes.willRequestsDetails.name,
            component: WillRequestsDetails,
            beforeEnter: inAppRouteGuard,
            props: true,
          },
        ],
      },
      {
        path: '/profile',
        name: vueRoutes.profile.name,
        beforeEnter: inAppRouteGuard,
        component: Profile,
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
  const isKycExist = store.getters[vuexTypes.isKycExist]

  if (to.name === vueRoutes.signUpKyc.name) {
    isLoggedIn && !isKycExist ? next() : next(vueRoutes.signUp)
  } else if (to.name === vueRoutes.signUp.name) {
    isLoggedIn && !isKycExist ? next(vueRoutes.signUpKyc) : next()
  } else {
    isLoggedIn && isKycExist ? next(vueRoutes.app) : next()
  }
}

function inAppRouteGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  const isKycExist = store.getters[vuexTypes.isKycExist]
  if (isLoggedIn && isKycExist) {
    next()
  } else {
    next(vueRoutes.login)
  }
}

export default router
export { vueRoutes }
