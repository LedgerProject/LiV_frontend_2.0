<template>
  <div
    class="loading-error-message"
    :class="{ 'loading-error-message--position-center': positionCenter }"
  >
    <i
      :class="`mdi mdi-${iconName}`"
      class="loading-error-message__icon"
    />
    <h2 class="loading-error-message__title">
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        {{ $t('loading-failed-title') }}
      </template>
    </h2>
    <p class="loading-error-message__description">
      {{ $t('loading-failed', { msg: message }) }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'loading-error-message',

  props: {
    iconName: { type: String, default: 'alert-outline' },

    title: { type: String, default: '' },

    message: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

.loading-error-message {
  text-align: center;
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 0.8rem;
}

.loading-error-message__description {
  color: $col-loading-error-message-description;
}

.loading-error-message__title {
  margin-bottom: 0.8rem;
  color: $col-loading-error-message-text;
}

.loading-error-message__icon {
  color: $col-loading-error-message-icon-color;
  font-size: 7.4rem;
}
</style>

<i18n>
{
  "en": {
    "loading-failed": "Loading failed with error { msg }",
    "loading-failed-title": "Error"
  }
}
</i18n>
