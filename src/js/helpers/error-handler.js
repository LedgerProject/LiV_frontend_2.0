import { errors } from '@/js/errors'
import { Bus } from '@/js/helpers/event-bus'
import log from 'loglevel'

export class ErrorHandler {
  static process (error, translationId = '', errorTrackerConfig = {}) {
    const isFeedback = error.constructor === errors.UserFeedbackError

    const handledError = ErrorHandler.handleError(error)
    const { messageArgs } = errorTrackerConfig
    const msgTrId =
      translationId || ErrorHandler._getTranslationId(handledError)
    if (!isFeedback) Bus.error({ messageId: msgTrId, messageArgs })
    errorTrackerConfig.translationId = msgTrId
    errorTrackerConfig.isFeedback = isFeedback
    ErrorHandler.processWithoutFeedback(handledError, errorTrackerConfig)
  }

  static handleError (error) {
    const errorData = error?.response?.data

    if (errorData === 'Invalid credentials') {
      return new errors.WrongCredentialsError(error)
    } else {
      return error
    }
  }

  static processWithoutFeedback (error, errorTrackerConfig = {}) {
    const { isSkipTrack = false, isFeedback } = errorTrackerConfig

    if (!isFeedback && !isSkipTrack) log.error(error)
  }

  static _getTranslationId (error) {
    let translationId

    switch (error.constructor) {
      case errors.NetworkError:
        translationId = 'errors.network'
        break
      case errors.WrongCredentialsError:
        translationId = 'errors.wrong-credentials'
        break
      default:
        translationId = 'errors.default'
    }

    return translationId
  }
}
