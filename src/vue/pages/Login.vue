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
      <router-link
        class="auth-page__link"
        :to="$routes.signUp"
        :title="$t('sign-up-url')"
        :aria-label="$t('sign-up-url')"
      >
        {{ $t('sign-up-url') }}
      </router-link>
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
    "sign-in-subtitle": "Sign in to your account",
    "sign-up-url": "I'm notary/registry"
  }
}
</i18n>
