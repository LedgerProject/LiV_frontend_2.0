<template>
  <div
    class="app__table will-requests-details-table-request"
    :class="['app__table--with-shadow app__table--last-td-to-right']"
  >
    <table>
      <tbody>
        <tr>
          <td>
            {{ $t('id-title') }}
          </td>
          <td>
            {{ request.id }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('status-title') }}
          </td>
          <td>
            {{ $globalizeWillRequestStatus(request.statusId) }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('document-hash-title') }}
          </td>
          <td>
            {{ request.documentHash }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { WillRequestRecord } from '@/js/records/will-request.record'

export default {
  name: 'will-requests-details-table-request',

  props: { request: { type: WillRequestRecord, required: true } },
}
</script>

<i18n>
{
  "en": {
    "id-title": "ID",
    "status-title": "Status",
    "document-hash-title": "Document Hash"
  }
}
</i18n>
