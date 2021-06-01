<template>
  <form
    novalidate
    class="app-form login-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.email.value"
          type="email"
          name="login-email"
          autocomplete="email"
          :label="$t('email')"
          :error-message="form.email.errorMessage"
          :disabled="isFormDisabled"
          @blur="form.email.blur"
        />
      </div>
    </div>
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.password.value"
          type="password"
          name="login-password"
          autocomplete="current-password"
          :label="$t('password')"
          :error-message="form.password.errorMessage"
          :disabled="isFormDisabled"
          @blur="form.password.blur"
        />
      </div>
    </div>

    <div class="app__form-actions">
      <app-button
        type="submit"
        scheme="secondary"
        class="auth-page__submit-button"
        :title="$t('sign-in')"
        :disabled="isFormDisabled"
      >
        {{ $t('sign-in') }}
      </app-button>
      <app-button
        :title="$t('sign-up')"
        class="auth-page__submit-button"
        :href="$config.SIGN_UP_REDIRECT_URL"
        target="_self"
        :disabled="isFormDisabled"
      >
        {{ $t('sign-up') }}
      </app-button>
    </div>
  </form>
</template>
<script>
import { InputField } from '@/vue/fields'
import { useForm, useValidators } from '@/vue/composables'
import { MAX_FIELD_LENGTH } from '@/js/const/field-length.const'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  name: 'login-form',

  components: { InputField },

  setup () {
    const store = useStore()

    const { required, maxLength } = useValidators()

    const { form, isFormDisabled, isFormValid, disableForm, enableForm } =
      useForm({
        email: {
          value: '',
          validators: {
            required,
            maxLength: maxLength(MAX_FIELD_LENGTH.email),
          },
        },
        password: {
          value: '',
          validators: {
            required,
            maxLength: maxLength(MAX_FIELD_LENGTH.password),
          },
        },
      })

    const submit = async () => {
      disableForm()
      try {
        await store.dispatch(vuexTypes.LOG_IN, {
          email: form.email.value,
          password: form.password.value,
        })
      } catch (e) {
        ErrorHandler.process(e)
      }
      enableForm()
    }

    return { form, isFormDisabled, isFormValid, submit }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/app-form';
@import '~@/scss/auth';
</style>

<i18n>
{
  "en": {
    "email": "Email",
    "password": "Password",
    "sign-in": "Sign In",
    "sign-up": "Sign Up"
  }
}
</i18n>
