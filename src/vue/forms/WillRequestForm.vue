<template>
  <form
    novalidate
    class="will-request-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <div
      v-for="(email, index) in form.recipientEmails"
      :key="index"
      class="app__form-row app__form-row--row-always"
    >
      <div class="app__form-field">
        <input-field
          v-model="email.value"
          autocomplete="email"
          name="will-request-form-email"
          :label="$t('email-lbl', { index: index + 1})"
          :error-message="email.errorMessage"
          :disabled="isFormDisabled"
          @blur="email.blur"
        />
      </div>
      <button
        v-if="!isFormDisabled"
        type="button"
        class="will-request-form__remove-btn"
        :title="$t('remove-recipient-btn')"
        :aria-label="$t('remove-recipient-btn')"
        :disabled="isFormDisabled"
        @click="removeRecipient(index)"
      >
        <i class="mdi mdi-close"/>
      </button>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <file-field
          v-model="form.document.value"
          name="will-request-form-document"
          :error-message="form.document.errorMessage"
          :disabled="isFormDisabled"
        />
      </div>
    </div>
    <div class="app__form-actions app__form-actions--right">
      <app-button
        scheme="secondary"
        :title="$t('add-recipient-btn')"
        :disabled="isFormDisabled"
        @click="addRecipient"
      >
        {{ $t('add-recipient-btn') }}
      </app-button>
      <app-button
        type="submit"
        :title="$t('submit-btn')"
        :disabled="isFormDisabled"
      >
        {{ $t('submit-btn') }}
      </app-button>
    </div>
  </form>
</template>

<script>
import { InputField, FileField } from '@/vue/fields'
import { useForm, useValidators } from '@/vue/composables'
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'
import { MAX_FIELD_LENGTH, MIN_FIELD_LENGTH } from '@/js/const/field-length.const'
import { api } from '@/api'
import { computed } from 'vue'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'
import { useI18n } from 'vue-i18n'

const MAX_RECIPIENT_AMOUNT = 10
const MIN_RECIPIENT_AMOUNT = 1

export default {
  name: 'will-request-form',

  components: { InputField, FileField },

  emits: ['submit'],

  setup (_, { emit }) {
    const { t } = useI18n({ useScope: 'global' })
    const store = useStore()

    const accountId = computed(() => store.getters[vuexTypes.accountId])
    const accountEmail = computed(() => store.getters[vuexTypes.accountEmail])

    const { required, maxLength, email, minLength } = useValidators()

    const recipientEmail = val => accountEmail.value !== val
      ? ''
      : t('validation.field-error_recipientEmail')

    const {
      form,
      isFormDisabled,
      isFormValid,
      disableForm,
      enableForm,
      addField,
      removeField,
    } = useForm({
      recipientEmails: [
        {
          value: '',
          validators: {
            required,
            email,
            recipientEmail,
            maxLength: maxLength(MAX_FIELD_LENGTH.email),
            minLength: minLength(MIN_FIELD_LENGTH.email),
          },
        },
      ],
      document: { value: null, validators: { required } },
    })

    const submit = async () => {
      disableForm()

      try {
        const recipientEmails = form.recipientEmails.map(i => i.value).join(', ')
        const formData = new FormData()
        formData.append('sender_id', accountId.value)
        formData.append('recipient_email', recipientEmails)
        formData.append('file', form.document.value)
        await api.post('/will-requests/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        Bus.success('notifications.request-creation-success')
        Bus.emit(Bus.eventList.willRequestManaged)
        emit('submit')
      } catch (e) {
        ErrorHandler.process(e)
      }

      enableForm()
    }

    const addRecipient = () => {
      if (form.recipientEmails.length === MAX_RECIPIENT_AMOUNT) {
        Bus.warning('notifications.max-recipient-amount-reached')
      } else {
        const newRecipientEmailField = {
          value: '',
          validators: {
            required,
            email,
            recipientEmail,
            maxLength: maxLength(MAX_FIELD_LENGTH.email),
            minLength: minLength(MIN_FIELD_LENGTH.email),
          },
        }

        addField('recipientEmails', newRecipientEmailField)
      }
    }

    const removeRecipient = index => {
      if (form.recipientEmails.length === MIN_RECIPIENT_AMOUNT) {
        Bus.warning('notifications.min-recipient-amount-reached')
      } else {
        removeField('recipientEmails', index)
      }
    }

    return {
      form,
      isFormValid,
      isFormDisabled,
      submit,
      addRecipient,
      removeRecipient,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/app-form';

.will-request-form__remove-btn {
  padding: 0;
  width: 3rem;
  margin: auto 0 auto 2rem;
  height: 3rem;
  min-width: 3rem;
  color: $col-will-request-form-remove-btn-text;

  &:active {
    & > i.mdi {
      color: $col-will-request-form-remove-btn-color-active;
      transform: scale(0.9);
    }
  }

  &:not([disabled]):hover {
    background: $col-will-request-form-remove-btn-color-hover-bg;
    border-radius: 100%;
  }
}
</style>

<i18n>
{
  "en": {
    "email-lbl": "Recipient #{ index }",
    "add-recipient-btn": "Add Recipient",
    "remove-recipient-btn": "Remove Recipient",
    "submit-btn": "Submit",
  }
}
</i18n>
