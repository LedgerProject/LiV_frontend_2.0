import isObject from 'lodash/isObject'

import { useField } from '@/vue/composables'
import { reactive, ref, computed } from 'vue'

/** Hook for handling form state
 * @param {Object} init - form object
 * @param {Object} init.fieldName - field of the form, can has any name
 * @param {string|integer|boolean|array|object} init.fieldName.value - value
 * @param {Object} init.fieldName.validators - object with validators, like
 * required, minLength etc.
 * @returns {Object} form - reactive form object
 *
 * @example
 * {
 *    displayName: {
 *      value: '',
 *      validators: {
 *        minLength: minLength(MIN_FIELD_LENGTH.profileName),
 *        maxLength: maxLength(MAX_FIELD_LENGTH.profileName),
 *        required,
 *        alphaNum,
 *      },
 *    },
 * }
 */

export function useForm (init) {
  const form = reactive({})
  const isFormDisabled = ref(false)

  for (const [key, value] of Object.entries(init)) {
    form[key] = Array.isArray(value)
      ? value.map(i => useField(i))
      : useField(value)
  }

  const disableForm = () => { isFormDisabled.value = true }
  const enableForm = () => { isFormDisabled.value = false }

  const isAllFieldsValid = computed(() => {
    const errors = Object.values(form).reduce((acc, field) => {
      if (Array.isArray(field)) {
        Object.values(field).forEach(inner => { if (!inner.isValid) acc++ })
      } else if (!field.isValid) {
        acc++
      }

      return acc
    }, 0)

    return !errors
  })

  const touchForm = () => Object.keys(form).forEach(key => {
    return Array.isArray(form[key])
      ? form[key].forEach(i => i.blur())
      : form[key].blur()
  })

  const isFormValid = () => {
    touchForm()

    return isAllFieldsValid.value
  }

  const clearFields = (overriddenFields = {}) => {
    for (const [fieldName, fieldValue] of Object.entries(form)) {
      if (overriddenFields[fieldName]) {
        form[fieldName].value = overriddenFields[fieldName]
      } else if (typeof fieldValue.value === 'string') {
        form[fieldName].value = ''
        fieldValue.touched = false
      } else if (typeof fieldValue.value === 'number') {
        form[fieldValue].value = 0
        form[fieldValue].touched = false
      } else if (Array.isArray(fieldValue.value)) {
        form[fieldName].value = []
        form[fieldValue].touched = false
      } else if (isObject(fieldValue.value)) {
        form[fieldName].value = {}
        form[fieldValue].touched = false
      } else {
        continue
      }
    }
  }

  const addField = (formFieldKey, field) => {
    if (!formFieldKey || !field) return

    if (Array.isArray(form[formFieldKey])) {
      form[formFieldKey].push(useField(field))
    } else {
      form[formFieldKey] = useField(field)
    }
  }

  const removeField = (formFieldKey, index) => {
    if (!formFieldKey) return

    if (Number.isInteger(index) && Array.isArray(form[formFieldKey])) {
      form[formFieldKey].splice(index, 1)
    } else {
      delete form[formFieldKey]
    }
  }

  return {
    form,
    isFormDisabled,
    isFormValid,
    disableForm,
    enableForm,
    clearFields,
    addField,
    removeField,
  }
}
