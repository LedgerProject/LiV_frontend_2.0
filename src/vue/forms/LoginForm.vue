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
          :error-message="form.email.errorMessage"
          :disabled="isFormDisabled"
          @blur="form.email.blur"
        />
      </div>
    </div>
  </form>
</template>
<script>
import { InputField } from '@/vue/fields'
import { useForm } from '@/vue/composables'
import { required, maxLength } from '@validators'
import { MAX_FIELD_LENGTH } from '@/js/const/field-length.const'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  name: 'login-form',

  components: { InputField },

  setup () {
    const store = useStore()

    const { form, isFormDisabled, isFormValid, disableForm, enableForm } =
      useForm({
        email: {
          value: '',
          validators: {
            required,
            maxLength: maxLength(MAX_FIELD_LENGTH.email),
          },
          validatorsArgs: { maxLength: MAX_FIELD_LENGTH.email },
        },
        password: {
          value: '',
          validators: {
            required,
            maxLength: maxLength(MAX_FIELD_LENGTH.password),
          },
          validatorsArgs: { maxLength: MAX_FIELD_LENGTH.password },
        },
      })

    const submit = async () => {
      disableForm()
      try {
        await store.dispatch(vuexTypes.LOG_IN, {
          email: form.email.value,
          password: form.email.password,
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
</style>

<i18n>
{
  "en": {
    "email": "Email",
    "password": "Password"
  }
}
</i18n>
