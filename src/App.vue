<template>
  <div class="app__container">
    <div class="app__main-content">
      <div class="app__navbar"/>
      <div class="app__main">
        <div class="app__main-sidebar"/>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss" scoped>
.app__container {
  display: flex;
  align-items: stretch;
  overflow-x: hidden;
  flex: 1;
}

.app__main-content {
  flex: 1;
  overflow: hidden;
}

.app__main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
