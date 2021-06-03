import '@/scss/app.scss'

import App from '@/App.vue'
import router from '@/vue-router'

import AppButton from '@/vue/common/AppButton'

import { store } from '@/vuex'
import { vueRoutes } from '@/vue-router/routes'
import { CONFIG } from '@/config'
import { i18n } from '@/i18n'
import { ripple } from '@/vue/directives/ripple'
import { createApp, h, getCurrentInstance } from 'vue'
import { useFormatDate, useGlobalizeUserRole } from '@/vue/composables'
import { ErrorHandler } from '@/js/helpers/error-handler'

import VueClickAway from 'vue3-click-away'
import Maska from 'maska'

const app = createApp({
  setup () {
    const app = getCurrentInstance()

    const {
      formatDate,
      formatDateDMY,
      formatDateDMYT,
      formatCalendar,
      formatCalendarInline,
    } = useFormatDate()

    const { globalizeUserRole } = useGlobalizeUserRole()

    /* eslint-disable max-len */
    app.appContext.config.globalProperties.$fd = formatDate
    app.appContext.config.globalProperties.$fddmy = formatDateDMY
    app.appContext.config.globalProperties.$fddmyt = formatDateDMYT
    app.appContext.config.globalProperties.$fcalend = formatCalendar
    app.appContext.config.globalProperties.$fcalendi = formatCalendarInline
    app.appContext.config.globalProperties.$globalizeUserRole = globalizeUserRole
    /* eslint-enable max-len */
  },
  render: () => h(App),
})

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(VueClickAway)
  .use(Maska)

app.config.globalProperties.$routes = vueRoutes
app.config.globalProperties.$config = CONFIG

app.directive('ripple', ripple)

app.component('AppButton', AppButton)

app.config.errorHandler = error => { ErrorHandler.process(error) }

app.mount('#app')
