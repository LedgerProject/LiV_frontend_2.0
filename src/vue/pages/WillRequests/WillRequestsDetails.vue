<template>
  <div class="app__page-content will-requests-details">
    <template v-if="isLoading">
      <loader
        :message="$t('loading-message')"
        position-center
      />
    </template>
    <template v-else>
      <template v-if="isLoadFailed">
        <loading-error-message />
      </template>
      <template v-else>
        <app-button
          scheme="secondary"
          icon="mdi-keyboard-backspace"
          class="will-requests-details__return-btn"
          :title="$t('back-btn')"
          :route="$routes.willRequests"
        >
          {{ $t('back-btn') }}
        </app-button>
        <template v-if="willRequest">
          <will-requests-details-table
            :request="willRequest"
            :is-disabled="isDisabled"
            @manage-request="manageRequest"
          />
        </template>
        <template v-else>
          <no-data-message
            :title="$t('no-data-title')"
            :message="$t('no-data-message')"
            center
          />
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import Loader from '@/vue/common/Loader'
import LoadingErrorMessage from '@/vue/common/LoadingErrorMessage'
import NoDataMessage from '@/vue/common/NoDataMessage'
import WillRequestsDetailsTable from '@/vue/pages/WillRequests/WillRequestsDetailsTable'

import { ref } from 'vue'
import { api } from '@/api'
import { useRoute } from 'vue-router'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { WillRequestRecord } from '@/js/records/will-request.record'
import { manageWillRequest } from '@/js/helpers/will-requests-manager'
import { Bus } from '@/js/helpers/event-bus'
import { WILL_REQUEST_OPERATIONS } from '@/js/const/will-request-operations.const'

export default {
  name: 'will-requests-details',

  components: {
    Loader,
    LoadingErrorMessage,
    NoDataMessage,
    WillRequestsDetailsTable,
  },

  setup (_, { emit }) {
    const route = useRoute()
    const willRequestId = route?.params?.id
    const isLoading = ref(false)
    const isLoadFailed = ref(false)
    const willRequest = ref(null)
    const isDisabled = ref(false)

    Bus.on(Bus.eventList.willRequestManaged, () => loadWillRequest())

    const loadWillRequest = async () => {
      isLoading.value = true
      isLoadFailed.value = false
      try {
        const { data } = await api.get(`/will-requests/${willRequestId}`)
        willRequest.value = new WillRequestRecord(data)
      } catch (e) {
        isLoadFailed.value = true
        ErrorHandler.process(e)
      }
      isLoading.value = false
    }

    const manageRequest = async type => {
      if (type === WILL_REQUEST_OPERATIONS.delete) {
        emit('delete-will-request', { id: willRequestId, type })
      } else {
        isDisabled.value = true
        await manageWillRequest(willRequestId, type)
        isDisabled.value = false
      }
    }

    loadWillRequest()

    return { isLoading, isLoadFailed, willRequest, isDisabled, manageRequest }
  },
}
</script>

<style lang="scss" scoped>
.will-requests-details__return-btn {
  max-height: 2rem;
  padding: 0.3rem 0.7rem;
  margin-bottom: 2rem;
}
</style>

<i18n>
{
  "en": {
    "loading-message": "Loading will request details...",
    "no-data-title": "No will request",
    "no-data-message": "Will request with such id not found",
    "back-btn": "Return back"
  }
}
</i18n>
