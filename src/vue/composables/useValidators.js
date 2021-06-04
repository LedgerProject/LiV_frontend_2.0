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
      isRequired = isEmpty(value)
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

  const email = val => {
    // eslint-disable-next-line no-control-regex
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return regex.test(val)
      ? ''
      : t('validation.field-error_email')
  }

  return { required, minLength, maxLength, alphaNum, alpha, birthday, email }
}
