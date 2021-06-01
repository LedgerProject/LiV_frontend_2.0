import { createStore } from 'vuex'
import { vuexTypes } from '@/vuex/types'
import { sessionStoragePlugin } from '@/vuex/plugins/session-storage'

import auth from '@/vuex/auth.module'
import account from '@/vuex/account.module'
import isEmpty from 'lodash/isEmpty'

export const rootModule = {
  mutations: {
    [vuexTypes.POP_STATE] () {},
    [vuexTypes.CLEAR_STATE] () {},
  },
  actions: {
    async [vuexTypes.LOG_OUT] ({ commit }) { commit(vuexTypes.CLEAR_STATE) },
    async [vuexTypes.LOG_IN] ({ getters, dispatch }, { email, password }) {
      await dispatch(vuexTypes.LOAD_JWT_TOKEN, { email, password })
      await dispatch(vuexTypes.LOAD_ACCOUNT, getters[vuexTypes.jwtToken])
    },
  },
  getters: {
    [vuexTypes.isLoggedIn]: (_, getters) =>
      !isEmpty(getters[vuexTypes.account]),
  },
}

export const store = createStore({
  ...rootModule,
  modules: { auth, account },
  plugins: [sessionStoragePlugin],
})

store.commit(vuexTypes.POP_STATE)

export { vuexTypes } from './types'
