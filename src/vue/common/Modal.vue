<template>
  <transition name="modal-transition">
    <div class="modal" v-if="isShown">
      <div
        class="modal__backdrop"
        @click.stop="closeByClickOutside ? closeSelf() : ''"
      />
      <div
        class="modal__pane"
        :style="{ 'width': width + 'rem' }"
        @click.stop
      >
        <div class="modal__head">
          <h2 class="modal__heading">
            <slot name="heading" />
          </h2>
          <button
            type="button"
            class="modal__close-btn"
            @click.stop="closeSelf"
          >
            <i class="modal__close-icon mdi mdi-close" />
          </button>
        </div>
        <div class="modal__body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ScrollUtil } from '@/js/utils/scroll.util'

/**
 * Modal component serves as a wrapper for modal content.
 *
 * To use it pass your content as a slot inside and sync it's prop with the
 * data field in your parent component:
 *
 * <modal v-model:is-shown="isShown">
 *     <template slot="heading">
 *        Modal heading
 *     </template>
 *    <content>
 * </modal>
 *
 * As long as `isShown` is `true`, your content will be displayed.
 */

export default {
  name: 'modal',

  props: {
    isShown: { type: Boolean, default: false },

    closeByClickOutside: { type: Boolean, default: true },

    width: { type: [String, Number], default: 55 },
  },

  emits: ['update:isShown', 'close'],

  watch: {
    isShown (isShown) {
      return isShown ? ScrollUtil.disableScroll() : ScrollUtil.enableScroll()
    },
  },

  methods: {
    closeSelf () {
      this.$emit('update:isShown', false)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
@import '~@/scss/mixins';
@import '~@/scss/variables';

$modal-side-padding: 2.5rem;
$modal-close-btn-size: 3rem;

.modal {
  z-index: $z-modal;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
}

.modal__backdrop {
  position: absolute;
  z-index: $z-modal-backdrop;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $col-modal-backdrop-bg;
}

.modal__head {
  flex: 1;
  width: clamp(100%, 100%, 100%);
  min-height: 6.5rem;
  max-height: 6.5rem;
  border-radius: 1.6rem 1.6rem 0 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem $modal-side-padding;
  background: $col-modal-head-bg;
  transition: border-radius 0.13s ease-in;

  @include respond-to(small) { padding: 5rem $modal-side-padding; }
}

.modal__heading {
  font-size: 2.3rem;
  font-weight: 400;
  width: 90%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: $col-modal-head-text;
  text-align: left;

  @include respond-to(small) { font-size: 3.4rem; }
}

.modal__pane {
  background: $col-modal-bg;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  border-radius: 1.6rem;
  align-items: center;
  overflow: hidden auto;

  @include respond-to(small) {
    /* stylelint-disable declaration-no-important */
    width: 100vw !important;
    /* stylelint-enable declaration-no-important */
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
}

.modal__body {
  flex: 1;
  height: 100%;
  width: 100%;
  padding: 3rem $modal-side-padding;
  overflow-x: hidden;
  overflow-y: auto;

  @include respond-to(small) { padding: 4rem $modal-side-padding 10rem; }
}

.modal__close-icon {
  font-size: 2rem;
  color: $col-modal-head-text;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.1rem;
}

.modal__close-btn {
  padding: 0;
  width: $modal-close-btn-size;
  height: $modal-close-btn-size;
  min-width: $modal-close-btn-size;

  &:active {
    & > .modal__close-icon {
      color: $col-modal-btn-color-active;
      transform: scale(0.9);
    }
  }

  &:not([disabled]):hover {
    background: $col-modal-btn-color-hover-bg;
    border-radius: 100%;
  }
}

.modal-transition-enter-active {
  animation-duration: 0.2s;

  /* stylelint-disable selector-nested-pattern */
  & > .modal__backdrop {
    animation: modal-backdrop-keyframes 0.2s ease-in-out;
  }

  & > .modal__pane {
    animation: modal-pane-keyframes 0.2s ease-in-out;
  }
  /* stylelint-enable selector-nested-pattern */
}

.modal-transition-leave-active {
  animation-duration: 0.13s;

  /* stylelint-disable selector-nested-pattern */
  & > .modal__backdrop {
    animation: modal-backdrop-keyframes 0.2s ease-in-out reverse;
  }

  & > .modal__pane {
    animation: modal-pane-keyframes 0.2s ease-in-out reverse;
  }
  /* stylelint-enable selector-nested-pattern */
}

@keyframes modal-backdrop-keyframes {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modal-pane-keyframes {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
