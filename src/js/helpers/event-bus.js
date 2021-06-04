import mitt from 'mitt'
import log from 'loglevel'

const emitter = mitt()

class EventBus {
  constructor () {
    this._backlog = []
  }

  on (eventName, handlerFn) {
    if (!this.eventExists(eventName)) {
      throw new Error(`EventBus.list has no ${eventName} event`)
    }
    const backloggedEvents = this._backlog.filter(e => e.name === eventName)
    for (const [index, event] of backloggedEvents.entries()) {
      handlerFn(event.payload)
      this._backlog.splice(index, 1)
      log.debug(`Event ${eventName} is backlogged. Handling...`)
    }
    emitter.on(eventName, handlerFn)
  }

  emit (eventName, payload) {
    if (!this.eventExists(eventName)) {
      throw new Error(`EventBus.list has no ${eventName} event`)
    }

    emitter.emit(eventName, payload)
  }

  resetEvent (eventName, handlerFn) {
    if (!this.eventExists(eventName)) {
      throw new Error(`EventBus.list has no ${eventName} event`)
    }
    emitter.off(eventName, handlerFn)
    this._backlog = []
  }

  success (payload) { this.emit(this.eventList.success, payload) }

  warning (payload) { this.emit(this.eventList.warning, payload) }

  error (payload) { this.emit(this.eventList.error, payload) }

  info (payload) { this.emit(this.eventList.info, payload) }

  get eventList () {
    return {
      success: 'success',
      warning: 'warning',
      error: 'error',
      info: 'info',
      createWillRequest: 'create-will-request',
    }
  }

  eventExists (eventName) {
    return Object
      .values(this.eventList)
      .includes(eventName)
  }
}

export const Bus = new EventBus()
