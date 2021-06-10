<template>
  <div class="auth-page sign-up-kyc">
    <div class="auth-page__content">
      <h2 class="auth-page__title">
        {{ $t('sign-up-title') }}
      </h2>
      <p class="auth-page__subtitle">
        {{ $t('sign-up-subtitle') }}
      </p>
      <kyc-form
        class="sign-up-kyc__content-form"
        @submit="$router.push($routes.willRequests)"
      />
    </div>
  </div>
</template>

<script>
import KycForm from '@/vue/forms/KycForm'

export default {
  name: 'sign-up-kyc',

  components: { KycForm },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/auth';

.sign-up-kyc__content-form { padding: 2rem 0 0; }
</style>

<i18n>
{
  "en": {
    "sign-up-title": "Personal Information",
    "sign-up-subtitle": "Fill the form to finish sign up"
  }
}
</i18n>
