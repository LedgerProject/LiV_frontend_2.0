<template>
  <div class="auth">
    <div class="auth__inner-wrapper">
      <div class="auth__logo">
        <img src="/static/branding/logo.png" alt="logo">
      </div>
      <div class="auth__main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'auth' }
</script>

<style lang="scss" scoped>
@import '~@/scss/mixins';
@import '~@/scss/variables';

.auth,
.auth__main,
.auth__logo {
  display: flex;
  flex: 1;
}

.auth__inner-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  padding: 8rem 13rem;
  width: 100%;
  align-items: start;
  grid-column-gap: 2rem;

  @include respond-to(xmedium) {
    grid-template-columns: 100%;
    padding: 8rem 27rem;

    & > .auth__logo { display: none; }
  }
  @include respond-to(medium) { padding: 8rem 10rem; }
  @include respond-to($tablet) { padding: 8rem 5rem; }
  @include respond-to(small) { padding: 5rem 2rem; }
}

.auth__main {
  border-radius: 1.6rem;
  padding: 6.4rem 4rem;

  @include respond-to(small) { padding: 6.4rem 1.4rem; }
}

.auth__logo { margin: auto; }
</style>
