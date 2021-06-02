<template>
  <div class="auth-page login">
    <div class="auth-page__content">
      <h2 class="auth-page__title">
        {{ $t('sign-in') }}
      </h2>
      <p class="auth-page__subtitle">
        {{ $t('sign-in-subtitle') }}
      </p>
      <login-form
        class="auth-page__form"
        @submit="$router.push($routes.willRequests)"
      />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/vue/forms/LoginForm'

export default {
  name: 'login',

  components: { LoginForm },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/auth';
</style>

<i18n>
{
  "en": {
    "sign-in": "Welcome",
    "sign-in-subtitle": "Sign in to your account"
  }
}
</i18n>
