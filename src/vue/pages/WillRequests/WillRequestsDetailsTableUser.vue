<template>
  <div
    class="app__table will-requests-details-table-user"
    :class="['app__table--with-shadow', 'app__table--last-td-to-right']"
  >
    <table>
      <tbody>
        <tr>
          <td>
            {{ $t('email-title') }}
          </td>
          <td>
            {{ user.email }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('role-title') }}
          </td>
          <td>
            {{ $globalizeUserRole(user.role) }}
          </td>
        </tr>
        <tr v-if="user.firstName && user.secondName && user.lastName">
          <td>
            {{ $t('full-name-title') }}
          </td>
          <td>
            {{ user.fullName }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('birthday-title') }}
          </td>
          <td>
            {{ user.birthday }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('address-title') }}
          </td>
          <td>
            {{ user.address }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('passport-title') }}
          </td>
          <td>
            {{ user.passportId }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AccountRecord } from '@/js/records/account.record'

export default {
  name: 'will-requests-details-table-user',

  props: { user: { type: AccountRecord, required: true } },
}
</script>

<i18n>
{
  "en": {
    "email-title": "Email",
    "role-title": "Role",
    "address-title": "Address",
    "full-name-title": "Full Name",
    "passport-title": "Passport Number",
    "birthday-title": "Birthday"
  }
}
</i18n>
