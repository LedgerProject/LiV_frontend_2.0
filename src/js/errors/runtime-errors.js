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

export class WrongCredentialsError extends Error {
  constructor (message, ...params) {
    super(...params)
    this.name = 'Wrong email or password'
    this.message = message
  }
}
