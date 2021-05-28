import '@/scss/app.scss'

import App from '@/App.vue'
import router from '@/vue-router'

import { store } from '@/vuex'
import { vueRoutes } from '@/vue-router/routes'
import { i18n } from '@/i18n'
import { ripple } from '@/vue/directives/ripple'
import { createApp, h, getCurrentInstance } from 'vue'
import { useFormatDate } from '@/vue/composables'
import { ErrorHandler } from '@/js/helpers/error-handler'

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

    app.appContext.config.globalProperties.$fd = formatDate
    app.appContext.config.globalProperties.$fddmy = formatDateDMY
    app.appContext.config.globalProperties.$fddmyt = formatDateDMYT
    app.appContext.config.globalProperties.$fcalend = formatCalendar
    app.appContext.config.globalProperties.$fcalendi = formatCalendarInline
  },
  render: () => h(App),
})

app
  .use(store)
  .use(router)
  .use(i18n)

app.config.globalProperties.$routes = vueRoutes

app.directive('ripple', ripple)

app.config.errorHandler = error => { ErrorHandler.process(error) }

app.mount('#app')
