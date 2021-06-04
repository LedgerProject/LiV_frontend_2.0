<template>
  <div
    class="app-dropdown"
    ref="appDropdown"
    v-click-outside="closeDropdown"
  >
    <div class="app-dropdown__pane">
      <button
        type="button"
        class="app-dropdown__button"
        :title="$t('open-dropdown-title')"
        :aria-label="$t('open-dropdown-title')"
        @click.prevent="toggleDropdown"
        :disabled="disabled"
      >
        <slot name="header">
          <i class="app-dropdown__icon mdi mdi-dots-vertical" />
        </slot>
      </button>
      <transition name="app-dropdown__wrapper">
        <div
          v-if="isDropdownOpen"
          class="app-dropdown__wrapper"
          :style="{ top, left }"
          @click.prevent="toggleDropdown"
        >
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',

  props: { disabled: { type: Boolean, default: false } },

  data: _ => ({
    isDropdownOpen: false,
    resizeHandlerDestructor: () => { },
    top: '',
    left: '',
  }),

  created () {
    this.resizeHandlerDestructor = () => {
      window.removeEventListener('resize', this.setDropdownWrapperCoordinates)
    }

    window.addEventListener('resize', this.setDropdownWrapperCoordinates)
  },

  beforeUnmount () { this.resizeHandlerDestructor() },

  methods: {
    toggleDropdown () {
      this.isDropdownOpen ? this.closeDropdown() : this.openDropdown()
    },

    openDropdown () {
      this.isDropdownOpen = true

      this.$nextTick(() => { this.setDropdownWrapperCoordinates() })
    },

    closeDropdown () { this.isDropdownOpen = false },

    setDropdownWrapperCoordinates () {
      if (!this.isDropdownOpen) return
      const dropdown = this.$refs.appDropdown
      const dropdownWrapper = dropdown.querySelector('.app-dropdown__wrapper')

      const offset = this.getOffset(dropdown)
      this.top = offset.top + 'px'
      this.left = offset.left - dropdownWrapper.offsetWidth + 'px'
    },

    getOffset (el) {
      const rect = el.getBoundingClientRect()

      return {
        left: rect.left + rect.width + window.scrollX,
        top: rect.top + window.scrollY,
      }
    },
  },
}
</script>

<style lang="scss">
@import '~@scss/variables';

.dropdown { width: 100%; }

.app-dropdown__wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: $col-dropdown-bg;
  min-width: 14rem;
  padding: 1.6rem 0.8rem;
  z-index: $z-dropdown;
  border: none;
  border-radius: 0.4rem;
  box-shadow: $col-dropdown-shadow;
}

.app-dropdown__button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  text-align: center;
  min-height: 2.5rem;
  background-color: transparent;
  border-radius: 100%;
  padding: 0.5rem;
  min-width: 2.5rem;
  box-sizing: content-box;
  transition: background-color 0.15s ease-in-out;

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(100%);
  }

  &:not([disabled]):hover { background: $col-dropdown-button-hover; }
}

.app-dropdown__icon {
  font-size: 2rem;
  color: $col-dropdown-icon;
}

.app-dropdown__wrapper button {
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 1rem;
  color: $col-app-header-text;
  font-weight: 700;
  text-transform: uppercase;
  min-width: 14rem;
  transition:
    opacity 0.15s ease-in-out,
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out;

  &:not(:first-child) { margin-top: 1rem; }

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    opacity: 1;
    color: $col-dropdown-text-active;
    background-color: $col-dropdown-option-active;
  }

  & > i.mdi { font-size: 2rem; }
}

.app-dropdown__wrapper > :not(:first-child) {
  margin-top: 0.8rem;
}

.app-dropdown__wrapper-enter-active {
  animation: app-dropdown__wrapper-keyframes 0.2s ease;
  animation-fill-mode: both;
}

.app-dropdown__wrapper-leave-active {
  animation: app-dropdown__wrapper-keyframes 0.2s ease reverse;
  animation-fill-mode: both;
}

@keyframes app-dropdown__wrapper-keyframes {
  0% { opacity: 0; }

  100% { opacity: 1; }
}
</style>

<i18n>
{
  "en": {
    "open-dropdown-title": "Open"
  }
}
</i18n>
