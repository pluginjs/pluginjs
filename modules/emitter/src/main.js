export default class Emitter {
  constructor() {
    this.listeners = {}
    this.sortedListeners = {}
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

      if (result === false) {
        return false
      }
    }

    return true
  }

  on(event, listener, context, priority) {
    return this.addListener(event, listener, context, priority)
  }

  once(event, listener, context, priority) {
    return this.addOneTimeListener(event, listener, context, priority)
  }

  off(event, listener) {
    if (typeof listener === 'undefined') {
      return this.removeAllListeners(event)
    }

    return this.removeListener(event, listener)
  }

  /* Lower numbers correspond with earlier execution,
  /* and functions with the same priority are executed
  /* in the order in which they were added to the action. */
  addListener(event, listener, context = null, priority = 10) {
    this.ensureListener(listener)

    if (!this.listeners[event]) {
      this.listeners[event] = {}
    }
    if (!this.listeners[event][priority]) {
      this.listeners[event][priority] = []
    }

    this.listeners[event][priority].push({
      context,
      listener
    })
    this.clearSortedListeners(event)

    return this
  }

  addOneTimeListener(event, listener, context, priority = 10) {
    const that = this
    function wrapper(...args) {
      that.removeListener(event, wrapper)

      return listener(...args)
    }

    this.addListener(event, wrapper, context, priority)

    return this
  }

  removeListener(event, listener) {
    this.clearSortedListeners(event)
    const listeners = this.hasListeners(event) ? this.listeners[event] : []

    for (const priority in listeners) {
      if (Object.prototype.hasOwnProperty.call(listeners, priority)) {
        listeners[priority] = listeners[priority].filter(
          value => value.listener !== listener
        )

        if (listeners[priority].length === 0) {
          delete listeners[priority]
        }
      }
    }

    this.listeners[event] = listeners

    return this
  }

  removeAllListeners(event) {
    this.clearSortedListeners(event)

    if (this.hasListeners(event)) {
      delete this.listeners[event]
    }

    return this
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

  hasListeners(event) {
    if (
      !this.listeners[event] ||
      Object.keys(this.listeners[event]).length === 0
    ) {
      return false
    }

    return true
  }

  getListeners(event) {
    if (!this.sortedListeners.hasOwnProperty(event)) {
      this.sortedListeners[event] = this.getSortedListeners(event)
    }

    return this.sortedListeners[event]
  }

  getSortedListeners(event) {
    if (!this.hasListeners(event)) {
      return []
    }

    const listeners = this.listeners[event]

    const priorities = Object.keys(listeners)
    priorities.sort((a, b) => a - b)

    let sortedlisteners = []
    for (let i = 0; i < priorities.length; i++) {
      sortedlisteners = sortedlisteners.concat(listeners[priorities[i]])
    }

    return sortedlisteners
  }

  clearSortedListeners(event) {
    delete this.sortedListeners[event]
  }
}
