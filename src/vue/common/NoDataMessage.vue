<template>
  <div
    class="no-data-message"
    :class="{ 'no-data-message--center': center }"
  >
    <i
      :class="`mdi mdi-${iconName}`"
      class="no-data-message__icon"
    />
    <h2 class="no-data-message__title">
      {{ title }}
    </h2>
    <p class="no-data-message__message">
      {{ message }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'no-data-message',

  props: {
    iconName: { type: String, default: 'trending-up' },

    title: { type: String, required: true },

    message: { type: String, required: true },

    center: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss">
@import '~@/scss/variables';

.no-data-message {
  max-width: 52rem;
  padding: 0;

  &--center {
    margin: 0 auto;
    text-align: center;
    padding: 0 0.8rem;
  }
}

.no-data-message__title { margin-bottom: 0.8rem; }

.no-data-message__title,
.no-data-message__message { color: $col-no-data-message-text; }

.no-data-message__icon {
  color: $col-no-data-message-icon-color;
  font-size: 6.4rem;
}
</style>
