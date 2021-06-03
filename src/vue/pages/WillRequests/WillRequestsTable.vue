<template>
  <div
    class="will-requests-table app__table"
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
        <th v-if="!isAccountGeneral">
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
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
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
            <td v-if="!isAccountGeneral">
              <!-- {{ item.statusId | globalizeWillRequestStatus }} -->
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

export default {
  name: 'will-requests-table',

  props: { willRequests: { type: Array, default: () => ([]) } },

  setup () {
    const store = useStore()
    const isAccountGeneral = computed(
      () => store.getters[vuexTypes.isAccountGeneral],
    )

    return { isAccountGeneral }
  },
}
</script>

<i18n>
{
  "en": {
    "table-head-id": "ID",
    "table-head-creator": "Creator",
    "table-head-recipient": "Recipient",
    "table-head-status": "Status",
    "table-head-action": "Action"
  }
}
</i18n>
