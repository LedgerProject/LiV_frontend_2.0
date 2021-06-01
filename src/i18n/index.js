import { createI18n } from 'vue-i18n'

const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE = 'en'

const locale = localStorage && localStorage.getItem(STORAGE_KEY)
  ? localStorage.getItem(STORAGE_KEY)
  : DEFAULT_LOCALE

const i18n = createI18n({
  locale,
  fallbackLocale: locale,
  silentFallbackWarn: true,
  messages: {
    ...require('./resources.js').default,
  },
})

// Hot module replacement
if (module.hot) {
  module.hot.accept(['./resources.js'], function () {
    const resources = require('./resources.js').default

    i18n.setLocaleMessage('en', resources.en)
  })
}

export { i18n }
