import NProgress from 'nprogress'

import { ref } from 'vue'
import { api } from '@/api'
import { WILL_REQUEST_OPERATIONS } from '@/js/const/will-request-operations.const'
import { Bus } from '@/js/helpers/event-bus'
import { ErrorHandler } from '@/js/helpers/error-handler'

export function useWillRequests () {
  const isDisabled = ref(false)

  const notifyWillRequest = async willRequestId => {
    await api.get(`/will-requests/notify/${willRequestId}`)
  }

  const releaseWillRequest = async willRequestId => {
    await api.get(`/will-requests/release/${willRequestId}`)
  }

  const rejectWillRequest = async willRequestId => {
    await api.post('/will-requests/reject', [
      { willRequestId },
    ])
  }

  const approveWillRequest = async willRequestId => {
    await api.post('/will-requests/approve', [
      { willRequestId },
    ])
  }

  const executeOperationRequest = async (id, type) => {
    switch (type) {
      case WILL_REQUEST_OPERATIONS.approve:
        await approveWillRequest(id)
        break
      case WILL_REQUEST_OPERATIONS.reject:
        await rejectWillRequest(id)
        break
      case WILL_REQUEST_OPERATIONS.notify:
        await notifyWillRequest(id)
        break
      case WILL_REQUEST_OPERATIONS.release:
        await releaseWillRequest(id)
        break
    }
  }

  const manageWillRequest = async (id, type) => {
    isDisabled.value = true
    NProgress.start()
    try {
      await executeOperationRequest(id, type)
      Bus.success(`notifications.request-${type}-success`)
    } catch (e) {
      ErrorHandler.process(e)
    }
    NProgress.done()
    isDisabled.value = false
  }

  return { manageWillRequest, isDisabled }
}
