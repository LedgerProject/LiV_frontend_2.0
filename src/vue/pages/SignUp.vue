<template>
  <div class="auth-page sign-up">
    <div class="auth-page__content">
      <h2 class="auth-page__title">
        {{ $t('sign-up-title') }}
      </h2>
      <p class="auth-page__subtitle">
        {{ $t('sign-up-subtitle') }}
      </p>

      <sign-up-form />

      <router-link
        class="auth-page__link sign-up__back-link"
        :to="$routes.login"
        :title="$t('login-up-url')"
        :aria-label="$t('login-up-url')"
        @click="logOut"
      >
        {{ $t('login-up-url') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import SignUpForm from '@/vue/forms/SignUpForm'
import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

export default {
  name: 'sign-up',

  components: { SignUpForm },

  methods: { ...mapActions({ logOut: vuexTypes.LOG_OUT }) },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/auth';

.sign-up__back-link { padding: 2rem; }
</style>

<i18n>
{
  "en": {
    "login-up-url": "Have an Account? Sign In",
    "sign-up-title": "Sign Up",
    "sign-up-subtitle": "Choose role and fill the form"
  }
}
</i18n>
