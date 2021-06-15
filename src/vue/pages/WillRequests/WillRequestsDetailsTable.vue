<template>
  <div class="will-requests-details-table">
    <div class="will-requests-details-table__request-creator">
      <h2 class="will-requests-details-table__request-title">
        {{ $t('creator-title') }}
      </h2>
      <will-requests-details-table-user :user="request.creator" />
    </div>
    <div class="will-requests-details-table__request-details">
      <h2 class="will-requests-details-table__request-title">
        {{ $t('request-details-title') }}
      </h2>
      <will-requests-details-table-request :request="request" />
      <div class="will-requests-details-table__request-actions">
        <app-button
          scheme="secondary"
          icon="mdi-download-circle"
          target="_blank"
          :title="$t('load-file-btn')"
          :href="request.documentLink"
          :disabled="isDisabled"
        >
          {{ $t('load-file-btn') }}
        </app-button>
        <template v-if="isActionsShown">
          <template v-if="isAccountNotary">
            <template v-if="request.isStatusSubmitted">
              <app-button
                :title="$t('approve-btn')"
                icon="mdi-check-circle"
                :disabled="isDisabled"
                @click="$emit(
                  'manage-request',
                  WILL_REQUEST_OPERATIONS.approve
                )"
              >
                {{ $t('approve-btn') }}
              </app-button>
              <app-button
                :title="$t('reject-btn')"
                :disabled="isDisabled"
                icon="mdi-close-circle"
                @click="$emit(
                  'manage-request',
                  WILL_REQUEST_OPERATIONS.reject
                )"
              >
                {{ $t('reject-btn') }}
              </app-button>
            </template>
            <template v-else-if="request.isStatusNotified">
              <app-button
                :title="$t('release-btn')"
                icon="mdi-google-circles-group"
                :disabled="isDisabled"
                @click="$emit(
                  'manage-request',
                  WILL_REQUEST_OPERATIONS.release
                )"
              >
                {{ $t('release-btn') }}
              </app-button>
            </template>
          </template>
          <app-button
            v-else-if="request.isStatusApproved && isAccountRegistry"
            icon="mdi-checkbox-multiple-marked-circle"
            :title="$t('notify-btn')"
            :disabled="isDisabled"
            @click="$emit('manage-request', WILL_REQUEST_OPERATIONS.notify)"
          >
            {{ $t('notify-btn') }}
          </app-button>
          <app-button
            v-if="isAccountGeneral"
            icon="mdi-delete-circle"
            :title="$t('delete-btn')"
            :disabled="isDisabled"
            @click="$emit('manage-request', WILL_REQUEST_OPERATIONS.delete)"
          >
            {{ $t('delete-btn') }}
          </app-button>
        </template>
      </div>
    </div>
    <div class="will-requests-details-table__request-recipients">
      <h2 class="will-requests-details-table__request-title">
        {{ $t('recipients-title') }}
      </h2>
      <div class="will-requests-details-table__request-recipients-list">
        <will-requests-details-table-user
          v-for="recipient in request.recipients"
          :user="recipient"
          :key="recipient.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WillRequestsDetailsTableUser from '@/vue/pages/WillRequests/WillRequestsDetailsTableUser'
import WillRequestsDetailsTableRequest from '@/vue/pages/WillRequests/WillRequestsDetailsTableRequest'

import { useStore } from 'vuex'
import { computed } from 'vue'
import { vuexTypes } from '@/vuex'
import { WillRequestRecord } from '@/js/records/will-request.record'
import { WILL_REQUEST_OPERATIONS } from '@/js/const/will-request-operations.const'

export default {
  name: 'will-requests-details-table',

  components: { WillRequestsDetailsTableUser, WillRequestsDetailsTableRequest },

  props: {
    request: { type: WillRequestRecord, required: true },

    isDisabled: { type: Boolean, default: false },
  },

  emits: ['manage-request'],

  setup (props) {
    const store = useStore()

    const isAccountNotary = computed(
      () => store.getters[vuexTypes.isAccountNotary],
    )
    const isAccountRegistry = computed(
      () => store.getters[vuexTypes.isAccountRegistry],
    )
    const isAccountGeneral = computed(
      () => store.getters[vuexTypes.isAccountGeneral],
    )

    const isActionsShown = computed(() => {
      let isStatusWrong = false
      const request = props.request

      if (isAccountNotary.value) isStatusWrong = request.isStatusApproved
      if (isAccountRegistry.value) isStatusWrong = !request.isStatusApproved

      return isAccountGeneral.value
        ? !(props.isDisabled || request.isStatusDeleted)
        : !(!request.isManageable || props.isDisabled || isStatusWrong)
    })

    return {
      WILL_REQUEST_OPERATIONS,
      isActionsShown,
      isAccountNotary,
      isAccountRegistry,
      isAccountGeneral,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.will-requests-details-table__request-title {
  margin-bottom: 2rem;
  font-weight: 300;
  color: $col-will-request-details-page-title;
}

.will-requests-details-table {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2.4rem 1.4rem;

  @include respond-to(tablet) {
    display: flex;
    flex-direction: column;
  }
}

.will-requests-details-table__request-actions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  margin: 1.4rem 0;
  grid-gap: 1.4rem;
}

.will-requests-details-table__request-recipients {
  grid-column: 1 / 3;
}

.will-requests-details-table__request-recipients-list {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(33rem, 1fr));
}

</style>

<i18n>
{
  "en": {
    "creator-title": "Creator",
    "request-details-title": "Request Details",
    "recipients-title": "Recipients",
    "load-file-btn": "Load file",
    "reject-btn": "Reject",
    "approve-btn": "Approve",
    "release-btn": "Release",
    "notify-btn": "Notify",
    "delete-btn": "Delete"
  }
}
</i18n>
