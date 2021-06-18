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
          <div
            v-if="isAccountGeneral"
            class="will-requests-list__filters"
          >
            <select-field
              name="will-requests-list-filter"
              v-model="filter"
              @input="loadWillRequestsList"
              :label="$t('filter-label')"
            >
              <option
                :title="$t('filter-option-owner')"
                :value="WILL_REQUESTS_LIST_FILTERS.owner"
              >
                {{ $t('filter-option-owner') }}
              </option>
              <option
                :title="$t('filter-option-recipient')"
                :value="WILL_REQUESTS_LIST_FILTERS.recipient"
              >
                {{ $t('filter-option-recipient') }}
              </option>
            </select-field>
          </div>
          <will-requests-table
            :will-requests="willRequests"
            @delete-will-request="$emit('delete-will-request', $event)"
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
import { toRefs, computed, reactive } from 'vue'
import { Bus } from '@/js/helpers/event-bus'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { WillRequestRecord } from '@/js/records/will-request.record'
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'
import { SelectField } from '@/vue/fields'

const WILL_REQUESTS_LIST_FILTERS = { owner: 'owner', recipient: 'recipient' }

export default {
  name: 'will-requests-list',

  components: {
    Loader,
    LoadingErrorMessage,
    NoDataMessage,
    WillRequestsTable,
    SelectField,
  },

  emits: ['delete-will-request'],

  setup () {
    const state = reactive({
      isLoading: false,
      isLoadFailed: false,
      willRequests: [],
      filter: WILL_REQUESTS_LIST_FILTERS.owner,
    })

    const store = useStore()

    const accountId = computed(() => store.getters[vuexTypes.accountId])
    const isAccountGeneral = computed(
      () => store.getters[vuexTypes.isAccountGeneral],
    )
    const isAccountNotary = computed(
      () => store.getters[vuexTypes.isAccountNotary],
    )
    const isAccountRegistry = computed(
      () => store.getters[vuexTypes.isAccountRegistry],
    )
    const isNotaryOrRegistry = computed(
      () => isAccountNotary.value || isAccountRegistry.value,
    )

    Bus.on(Bus.eventList.willRequestManaged, () => loadWillRequestsList())

    const loadWillRequestsList = async () => {
      state.isLoading = true
      state.isLoadFailed = false
      try {
        const generalFilter = {
          params: {
            ...(state.filter === WILL_REQUESTS_LIST_FILTERS.owner
              ? { ownerId: accountId.value }
              : { recipientId: accountId.value }
            ),
          },
        }
        const { data } = await api.get('/will-requests/', {
          headers: { 'Content-Type': 'multipart/form-data' },
          ...(isNotaryOrRegistry.value ? {} : generalFilter),
        })
        state.willRequests = data
        // TODO: remove filter (temporary handler for null items)
          .filter(i => i)
          .map(el => new WillRequestRecord(el))
      } catch (e) {
        state.isLoadFailed = true
        ErrorHandler.process(e)
      }
      state.isLoading = false
    }

    loadWillRequestsList()

    return {
      ...toRefs(state),
      loadWillRequestsList,
      WILL_REQUESTS_LIST_FILTERS,
      isAccountGeneral,
    }
  },

}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

.will-requests-list__filters {
  margin-bottom: 1.4rem;
  max-width: 30rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.4rem;
  margin-left: auto;
  background: $col-will-requests-list-filters-background;
  box-shadow: $col-will-requests-list-filters-shadow;
}
</style>

<i18n>
{
  "en": {
    "loading-message": "Loading will requests list...",
    "no-data-title": "Nothing there...",
    "no-data-message": "There is no will requests",
    "filter-option-owner": "Owner",
    "filter-option-recipient": "Recipient",
    "filter-label": "Filter by"
  }
}
</i18n>
