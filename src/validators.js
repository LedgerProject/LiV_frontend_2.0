import isEmpty from 'lodash/isEmpty'

export const required = value => {
  if (Array.isArray(value)) {
    return !!value.length
  } else if (typeof value === 'object' && value !== null) {
    return !isEmpty(value)
  } else {
    return !!value
  }
}

export const minLength = min => value => `${value}`.length >= min

export const maxLength = max => value => `${value}`.length <= max

export const alphaNum = val => /^[a-z0-9]+$/i.test(val)

export const fullName = val => /^[a-zA-Z][0-9a-zA-Z .,'"-]*$/.test(val)
