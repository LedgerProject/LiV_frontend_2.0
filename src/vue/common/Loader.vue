<template>
  <div
    class="loader"
    :class="{ 'loader--position-center': positionCenter }"
  >
    <div class="loader__animation" />
    <div v-if="message" class="loader__message">
      <template v-if="message">
        {{ message }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader',

  props: {
    message: { type: String, default: '' },

    positionCenter: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss">
@import '~@/scss/variables';

.loader {
  display: flex;
  align-items: center;

  &--position-center { justify-content: center; }
}

.loader__message {
  color: $col-loader-text;
  font-weight: 400;
}

.loader__animation {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: relative;
  margin-right: 0.5rem;

  &:after,
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 3rem;
    height: 3rem;
    border: 0.5rem solid transparent;
    border-bottom: 0.5rem solid $col-loader-icon;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
  }

  &:before {
    width: 4rem;
    height: 4rem;
    animation-direction: reverse;
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }

  to { transform: rotate(360deg); }
}
</style>
