import moment from 'moment'
import isEmpty from 'lodash/isEmpty'

import { useI18n } from 'vue-i18n'

// TODO: fix retranslating error message after change localization language

export function useValidators () {
  const { t } = useI18n({ useScope: 'global' })

  const required = value => {
    let isRequired
    if (Array.isArray(value)) {
      isRequired = !!value.length
    } else if (typeof value === 'object' && value !== null) {
      isRequired = !isEmpty(value)
    } else {
      isRequired = !!value
    }

    return isRequired ? '' : t('validation.field-error_required')
  }

  const minLength = min => value => `${value}`.length >= min
    ? ''
    : t('validation.field-error_minLength', { minLength: min })

  const maxLength = max => value => `${value}`.length <= max
    ? ''
    : t('validation.field-error_maxLength', { maxLength: max })

  const alphaNum = val => /^[a-z0-9]+$/i.test(val)
    ? ''
    : t('validation.field-error_alphaNum')

  const alpha = val => /^[a-zA-Z]+$/i.test(val)
    ? ''
    : t('validation.field-error_alpha')

  const birthday = val => moment(val, 'YYYY-MM-DD', true).isValid()
    ? ''
    : t('validation.field-error_birthday')

  return { required, minLength, maxLength, alphaNum, alpha, birthday }
}
