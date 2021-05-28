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
