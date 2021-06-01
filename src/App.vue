<template>
  <template v-if="isAppInitialised">
    <template v-if="isLoggedIn && isNavigationRendered">
      <div class="app__container">
        <sidebar />
        <div class="app__main-content">
          <div class="app__navbar"/>
          <div class="app__main">
            <router-view v-slot="{ Component }">
              <transition
                name="app-transition"
                mode="out-in"
              >
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <router-view v-slot="{ Component }">
        <transition
          name="auth-transition"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </template>

    <status-message />
  </template>
</template>

<script>
import StatusMessage from '@/vue/common/StatusMessage'
import Sidebar from '@/vue/navigation/Sidebar'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { vuexTypes } from '@/vuex/types'
import { computed, ref } from 'vue'
import { CONFIG } from '@/config'

export default {
  name: 'app',

  components: { StatusMessage, Sidebar },

  setup () {
    const route = useRoute()
    const store = useStore()
    const isAppInitialised = ref(false)

    const isLoggedIn = computed(() => store.getters[vuexTypes.isLoggedIn])
    const jwtToken = computed(() => store.getters[vuexTypes.jwtToken])
    const isNavigationRendered = computed(
      () => route.matched.some(r => r.meta.isNavigationRendered),
    )

    const initApp = async () => {
      try {
        if (isLoggedIn.value) {
          await store.dispatch(vuexTypes.LOAD_ACCOUNT, jwtToken.value)
        }
        isAppInitialised.value = true
        document.title = CONFIG.APP_NAME
      } catch (e) {
        ErrorHandler.process(e)
      }
    }

    initApp()

    return { isAppInitialised, isNavigationRendered, isLoggedIn }
  },
}
</script>

<style lang="scss" scoped>
.app__container {
  display: flex;
  align-items: stretch;
  overflow: hidden;
  flex: 1;
}

.app__main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app__main {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
}

.app-transition-enter-active {
  animation: app-transition 0.35s ease-in-out;
}

.app-transition-leave-active {
  animation: app-transition 0.35s ease-in-out reverse;
}

@keyframes app-transition {
  0% { filter: blur(1rem); }

  100% { filter: blur(0); }
}

.auth-transition-enter-active {
  animation: auth-transition 0.15s ease-in-out;
}

.auth-transition-leave-active {
  animation: auth-transition 0.15s ease-in-out reverse;
}

@keyframes auth-transition {
  0% {
    opacity: 0;
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
