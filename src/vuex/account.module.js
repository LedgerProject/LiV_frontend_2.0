import { vuexTypes } from '@/vuex/types'
import { api } from '@api'
import { AccountRecord } from '@/js/records/account.record'
import { USER_ROLES } from '@/js/const/user-roles.const'

export const state = { account: {} }

export const mutations = {
  [vuexTypes.SET_ACCOUNT] (state, account) { state.account = account },
}

export const actions = {
  async [vuexTypes.VERIFY_JWT] ({ commit }, jwt) {
    const { data } = await api.post('/users/verifyJWT', { jwt })
    return data
  },

  async [vuexTypes.LOAD_ACCOUNT] ({ commit, dispatch }, token) {
    const verifyJwtResponse = await dispatch(vuexTypes.VERIFY_JWT, token)
    const { data } = await api.get(`/users/${verifyJwtResponse.user_id}`)

    commit(vuexTypes.SET_ACCOUNT, new AccountRecord({
      ...data,
      ...verifyJwtResponse,
    }))
  },
}
export const getters = {
  [vuexTypes.account]: state => state?.account,

  [vuexTypes.accountId]: state => state?.account?.id,

  [vuexTypes.accountEmail]: state => state?.account?.email,

  [vuexTypes.isAccountGeneral]: (_, getters) =>
    +getters[vuexTypes.account]?.role === USER_ROLES.general,

  [vuexTypes.isAccountNotary]: (_, getters) =>
    +getters[vuexTypes.account]?.role === USER_ROLES.notary,

  [vuexTypes.isAccountRegistry]: (_, getters) =>
    +getters[vuexTypes.account]?.role === USER_ROLES.registry,

  [vuexTypes.isKycExist]: (_, getters) =>
    !!getters[vuexTypes.account]?.isKycExist,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
