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
        <th>
          {{ $t('table-head-action') }}
        </th>
      </thead>
      <tbody>
        <router-link
          v-for="item in willRequests"
          v-slot="{ navigate }"
          custom
          :to="{ ...$routes.willRequestsDetails, params: { id: item.id } }"
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
              <p
                v-for="recipient in item.recipients"
                class="will-requests-table__recipient"
                :key="recipient.id"
              >
                {{ recipient.fullName }}
              </p>
            </td>
            <td>
              {{ $globalizeWillRequestStatus(item.statusId) }}
            </td>
            <td class="will-request-table__dropdown-td">
              <dropdown :disabled="isActionsDisabled(item)">
                <template v-if="isAccountNotary">
                  <template v-if="item.isStatusSubmitted">
                    <button
                      type="button"
                      :title="$t('approve-btn')"
                      :aria-label="$t('approve-btn')"
                      @click.prevent="submitRequest(
                        item.id, WILL_REQUEST_OPERATIONS.approve
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
                        item.id, WILL_REQUEST_OPERATIONS.reject
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
                      item.id, WILL_REQUEST_OPERATIONS.release
                    )"
                  >
                    {{ $t('release-btn') }}
                    <i class="mdi mdi-email-send-outline" />
                  </button>
                </template>
                <button
                  v-else-if="item.isStatusApproved && isAccountRegistry"
                  type="button"
                  :title="$t('notify-btn')"
                  :aria-label="$t('notify-btn')"
                  @click.prevent="submitRequest(
                    item.id, WILL_REQUEST_OPERATIONS.notify
                  )"
                >
                  {{ $t('notify-btn') }}
                  <i class="mdi mdi-shield-check-outline" />
                </button>
                <button
                  v-if="isAccountGeneral"
                  type="button"
                  :title="$t('delete-btn')"
                  :aria-label="$t('delete-btn')"
                  @click.prevent="$emit(
                    'delete-will-request',
                    { id: item.id, type: WILL_REQUEST_OPERATIONS.delete }
                  )"
                >
                  {{ $t('delete-btn') }}
                  <i class="mdi mdi-delete-outline" />
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
import { computed, ref } from 'vue'
import { vuexTypes } from '@/vuex'
import { manageWillRequest } from '@/js/helpers/will-requests-manager'
import { WILL_REQUEST_OPERATIONS } from '@/js/const/will-request-operations.const'

import Dropdown from '@/vue/common/Dropdown'

export default {
  name: 'will-requests-table',

  components: { Dropdown },

  props: {
    willRequests: {
      type: Array /** {@link WillRequestRecord} **/,
      default: () => ([]),
    },
  },

  emits: ['delete-will-request'],

  setup () {
    const store = useStore()
    const isDisabled = ref(false)

    const isAccountNotary = computed(
      () => store.getters[vuexTypes.isAccountNotary],
    )
    const isAccountRegistry = computed(
      () => store.getters[vuexTypes.isAccountRegistry],
    )
    const isAccountGeneral = computed(
      () => store.getters[vuexTypes.isAccountGeneral],
    )

    const submitRequest = async (id, type) => {
      isDisabled.value = true
      await manageWillRequest(id, type)
      isDisabled.value = false
    }

    const isActionsDisabled = item => {
      let isStatusWrong = false
      if (isAccountNotary.value) isStatusWrong = item.isStatusApproved
      if (isAccountRegistry.value) isStatusWrong = !item.isStatusApproved

      return isAccountGeneral.value
        ? isDisabled.value || item.isStatusDeleted
        : !item.isManageable || isDisabled.value || isStatusWrong
    }

    return {
      WILL_REQUEST_OPERATIONS,
      isAccountNotary,
      isAccountRegistry,
      isAccountGeneral,
      submitRequest,
      isActionsDisabled,
    }
  },
}
</script>

<style lang="scss" scoped>
.will-request-table__dropdown-td { width: 2rem; }

.will-requests-table__recipient {
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
    "notify-btn": "Notify",
    "delete-btn": "Delete"
  }
}
</i18n>
