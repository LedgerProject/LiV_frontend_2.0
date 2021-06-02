<template>
  <header class="app-header">
    <div class="app-header__account-button-wrapper">
      <button
        v-ripple
        type="button"
        class="app-header__account-button"
        :aria-label="$t('account')"
        :title="$t('account')"
        @click="openDropdown"
      >
        <i class="app-header__account-button-icon mdi mdi-account" />
        {{ accountEmail }}
      </button>
      <transition name="app-header__dropdown-transition">
        <div
          v-if="isDropdownShown"
          v-click-away="closeDropdown"
          class="app-header__dropdown"
        >
          <router-link
            v-ripple
            class="app-header__dropdown-button"
            :to="$routes.profile"
            :title="$t('profile')"
            :aria-label="$t('profile')"
            @click="closeDropdown"
          >
            {{ $t('profile') }}
            <i class="app-header__dropdown-button-icon mdi mdi-account" />
          </router-link>
          <button
            v-ripple
            type="button"
            class="app-header__dropdown-button"
            :title="$t('log-out')"
            :aria-label="$t('log-out')"
            @click="logout"
          >
            {{ $t('log-out') }}
            <i class="app-header__dropdown-button-icon mdi mdi-account" />
          </button>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'
import { ref, computed } from 'vue'

export default {
  name: 'app-header',

  setup () {
    const store = useStore()
    const isDropdownShown = ref(false)

    const closeDropdown = () => { isDropdownShown.value = false }

    const openDropdown = event => {
      const buttonElement = event.target
      buttonElement.blur()
      isDropdownShown.value = true
    }

    const logout = async () => {
      closeDropdown()
      await store.dispatch(vuexTypes.LOG_OUT)
    }

    return {
      openDropdown,
      closeDropdown,
      logout,
      isDropdownShown,
      accountEmail: computed(() => store.getters[vuexTypes.account].email),
    }
  },
}

</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

$app-header-button-height: 4rem;

.app-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: $app-sidebar-logo-height;
  padding: 0 2rem;
  border-bottom: $col-app-footer-border;
  background: $col-app-footer-background;
}

.app-header__account-button-wrapper {
  position: relative;
}

.app-header__account-button {
  padding: 0 1.6rem;
  font-size: 1.4rem;
  height: $app-header-button-height;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.1rem;
  min-height: 4rem;
  border-radius: 0.4rem;
  transition: background-color 0.2s ease-in-out;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: $col-app-header-account-btn-hover;
  }
}

.app-header__dropdown {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: $app-header-button-height + 0.2rem;
  left: 0;
  box-shadow: $col-app-header-dropdown-shadow;
  border-radius: 0.4rem;
  padding: 1.6rem;
  background-color: $col-app-header-dropdown;
}

.app-header__dropdown-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 1rem;
  text-transform: none;
  color: $col-app-header-text;

  &:not(:first-child) { margin-top: 1rem; }

  &:not([disabled]):hover,
  &:not([disabled]):focus,
  &.router-link-active {
    background-color: $col-app-header-account-btn-hover;
  }
}

.app-header__dropdown-button-icon { font-size: 1.7rem; }

.app-header__dropdown-transition-enter-active {
  animation: app-header-dropdown-transition 0.15s ease-in-out;
}

.app-header__dropdown-transition-leave-active {
  animation: app-header-dropdown-transition 0.15s ease-in-out reverse;
}

@keyframes app-header-dropdown-transition {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<i18n>
{
  "en": {
    "account": "Account",
    "profile": "Profile",
    "log-out": "Log out"
  }
}
</i18n>
