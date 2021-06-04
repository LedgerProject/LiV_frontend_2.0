<template>
  <div
    class="will-requests-table app__table app__table--last-td-to-right"
    :class="['app__table--clickable-rows app__table--with-shadow']"
  >
    <table>
      <thead>
        <th>
          {{ $t('table-head-id') }}
        </th>
        <th>
          {{ $t('table-head-creator') }}
        </th>
        <th>
          {{ $t('table-head-recipient') }}
        </th>
        <th>
          {{ $t('table-head-status') }}
        </th>
        <th v-if="isAccountNotary || isAccountRegistry">
          {{ $t('table-head-action') }}
        </th>
      </thead>
      <tbody>
        <router-link
          v-for="item in willRequests"
          :to="{
            ...$routes.willRequestsDetails,
            params: { id: item.id }
          }"
          custom
          v-slot="{ navigate }"
          :key="item.id"
        >
          <tr
            v-if="item.id"
            role="link"
            @click="navigate"
            @keypress.enter="navigate"
          >
            <td>
              {{ item.id }}
            </td>
            <td>
              {{ item.creator.fullName }}
            </td>
            <td>
              {{ item.recipient.fullName }}
            </td>
            <td>
              {{ $globalizeWillRequestStatus(item.statusId) }}
            </td>
            <td
              v-if="isAccountNotary || isAccountRegistry"
              class="will-request-table__dropdown-td"
            >
              <dropdown :disabled="!item.isManageable">
                <template v-if="isAccountNotary">
                  <template v-if="item.isStatusSubmitted">
                    <button
                      type="button"
                      :title="$t('approve-btn')"
                      :aria-label="$t('approve-btn')"
                      @click.prevent="submitRequest(
                        item.id, OPERATION_TYPES.approve
                      )"
                    >
                      {{ $t('approve-btn') }}
                      <i class="mdi mdi-check" />
                    </button>
                    <button
                      type="button"
                      :title="$t('reject-btn')"
                      :aria-label="$t('reject-btn')"
                      @click.prevent="submitRequest(
                        item.id, OPERATION_TYPES.reject
                      )"
                    >
                      {{ $t('reject-btn') }}
                      <i class="mdi mdi-close" />
                    </button>
                  </template>
                  <button
                    v-else-if="item.isStatusNotified"
                    type="button"
                    :title="$t('release-btn')"
                    :aria-label="$t('release-btn')"
                    @click.prevent="submitRequest(
                      item.id, OPERATION_TYPES.release
                    )"
                  >
                    {{ $t('release-btn') }}
                    <i class="mdi mdi-email-send-outline" />
                  </button>
                </template>
                <button
                  v-if="item.isStatusApproved && isAccountRegistry"
                  type="button"
                  :title="$t('notify-btn')"
                  :aria-label="$t('notify-btn')"
                  @click.prevent="submitRequest(
                    item.id, OPERATION_TYPES.notify
                  )"
                >
                  {{ $t('notify-btn') }}
                  <i class="mdi mdi-shield-check-outline" />
                </button>
              </dropdown>
            </td>
          </tr>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { vuexTypes } from '@/vuex'
import { useWillRequests } from '@/vue/composables'

import Dropdown from '@/vue/common/Dropdown'

const OPERATION_TYPES = {
  reject: 'reject',
  approve: 'approve',
  notify: 'notify',
  release: 'release',
}

export default {
  name: 'will-requests-table',

  components: { Dropdown },

  props: {
    willRequests: {
      type: Array /** {@link WillRequestRecord} **/,
      default: () => ([]),
    },
  },

  emits: ['submit'],

  setup (_, { emit }) {
    const store = useStore()

    const { manageWillRequest } = useWillRequests()

    const isAccountNotary = computed(
      () => store.getters[vuexTypes.isAccountNotary],
    )
    const isAccountRegistry = computed(
      () => store.getters[vuexTypes.isAccountRegistry],
    )

    const submitRequest = async (id, type) => {
      await manageWillRequest(id, type, emit('submit'))
    }

    return {
      OPERATION_TYPES,
      isAccountNotary,
      isAccountRegistry,
      submitRequest,
    }
  },
}
</script>

<style lang="scss" scoped>
.will-request-table__dropdown-td { width: 2rem; }
</style>

<i18n>
{
  "en": {
    "table-head-id": "ID",
    "table-head-creator": "Creator",
    "table-head-recipient": "Recipient",
    "table-head-status": "Status",
    "table-head-action": "Action",
    "reject-btn": "Reject",
    "approve-btn": "Approve",
    "release-btn": "Release",
    "notify-btn": "Notify"
  }
}
</i18n>
