<template>
  <div
    class="logo-viewer__wrapper"
    :style="{
      'width': `${size}rem`,
      'min-width': `${size}rem`,
      'height': `${size}rem`
    }"
  >
    <img
      v-if="logoUrl"
      :src="logoUrl"
      class="logo-viewer logo-viewer--image"
    >
    <p
      v-else
      class="logo-viewer logo-viewer--abbr"
      :style="{ 'font-size': `${size / 2}rem` }"
    >
      {{ twoCharsTitle }}
    </p>
  </div>
</template>

<script>
import { abbreviate } from '@/vue/filters/abbreviate'

export default {
  name: 'logo-viewer',

  props: {
    logoUrl: { type: String, default: '' },

    title: { type: String, default: 'title' },

    darkMode: { type: Boolean, default: false },

    isSmall: { type: Boolean, default: false },

    size: { type: [Number, String], default: 5 },
  },

  computed: { twoCharsTitle () { return abbreviate(this.title).substr(0, 2) } },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

.logo-viewer__wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
}

.logo-viewer {

  &--image {
    display: block;
    align-self: center;
    width: 100%;
    object-fit: cover;
  }

  &--abbr {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: $col-logo-viewer-background;
    color: $col-logo-viewer-text;
  }
}
</style>
