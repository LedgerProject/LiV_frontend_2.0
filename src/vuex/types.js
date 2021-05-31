const mutations = {
  // auth
  SET_JWT_TOKEN: 'SET_JWT_TOKEN',

  // account
  SET_ACCOUNT: 'SET_ACCOUNT',
}

const actions = {
  // auth
  LOAD_JWT_TOKEN: 'LOAD_JWT_TOKEN',

  // account
  VERIFY_JWT: 'VERIFY_JWT',
  LOAD_ACCOUNT: 'LOAD_ACCOUNT',
}

const getters = {
  // root
  isLoggedIn: 'isLoggedIn',

  // auth
  jwtToken: 'jwtToken',

  // account
  account: 'account',
  isKycExist: 'isKycExist',
  isAccountGeneral: 'isAccountGeneral',
  isAccountNotary: 'isAccountNotary',
  isAccountRegistry: 'isAccountRegistry',
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters,
}
