<template>
  <div class="kyc-form-wrapper">
    <form
      class="app-form kyc-form"
      novalidate
      @submit.prevent="isFormValid() && submit()"
    >
      <div class="app__form-row">
        <div class="app__form-field">
          <input-field
            v-model="form.firstName.value"
            autocomplete="given-name"
            name="kyc-form-first-name"
            :label="$t('first-name-lbl')"
            :error-message="form.firstName.errorMessage"
            :disabled="isFormDisabled"
            @blur="form.firstName.blur"
          />
        </div>
      </div>
      <div class="app__form-row">
        <div class="app__form-field">
          <input-field
            v-model="form.secondName.value"
            autocomplete="additional-name"
            name="kyc-form-second-name"
            :label="$t('middle-name-lbl')"
            :error-message="form.secondName.errorMessage"
            :disabled="isFormDisabled"
            @blur="form.secondName.blur"
          />
        </div>
      </div>
      <div class="app__form-row">
        <div class="app__form-field">
          <input-field
            v-model="form.lastName.value"
            name="kyc-form-last-name"
            autocomplete="family-name"
            :label="$t('last-name-lbl')"
            :error-message="form.lastName.errorMessage"
            :disabled="isFormDisabled"
            @blur="form.lastName.blur"
          />
        </div>
      </div>
      <div class="app__form-row">
        <div class="app__form-field">
          <input-field
            v-model="form.birthday.value"
            name="kyc-form-birthday"
            autocomplete="bday"
            mask="####-##-##"
            :label="$t('birthday-lbl')"
            :error-message="form.birthday.errorMessage"
            :disabled="isFormDisabled"
            @blur="form.birthday.blur"
          />
        </div>
      </div>
      <div class="app__form-row">
        <div class="app__form-field">
          <input-field
            v-model="form.address.value"
            name="kyc-form-login-email"
            autocomplete="address-line1"
            :label="$t('address-lbl')"
            :error-message="form.address.errorMessage"
            :disabled="isFormDisabled"
            @blur="form.address.blur"
          />
        </div>
      </div>
      <div class="app__form-row">
        <div class="app__form-field">
          <input-field
            v-model="form.passportId.value"
            name="kyc-form-passport-number"
            mask="ZZZZZZZZZZZZZ"
            :label="$t('passport-number-lbl')"
            :error-message="form.passportId.errorMessage"
            :disabled="isFormDisabled"
            @blur="form.passportId.blur"
          />
        </div>
      </div>

      <div class="app__form-actions app__form-actions--right">
        <app-button
          v-if="isAccountRecordPassed"
          scheme="secondary"
          :title="$t('reset-btn-lbl')"
          @click="resetForm"
          :disabled="isFormDisabled"
        >
          {{ $t('reset-btn-lbl') }}
        </app-button>
        <app-button
          type="submit"
          :title="$t('update-btn-lbl')"
          :disabled="isFormDisabled"
        >
          <template v-if="isAccountRecordPassed">
            {{ $t('update-btn-lbl') }}
          </template>
          <template v-else>
            {{ $t('sign-up-btn-lbl') }}
          </template>
        </app-button>
      </div>
    </form>
    <modal
      v-model:is-shown="isLeaveRouteModalShown"
      @close="leaveRouteModalActions.stayRoute"
      :close-by-click-outside="false"
      width="40"
    >
      <template #heading>
        {{ $t('leave-page-modal-heading') }}
      </template>
      <div class="kyc-form__leave-route">
        <p class="kyc-form__leave-route-question">
          {{ $t('leave-page-modal-question') }}
        </p>
      </div>
      <div class="app__form-actions app__form-actions--right">
        <app-button
          scheme="secondary"
          :title="$t('cancel-update-profile-btn-lbl')"
          :disabled="isFormDisabled"
          @click="leaveRouteModalActions.stayRoute"
        >
          {{ $t('cancel-update-profile-btn-lbl') }}
        </app-button>
        <app-button
          :title="$t('leave-btn-lbl')"
          :disabled="isFormDisabled"
          @click="leaveRouteModalActions.leaveRoute"
        >
          {{ $t('leave-btn-lbl') }}
        </app-button>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/vue/common/Modal'

