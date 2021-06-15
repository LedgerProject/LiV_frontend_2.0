<template>
  <div class="will-requests">
    <router-view v-slot="{ Component }">
      <transition
        name="will-requests-transition"
        mode="out-in"
      >
        <component
          :is="Component"
          @delete-will-request="handleDeleteRequestEvent"
        />
      </transition>
    </router-view>
    <modal
      v-model:is-shown="isModalShown"
      :disabled="isDisabled"
      width="40"
    >
      <template #heading>
        {{ $t('remove-request-confirmation-heading') }}
      </template>
      <div class="will-requests__modal-question">
        <p class="will-requests__modal-question-text">
          {{ $t('remove-request-confirmation-question') }}
        </p>
      </div>
      <div class="app__form-actions app__form-actions--right">
        <app-button
          scheme="secondary"
          :title="$t('cancel-btn-lbl')"
          :disabled="isDisabled"
          @click="isModalShown = false"
        >
          {{ $t('cancel-btn-lbl') }}
        </app-button>
        <app-button
          :title="$t('delete-btn-lbl')"
          :disabled="isDisabled"
          @click="deleteRequest"
        >
          {{ $t('delete-btn-lbl') }}
        </app-button>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/vue/common/Modal'

import { ref, reactive } from 'vue'
import { manageWillRequest } from '@/js/helpers/will-requests-manager'

export default {
  name: 'will-requests',

  components: { Modal },

  setup () {
    const isModalShown = ref(false)
    const isDisabled = ref(false)
    const deleteRequestParams = reactive({ id: '', type: '' })

    const handleDeleteRequestEvent = event => {
      deleteRequestParams.id = event.id
      deleteRequestParams.type = event.type
      isModalShown.value = true
    }

    const deleteRequest = async () => {
      isDisabled.value = true
      await manageWillRequest(...Object.values(deleteRequestParams))
      isDisabled.value = false
      isModalShown.value = false
    }

    return { isModalShown, isDisabled, deleteRequest, handleDeleteRequestEvent }
  },

}
</script>

<style lang="scss" scoped>
@import '~@/scss/app-form';

.will-requests-transition-enter-active {
  animation: will-requests-transition 0.35s ease-in-out;
}

.will-requests-transition-leave-active {
  animation: will-requests-transition 0.35s ease-in-out reverse;
}

@keyframes will-requests-transition {
  0% { opacity: 0.25; }

  100% { opacity: 1; }
}
</style>

<i18n>
{
  "en": {
    "remove-request-confirmation-heading": "Delete Request Confirmation",
    "remove-request-confirmation-question": "Are you sure you want to delete selected request?",
    "cancel-btn-lbl": "Cancel",
    "delete-btn-lbl": "Delete"
  }
}
</i18n>
