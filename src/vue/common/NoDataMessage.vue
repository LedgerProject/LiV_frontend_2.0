<template>
  <div
    class="no-data-message"
    :class="{ 'no-data-message--center': center }"
  >
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

.no-data-message__title {
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
}

.no-data-message__message {
  font-size: 1.2rem;
}

.no-data-message__title,
.no-data-message__message {
  color: $col-no-data-message-text;
}
</style>
