export default class SimpleEmitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    const listeners = this.getListeners(event)
    for (let i = 0; i < listeners.length; i++) {
      let context = null

      if (listeners[i].context !== null) {
        context = listeners[i].context
      } else {
        context = { type: event }
      }

      const result = listeners[i].listener.apply(context, args)

      if (listeners[i].one) {
        this.removeListener(event, listeners[i].listener)
      }

      if (result === false) {
        return false
      }
    }

    return true
  }

  on(event, listener, context) {
    return this.addListener(event, listener, context)
  }

  once(event, listener, context) {
    return this.addListenerOnce(event, listener, context)
  }

  off(event, listener) {
    if (typeof listener === 'undefined') {
      return this.removeAllListeners(event)
    }

    return this.removeListener(event, listener)
  }

  addListener(event, listener, context = null, one = false) {
    this.ensureListener(listener)

    if (!this.hasListeners(event)) {
      this.listeners[event] = []
    }

    this.listeners[event].push({
      context,
      listener,
      one
    })

    return this
  }

  addListenerOnce(event, listener, context) {
    return this.addListener(event, listener, context, true)
  }

  removeListener(event, listener) {
    if (this.hasListeners(event)) {
      this.listeners[event] = this.listeners[event].filter(
        value => value.listener !== listener
      )

      if (this.listeners[event].length === 0) {
        delete this.listeners[event]
      }
    }

    return this
  }

  removeAllListeners(event) {
    if (this.hasListeners(event)) {
      delete this.listeners[event]
    }

    return this
  }

  hasListeners(event) {
    if (!this.listeners[event] || this.listeners[event].length === 0) {
      return false
    }

    return true
  }

  getListeners(event) {
    if (this.hasListeners(event)) {
      return this.listeners[event]
    }

    return []
  }

  ensureListener(listener) {
    const type = typeof listener
    if (type === 'function') {
      return listener
    }
    throw new TypeError(
      `Listeners should be function or closure. Received type: ${type}`
    )
  }
}
