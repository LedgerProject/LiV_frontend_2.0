<template>
  <div id="app">
    <div class="app__container">
      <div class="app__main-content">
        <div class="app__navbar"/>
        <div class="app__main">
          <div class="app__main-sidebar"/>
          <div class="app__content-wrapper">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'app',
}
</script>
