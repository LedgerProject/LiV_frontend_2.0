<template>
  <form
    class="app-form sign-up-form"
    novalidate
    @submit.prevent="isFormValid() && submit()"
  >
    <div class="sign-up-form__role-selector-wrapper">
      <div class="sign-up-form__role-selector">
        <button
          type="button"
          class="sign-up-form__role-selector__item"
          :class="{'sign-up-form__role-selector__item--selected': isNotary }"
          :title="$t('notary-btn')"
          :aria-label="$t('notary-btn')"
          @click="accountRole = USER_ROLES.notary"
          :disabled="isFormDisabled"
        >
          {{ $t('notary-btn') }}
        </button>
        <button
          type="button"
          class="sign-up-form__role-selector__item"
          :class="{'sign-up-form__role-selector__item--selected': isRegistry }"
          :title="$t('registry-btn')"
          :aria-label="$t('registry-btn')"
          @click="accountRole = USER_ROLES.registry"
          :disabled="isFormDisabled"
        >
          {{ $t('registry-btn') }}
        </button>

        <div
          class="sign-up-form__role-switch"
          :class="{ 'sign-up-form__role-switch--notary': isNotary }"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.email.value"
          type="email"
          name="sign-up-form-email"
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
          name="sign-up-form-password"
          autocomplete="new-password"
          :label="$t('password')"
          :error-message="form.password.errorMessage"
          :disabled="isFormDisabled"
          @blur="form.password.blur"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.confirmPassword.value"
          type="password"
          name="sign-up-form-confirm-password"
          autocomplete="new-password"
          :label="$t('confirm-password')"
          :error-message="form.confirmPassword.errorMessage"
          :disabled="isFormDisabled"
          @blur="form.confirmPassword.blur"
        />
      </div>
    </div>

    <div class="app__form-actions app__form-actions--right">
      <app-button
        type="submit"
        :title="$t('sign-up-btn-lbl')"
        :disabled="isFormDisabled"
      >
        {{ $t('sign-up-btn-lbl') }}
      </app-button>
    </div>
  </form>
</template>

<script>
import { InputField } from '@/vue/fields'

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useValidators } from '@/vue/composables'
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'
import { api } from '@/api'

import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '@/js/const/field-length.const'
import { USER_ROLES } from '@/js/const/user-roles.const'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'
import { vueRoutes } from '@/vue-router'

export default {
  name: 'sign-up-form',

  components: { InputField },

  setup () {
    const accountRole = ref(USER_ROLES.notary)

    const isNotary = computed(() => accountRole.value === USER_ROLES.notary)
    const isRegistry = computed(() => accountRole.value === USER_ROLES.registry)

    const store = useStore()
    const router = useRouter()
    const {
      required,
      maxLength,
      minLength,
      email,
    } = useValidators()

    const {
      form,
      isFormDisabled,
      isFormValid,
      disableForm,
      enableForm,
    } = useForm({
      email: {
        value: '',
        validators: {
          email,
          required,
          minLength: minLength(MIN_FIELD_LENGTH.email),
          maxLength: maxLength(MAX_FIELD_LENGTH.email),
        },
      },
      password: {
        value: '',
        validators: {
          required,
          minLength: minLength(MIN_FIELD_LENGTH.password),
          maxLength: maxLength(MAX_FIELD_LENGTH.password),
        },
      },
      confirmPassword: {
        value: '',
        validators: {
          required,
          minLength: minLength(MIN_FIELD_LENGTH.password),
          maxLength: maxLength(MAX_FIELD_LENGTH.password),
        },
      },
    })

    const submit = async () => {
      if (form.password.value !== form.confirmPassword.value) {
        Bus.warning('validation.field-error_passwordEquals')
        return
      }
      disableForm()
      try {
        await api.post('/users/signup', {
          email: form.email.value,
          password: form.password.value,
          role: accountRole.value,
        })

        await store.dispatch(vuexTypes.LOG_IN, {
          email: form.email.value,
          password: form.password.value,
        })

        router.push(vueRoutes.signUpKyc)
      } catch (e) {
        ErrorHandler.process(e)
      }
      enableForm()
    }

    return {
      USER_ROLES,
      accountRole,
      isNotary,
      isRegistry,
      submit,
      form,
      isFormValid,
      isFormDisabled,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/app-form';

$border-width: 0.2rem;
$border-radius: 0.6rem;
$selector-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
$account-role-selector-z-index: 3;
$account-role-selector-item-z-index: 2;
$account-role-selector-switch-z-index: 1;

.sign-up-form__role-selector-wrapper {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}

.sign-up-form__role-selector {
  position: relative;
  background: $col-sign-up-form-role-selector-bg;
  display: flex;
  justify-content: center;
  border-radius: $border-radius;
  padding: $border-width;
  z-index: $account-role-selector-z-index;
  box-shadow: $col-sign-up-form-role-selector-shadow;
}

.sign-up-form__role-selector__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16.55rem;
  height: 3.2rem;
  font-size: 1.4rem;
  text-decoration: none;
  border-radius: $border-radius;
  z-index: $account-role-selector-item-z-index;
  transition: color $selector-transition;
  font-weight: 500;

  &[disabled] {
    opacity: 0.7;
    cursor: default;
    box-shadow: none;
    filter: grayscale(100%);
  }

  &--selected {
    color: $col-sign-up-form-selected-item;
    font-weight: 700;
  }
}

.sign-up-form__role-switch {
  position: absolute;
  width: 17.3rem;
  height: 3.2rem;
  background: var(--col-primary);
  text-decoration: none;
  border-radius: $border-radius;
  right: $border-width;
  z-index: $account-role-selector-switch-z-index;
  transition: transform $selector-transition;

  &--notary { transform: translateX(-91%); }
}
</style>

<i18n>
{
  "en": {
    "notary-btn": "Notary",
    "registry-btn": "Registry",
    "email": "Email",
    "password": "Password",
    "confirm-password": "Confirm Password",
    "sign-up-btn-lbl": "Sign Up"
  }
}
</i18n>