import { InputField } from '@/vue/fields'
import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '@/js/const/field-length.const'
import { useForm, useValidators } from '@/vue/composables'
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { AccountRecord } from '@/js/records/account.record'
import { api } from '@/api'
import { Bus } from '@/js/helpers/event-bus'
import { ref, reactive, computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

export default {
  name: 'kyc-form',

  components: { InputField, Modal },

  props: {
    accountRecord: {
      type: AccountRecord, default: () => new AccountRecord({}),
    },
  },

  emits: ['submit'],

  setup (props, { emit }) {
    const store = useStore()
    const isLeaveRouteModalShown = ref(false)

    const leaveRouteModalActions = reactive({
      leaveRoute: () => {},
      stayRoute: () => {},
    })

    const isAccountRecordPassed = computed(() => props.accountRecord.id)
    const accountEmail = computed(() => store.getters[vuexTypes.accountEmail])

    const isFormChanged = computed(() =>
      form.firstName.value !== props.accountRecord.firstName ||
      form.secondName.value !== props.accountRecord.secondName ||
      form.lastName.value !== props.accountRecord.lastName ||
      form.birthday.value !== props.accountRecord.birthday ||
      form.address.value !== props.accountRecord.address ||
      form.passportId.value !== props.accountRecord.passportId,
    )

    const {
      required,
      maxLength,
      minLength,
      alphaNum,
      alpha,
      birthday,
    } = useValidators()

    const {
      form,
      isFormDisabled,
      isFormValid,
      disableForm,
      enableForm,
      clearFields,
    } = useForm({
      firstName: {
        value: props.accountRecord.firstName || '',
        validators: {
          required,
          alpha,
          maxLength: maxLength(MAX_FIELD_LENGTH.name),
          minLength: minLength(MIN_FIELD_LENGTH.name),
        },
      },
      secondName: {
        value: props.accountRecord.secondName || '',
        validators: {
          required,
          alpha,
          maxLength: maxLength(MAX_FIELD_LENGTH.name),
          minLength: minLength(MIN_FIELD_LENGTH.name),
        },
      },
      lastName: {
        value: props.accountRecord.lastName || '',
        validators: {
          required,
          alpha,
          maxLength: maxLength(MAX_FIELD_LENGTH.name),
          minLength: minLength(MIN_FIELD_LENGTH.name),
        },
      },
      birthday: {
        value: props.accountRecord.birthday || '',
        validators: {
          required,
          birthday,
          maxLength: maxLength(MAX_FIELD_LENGTH.birthday),
          minLength: minLength(MIN_FIELD_LENGTH.birthday),
        },
      },
      address: {
        value: props.accountRecord.address || '',
        validators: {
          required,
          maxLength: maxLength(MAX_FIELD_LENGTH.address),
          minLength: minLength(MIN_FIELD_LENGTH.address),
        },
      },
      passportId: {
        value: props.accountRecord.passportId || '',
        validators: {
          required,
          alphaNum,
          maxLength: maxLength(MAX_FIELD_LENGTH.passportId),
          minLength: minLength(MIN_FIELD_LENGTH.passportId),
        },
      },
    })

    const collectForm = () => {
      const fd = new FormData()

      fd.append('email', accountEmail.value)
      fd.append('first_name', form.firstName.value)
      fd.append('second_name', form.secondName.value)
      fd.append('last_name', form.lastName.value)
      fd.append('address', form.address.value)
      fd.append('nif', form.passportId.value)
      fd.append('birthday', form.birthday.value)

      return fd
    }

    const submit = async () => {
      disableForm()
      try {
        await api.post('/users/addKYC', collectForm(), {
          headers: { 'content-type': 'multipart/form-data' },
        })
        if (isAccountRecordPassed.value) {
          Bus.success('notifications.update-kyc-success')
        }
        emit('submit')
      } catch (e) {
        ErrorHandler.process(e)
      }
      enableForm()
    }

    const resetForm = () => { clearFields(props.accountRecord) }

    const showLeaveRouteModal = async () => {
      // eslint-disable-next-line promise/avoid-new
      return new Promise((resolve, reject) => {
        isLeaveRouteModalShown.value = true
        leaveRouteModalActions.leaveRoute = () => {
          isLeaveRouteModalShown.value = false
          resolve()
        }
        leaveRouteModalActions.stayRoute = () => {
          isLeaveRouteModalShown.value = false
          // eslint-disable-next-line prefer-promise-reject-errors
          reject()
        }
      })
    }

    onBeforeRouteLeave(async (to, from, next) => {
      if (isFormChanged.value && isAccountRecordPassed.value) {
        try {
          await showLeaveRouteModal()
          next()
        } catch (error) {
          next(false)
        }
      } else {
        next()
      }
    })

    return {
      form,
      isFormDisabled,
      isFormValid,
      submit,
      resetForm,
      isLeaveRouteModalShown,
      leaveRouteModalActions,
      isAccountRecordPassed,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/app-form';
</style>

<i18n>
{
  "en": {
    "first-name-lbl": "First Name",
    "middle-name-lbl": "Middle Name",
    "last-name-lbl": "Last Name",
    "birthday-lbl": "Birthday",
    "address-lbl": "Address",
    "passport-number-lbl": "Passport Number",
    "reset-btn-lbl": "Reset",
    "update-btn-lbl": "Update profile",
    "sign-up-btn-lbl": "Submit",
    "cancel-update-profile-btn-lbl": "Cancel",
    "leave-btn-lbl": "Leave",
    "leave-page-modal-heading": "Profile changed",
    "leave-page-modal-question": "Do you really want to leave this page without save?"
  }
}
</i18n>
