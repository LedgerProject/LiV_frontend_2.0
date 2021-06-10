import { ref, watch } from 'vue'

export function useField (field) {
  const isValid = ref(true)
  const value = ref(field.value)
  const touched = ref(false)
  const errorMessage = ref('')

  const setFieldErrorMessage = (message = '') => {
    if (touched.value) { errorMessage.value = message }
  }

  const reAssign = val => {
    isValid.value = true
    setFieldErrorMessage()
    Object.keys(field.validators ?? {}).forEach(key => {
      if (!field.validators[key]) return
      const validatorErrorMessage = field.validators[key](val)

      if (validatorErrorMessage) {
        isValid.value = false
        setFieldErrorMessage(validatorErrorMessage)
      }
    })
  }

  const blur = () => {
    touched.value = true
    if (!isValid.value) reAssign(value.value)
  }

  watch(value, reAssign)

  reAssign(value.value)

  return {
    value,
    isValid,
    errorMessage,
    touched,
    blur,
  }
}
