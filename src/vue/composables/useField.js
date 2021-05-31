import { ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const not = value => !value

export function useField (field) {
  const { t } = useI18n({ useScope: 'global' })

  const isValid = ref(true)
  const value = ref(field.value)
  const touched = ref(false)
  const errors = reactive({})
  const errorMessage = ref('')

  const setFieldErrorMessage = (validatorName, validatorArgs) => {
    if (touched.value) {
      if (validatorName && validatorArgs) {
        errorMessage.value = t(
          `validation.field-error_${validatorName}`,
          { [validatorName]: validatorArgs },
        )
      } else if (validatorName) {
        errorMessage.value = t(`validation.field-error_${validatorName}`)
      } else {
        errorMessage.value = ''
      }
    }
  }

  const reAssign = val => {
    isValid.value = true
    Object.keys(field.validators ?? {}).forEach(validator => {
      const isFieldValid = field.validators[validator](val)
      errors[validator] = not(isFieldValid)

      if (not(isFieldValid)) {
        isValid.value = false
        setFieldErrorMessage(validator, field.validatorsArgs?.[validator])
      }
    })
  }

  const blur = () => {
    touched.value = true
    if (!isValid.value) reAssign(value.value)
  }

  watch(value, reAssign)
  watch(isValid, (value) => value && setFieldErrorMessage())

  reAssign(value.value)

  return {
    value,
    isValid,
    errors,
    errorMessage,
    touched,
    blur,
  }
}
