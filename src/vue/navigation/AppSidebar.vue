<template>
  <div class="app-sidebar">
    <div
      class="app-sidebar__backdrop"
      :class="{ 'app-sidebar__backdrop--active': isOpened }"
      @click="closeSidebar"
    />

    <button
      class="app-sidebar__burger-btn"
      :class="{ 'app-sidebar__burger-btn--sidebar-active': isOpened }"
      @click="openSidebar"
    >
      <i class="mdi mdi-menu app-sidebar__burger-btn-icon" />
    </button>

    <aside
      class="app-sidebar__aside"
      :class="{ 'app-sidebar__aside--closed': !isOpened }"
    >
      <section class="app-sidebar__logo-section">
        <router-link
          class="app-sidebar__logo-wrapper"
          :to="$routes.app"
          @click="closeSidebar"
          :title="$config.APP_NAME"
        >
          <logo class="app-sidebar__logo" />
          <span class="app-sidebar__logo-app-name">
            {{ $config.APP_NAME }}
          </span>
        </router-link>
      </section>

      <section class="app-sidebar__links-section">
        <nav class="app-sidebar__links-group">
          <router-link
            v-ripple
            class="app-sidebar__link"
            :to="$routes.willRequests"
            :title="$t('will-requests-link')"
            @click="closeSidebar"
          >
            <i class="mdi mdi-format-list-checkbox app-sidebar__link-icon"/>
            {{ $t('will-requests-link') }}
          </router-link>
        </nav>
      </section>
    </aside>
  </div>
</template>

<script>
import Logo from '@/vue/common/Logo'

import { ref } from 'vue'

export default {
  name: 'app-sidebar',

  components: { Logo },

  setup () {
    const isOpened = ref(false)

    const closeSidebar = () => { isOpened.value = false }
    const openSidebar = () => { isOpened.value = true }

    return { isOpened, closeSidebar, openSidebar }
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';
@import '~@scss/mixins';

.app-sidebar {
  position: relative;
  background-color: $col-app-sidebar-background;
  border-right: $col-app-sidebar-border;
  min-height: 100%;
}

.app-sidebar__backdrop {
  @include respond-to($sidebar-hide-bp) {
    position: fixed;
    left: -100%;
    top: 0;
    z-index: $z-app-sidebar-backdrop;
    width: 100%;
    height: 100%;
    background: $col-app-sidebar-backdrop;
    opacity: 0;
    transition: opacity 0.15s $col-app-sidebar-backdrop-animation;
  }
}

.app-sidebar__backdrop--active {
  left: $app-sidebar-width;
  opacity: 1;
  transition: opacity 0.25s $col-app-sidebar-backdrop-animation 0.1s;
}

.app-sidebar__burger-btn {
  position: absolute;
  left: 0.5rem;
  top: 1rem;
  z-index: $z-app-sidebar-burger;
  width: 4rem;
  height: 4rem;
  margin-right: 0;
  margin-left: 0.8rem;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: $col-app-sidebar-burger-button;
  transform: translateX($app-sidebar-width);
  box-shadow: $col-app-sidebar-burger-button-shadow;
  opacity: 0;
  cursor: pointer;
  color: $col-app-sidebar-burger-icon-color;
  transition: opacity 0.15s $col-app-sidebar-backdrop-animation,
    transform 0.25s $col-app-sidebar-backdrop-animation;

  @include respond-to($sidebar-hide-bp) {
    opacity: 1;
    transform: translateX(0);
  }

  &--sidebar-active { transform: translateX($app-sidebar-width); }
}

.app-sidebar__burger-btn-icon {
  display: flex;
  justify-content: center;
  font-size: 2.4rem;
}

.app-sidebar__aside {
  width: $app-sidebar-width;
  min-height: 100%;
  z-index: $z-app-sidebar;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  visibility: visible;

  @include respond-to($sidebar-hide-bp) {
    opacity: 1;
    background-color: $col-app-sidebar-background;
    transition: all 0.25s $col-app-sidebar-backdrop-animation;
  }

  &--closed {
    @include respond-to($sidebar-hide-bp) {
      opacity: 0;
      width: 0;
      max-width: 0;
      visibility: hidden;
    }
  }
}

.app-sidebar__logo-section {
  padding: 0.8rem 1.6rem;
  border-bottom: $col-app-sidebar-border;

  @include respond-to($sidebar-hide-bp) {
    .app-sidebar__aside--closed & { display: none; }
  }
}

.app-sidebar__logo-wrapper {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  grid-gap: 2rem;
  text-decoration: none;
  transition: transform 0.1s;

  &:active { transform: translateY(0.1rem); }
}

.app-sidebar__logo {
  width: 100%;
  height: inherit;
  display: block;
}

.app-sidebar__logo-app-name {
  color: $col-app-sidebar-text;
  font-size: 1.6rem;
  font-weight: 300;
}

.app-sidebar__links-section {
  margin-top: 1.6rem;
  flex: 1;
  padding: 0 0.8rem;

  @include respond-to($sidebar-hide-bp) {
    .app-sidebar__aside--closed & { display: none; }
  }
}

.app-sidebar__links-group {
  margin-bottom: 4rem;

  &:last-child { margin-bottom: 0; }
}

.app-sidebar__link {
  display: grid;
  align-items: center;
  border-radius: 0.4rem;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 1rem;
  min-height: 4rem;
  padding: 0 1rem 0 2rem;
  cursor: pointer;
  color: $col-app-sidebar-text;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.3rem;
  width: 100%;

  &.router-link-active {
    background-color: $col-app-sidebar-active-elem-background;
    pointer-events: none;
  }
}

.app-sidebar__link-icon { font-size: 1.8rem; }
</style>

<i18n>
{
  "en": {
    "will-requests-link": "Will Requests"
  }
}
</i18n>
