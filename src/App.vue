<template>
  <div class="app__container">
    <div class="app__main-content">
      <div class="app__navbar"/>
      <div class="app__main">
        <div class="app__main-sidebar"/>
        <router-view />
      </div>
    </div>
  </div>

  <status-message />
</template>

<script>
import StatusMessage from '@/vue/common/StatusMessage'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'
import { computed } from 'vue'

export default {
  name: 'app',

  components: { StatusMessage },

  setup () {
    const store = useStore()
    const isLoggedIn = computed(() => store.getters[vuexTypes.isLoggedIn])
    const jwtToken = computed(() => store.getters[vuexTypes.jwtToken])
    const loadAccount = () => store.actions[vuexTypes.loadAccount]

    const initApp = async () => {
      try {
        if (isLoggedIn.value) await loadAccount(jwtToken)
      } catch (e) {
        ErrorHandler.process(e)
      }
    }

    initApp()
  },
}
</script>

<style lang="scss" scoped>
.app__container {
  display: flex;
  align-items: stretch;
  overflow-x: hidden;
  flex: 1;
}

.app__main-content {
  flex: 1;
  overflow: hidden;
}

.app__main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
