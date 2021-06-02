<template>
  <router-link
    v-ripple
    class="logo"
    :to="$routes.willRequests"
    :style="{
      'width': `${size}rem`,
      'min-width': `${size}rem`,
      'height': `${size}rem`
    }"
  >
    <img
      class="logo__img"
      src="/static/branding/logo.png"
      :alt="$config.APP_NAME"
    >
  </router-link>
</template>

<script>

export default {
  name: 'logo',

  props: { size: { type: [Number, String], default: 5 } },
}
</script>

<style lang="scss">
.logo {
  border-radius: 100%;
  overflow: hidden;
}

.logo__img {
  display: block;
  width: 100%;
}
</style>
