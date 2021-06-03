import { useI18n } from 'vue-i18n'
import { WILL_REQUEST_STATES } from '@/js/const/will-request-states.const'

export function useGlobalizeWillRequestStatus () {
  const { t } = useI18n({ useScope: 'global' })

  const globalizeWillRequestStatus = (value) => {
    switch (+value) {
      case WILL_REQUEST_STATES.deleted:
        return t('filters.will-request-statuses.deleted')
      case WILL_REQUEST_STATES.rejected:
        return t('filters.will-request-statuses.rejected')
      case WILL_REQUEST_STATES.submitted:
        return t('filters.will-request-statuses.submitted')
      case WILL_REQUEST_STATES.approved:
        return t('filters.will-request-statuses.approved')
      case WILL_REQUEST_STATES.notified:
        return t('filters.will-request-statuses.notified')
      case WILL_REQUEST_STATES.released:
        return t('filters.will-request-statuses.released')
      default:
        return t('filters.will-request-statuses.unknown')
    }
  }

  return { globalizeWillRequestStatus }
}
