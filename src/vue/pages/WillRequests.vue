<template>
  <div class="will-requests">
    <router-view v-slot="{ Component }">
      <transition
        name="will-requests-transition"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default { name: 'will-requests' }
</script>

<style lang="scss" scoped>
.will-requests-transition-enter-active {
  animation: will-requests-transition 0.35s ease-in-out;
}

.will-requests-transition-leave-active {
  animation: will-requests-transition 0.35s ease-in-out reverse;
}

@keyframes will-requests-transition {
  0% { opacity: 0.25; }

  100% { opacity: 1; }
}
</style>
