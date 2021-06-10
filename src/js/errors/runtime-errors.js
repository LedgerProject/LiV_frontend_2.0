/**
  * Network error
  */
export class NetworkError extends Error {
  constructor (message, ...params) {
    super(...params)
    this.name = 'NetworkError'
    this.message = message
  }
}

/**
  * Wrong credentials error
  */
export class WrongCredentialsError extends Error {
  constructor (message, ...params) {
    super(...params)
    this.name = 'Wrong email or password'
    this.message = message
  }
}

/**
  * User exist error
  */
export class UserExistsError extends Error {
  constructor (message, ...params) {
    super(...params)
    this.name = 'User exists'
    this.message = message
  }
}
