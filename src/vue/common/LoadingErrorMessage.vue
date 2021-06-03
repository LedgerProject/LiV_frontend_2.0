<template>
  <div
    class="loading-error-message"
    :class="{ 'loading-error-message--position-center': positionCenter }"
  >
    <p class="loading-error-message__message">
      {{ $t('loading-failed', { msg: message }) }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'loading-error-message',

  props: {
    message: { type: String, default: '' },
    positionCenter: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>
.loading-error-message {
  display: flex;
  align-items: center;

  &--position-center { justify-content: center; }
}
</style>

<i18n>
{
  "en": {
    "loading-failed": "Loading failed with error { msg }"
  }
}
</i18n>
