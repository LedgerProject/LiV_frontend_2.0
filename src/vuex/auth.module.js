import { vuexTypes } from '@/vuex/types'
import { api } from '@api'

export const state = { jwtToken: '' }

export const mutations = {
  [vuexTypes.SET_JWT_TOKEN] (state, token) { state.jwtToken = token },
}

export const actions = {
  async [vuexTypes.LOAD_JWT_TOKEN] ({ commit }, { email, password }) {
    const { data } = await api.post('/users/login', {
      email: email,
      password: password,
    })

    commit(vuexTypes.SET_JWT_TOKEN, data)
  },
}

export const getters = { [vuexTypes.jwtToken]: state => state.jwtToken }

export default {
  state,
  mutations,
  actions,
  getters,
}
