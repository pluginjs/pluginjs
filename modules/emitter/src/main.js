import SimpleEmitter from '@pluginjs/simple-emitter'

export default class Emitter extends SimpleEmitter {
  constructor() {
    super()
    this.namespaces = {}
  }

  addListener(event, listener, context = null, one = false) {
    this.ensureListener(listener)

    const { eventName, namespace } = this.constructor.parseEvent(event)
    if (!eventName) {
      throw new Error('Event should not be null.')
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = {}
    }

    if (!namespace) {
      this.addToEvent(eventName, context, listener, one)
    } else {
      this.addToEventWithNamespace(eventName, namespace, context, listener, one)
      this.addToNamespace(eventName, namespace)
    }

    return this
  }

  removeListener(event, listener) {
    if (this.hasListeners(event)) {
      const { eventName, namespace } = this.constructor.parseEvent(event)

      switch (true) {
        case Boolean(!namespace && eventName): {
          this.filterListeners(eventName, '*', listener)
          break
        }

        case Boolean(!eventName && namespace): {
          const events = this.namespaces[namespace]
          for (let i = 0; i < events.length; i++) {
            this.filterListeners(events[i], namespace, listener)
          }
          for (let i = 0; i < events.length; i++) {
            if (
              !Object.prototype.hasOwnProperty.call(
                this.listeners[events[i]],
                namespace
              )
            ) {
              this.removeEventInNamespaces(events[i], namespace)
            }
          }
          break
        }

        case Boolean(eventName && namespace): {
          const callback = this.removeEventInNamespaces(eventName, namespace)
          this.filterListeners(eventName, namespace, listener, callback)
          break
        }

        default: {
          break
        }
      }
    }

    return this
  }

  removeAllListeners(event) {
    if (this.hasListeners(event)) {
      const { eventName, namespace } = this.constructor.parseEvent(event)

      switch (true) {
        case Boolean(!namespace && eventName): {
          const keys = Object.keys(this.listeners[eventName])
          keys.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(this.namespaces, key)) {
              this.removeEventInNamespaces(eventName, key)
            }
          })
          delete this.listeners[eventName]
          break
        }

        case Boolean(!eventName && namespace): {
          const events = this.namespaces[namespace]
          for (let i = 0; i < events.length; i++) {
            delete this.listeners[events[i]][namespace]
          }
          delete this.namespaces[namespace]
          break
        }

        case Boolean(eventName && namespace): {
          this.removeEventInNamespaces(eventName, namespace)
          delete this.listeners[eventName][namespace]
          break
        }

        default:
          break
      }
    }

    return this
  }

  hasListeners(event) {
    const { eventName, namespace } = this.constructor.parseEvent(event)
    if (!namespace && eventName) {
      if (
        !this.listeners[eventName] ||
        Object.keys(this.listeners[eventName]).length === 0
      ) {
        return false
      }
      return true
    }

    if (!eventName && namespace) {
      if (
        !this.namespaces[namespace] ||
        Object.keys(this.namespaces[namespace]).length === 0
      ) {
        return false
      }
      return true
    }

    if (eventName && namespace) {
      if (
        !this.listeners[eventName] ||
        !this.listeners[eventName][namespace] ||
        this.listeners[eventName][namespace].length === 0
      ) {
        return false
      }
      return true
    }

    return false
  }

  getListeners(event) {
    if (this.hasListeners(event)) {
      const { eventName, namespace } = this.constructor.parseEvent(event)
      let sortedListeners = []

      switch (true) {
        case Boolean(!namespace && eventName): {
          const keys = Object.keys(this.listeners[eventName])
          keys.forEach(key => {
            for (let i = 0; i < this.listeners[eventName][key].length; i++) {
              sortedListeners = sortedListeners.concat(
                this.listeners[eventName][key][i]
              )
            }
          })
          return sortedListeners
        }

        case Boolean(!eventName && namespace): {
          const events = this.namespaces[namespace]
          for (let i = 0; i < events.length; i++) {
            for (
              let j = 0;
              j < this.listeners[events[i]][namespace].length;
              j++
            ) {
              sortedListeners = sortedListeners.concat(
                this.listeners[events[i]][namespace][j]
              )
            }
          }
          return sortedListeners
        }

        case Boolean(eventName && namespace): {
          const namespaces = this.listeners[eventName]
          if (Object.prototype.hasOwnProperty.call(namespaces, namespace)) {
            for (let i = 0; i < namespaces[namespace].length; i++) {
              sortedListeners = sortedListeners.concat(namespaces[namespace][i])
            }
            return sortedListeners
          }
          return sortedListeners
        }

        default:
          break
      }
    }
    return []
  }

  filterListeners(eventName, namespace, listener, callback) {
    const listeners = this.listeners[eventName]

    if (typeof listeners[namespace] !== 'undefined') {
      listeners[namespace] = listeners[namespace].filter(
        value => value.listener !== listener
      )
      if (listeners[namespace].length === 0) {
        if (callback) {
          callback()
        }
        delete listeners[namespace]
      }
    }

    this.listeners[eventName] = listeners
  }

  removeEventInNamespaces(event, namespace) {
    let i = this.namespaces[namespace].length
    while (i--) {
      if (this.namespaces[namespace][i] === event) {
        this.namespaces[namespace].splice(i, 1)
      }
    }
  }

  addToEvent(eventName, context, listener, one = false) {
    if (!this.listeners[eventName]['*']) {
      this.listeners[eventName]['*'] = []
    }
    this.listeners[eventName]['*'].push({
      context,
      listener,
      one
    })
  }

  addToEventWithNamespace(
    eventName,
    namespace,
    context,
    listener,
    one = false
  ) {
    if (!this.listeners[eventName][namespace]) {
      this.listeners[eventName][namespace] = []
    }

    this.listeners[eventName][namespace].push({
      context,
      listener,
      one
    })
  }

  addToNamespace(eventName, namespace) {
    if (!this.namespaces[namespace]) {
      this.namespaces[namespace] = []
    }
    if (!this.checkNamespace(eventName, namespace)) {
      this.namespaces[namespace].push(eventName)
    }
  }

  checkNamespace(eventName, namespace) {
    for (let i = 0; i < this.namespaces[namespace].length; i++) {
      if (this.namespaces[namespace][i] === eventName) {
        return true
      }
    }
    return false
  }

  static parseEvent(event) {
    const delimiter = '.'

    if (typeof event !== 'string') {
      event = event.toString()
    }

    if (event.indexOf(delimiter) === -1) {
      const eventName = event.trim().length > 1 ? event : null
      const namespace = null
      return { eventName, namespace }
    }

    const eventParts = event.split(delimiter)
    const eventName = eventParts[0].trim().length === 0 ? null : eventParts[0]
    const namespace = eventParts[1].trim().length === 0 ? null : eventParts[1]
    return { eventName, namespace }
  }
}
