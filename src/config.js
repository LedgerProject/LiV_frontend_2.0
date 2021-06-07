import packageJson from '../package.json'

export const CONFIG = Object.freeze({
  APP_NAME: 'LIV - Portal',

  STORAGE_KEY: 'liv-storage',

  SIGN_UP_REDIRECT_URL: 'http://livpoc.com/index_encuesta.php',

  BUILD_VERSION: packageJson.version,
})
