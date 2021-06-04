<template>
  <div class="app__page-content will-requests-list">
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
        <template v-if="willRequests.length">
          <will-requests-table
            :will-requests="willRequests"
            @submit="loadWillRequestsList"
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
import WillRequestsTable from '@/vue/pages/WillRequests/WillRequestsTable'

import { api } from '@/api'
import { ref } from 'vue'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { WillRequestRecord } from '@/js/records/will-request.record'

export default {
  name: 'will-requests-list',

  components: { Loader, LoadingErrorMessage, NoDataMessage, WillRequestsTable },

  setup () {
    const isLoading = ref(false)
    const isLoadFailed = ref(false)
    const willRequests = ref([])

    const loadWillRequestsList = async () => {
      isLoading.value = true
      isLoadFailed.value = false
      try {
        const { data } = await api.get('/will-requests/')
        willRequests.value = data
        // TODO: remove filter (temporary handler for null items)
          .filter(i => i)
          .map(el => new WillRequestRecord(el))
      } catch (e) {
        isLoadFailed.value = true
        ErrorHandler.process(e)
      }
      isLoading.value = false
    }

    loadWillRequestsList()

    return {
      isLoading,
      isLoadFailed,
      willRequests,
      loadWillRequestsList,
    }
  },

}
</script>

<i18n>
{
  "en": {
    "loading-message": "Loading will requests list...",
    "no-data-title": "Nothing there...",
    "no-data-message": "There is no will requests"
  }
}
</i18n>
