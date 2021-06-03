import { USER_ROLES } from '@/js/const/user-roles.const'
import { useI18n } from 'vue-i18n'

export function useGlobalizeUserRole () {
  const { t } = useI18n({ useScope: 'global' })

  const globalizeUserRole = (value) => {
    switch (+value) {
      case USER_ROLES.general:
        return t('filters.user-roles.general')
      case USER_ROLES.registry:
        return t('filters.user-roles.registry')
      case USER_ROLES.notary:
        return t('filters.user-roles.notary')
      default:
        return t('filters.user-roles.unknown')
    }
  }

  return { globalizeUserRole }
}
