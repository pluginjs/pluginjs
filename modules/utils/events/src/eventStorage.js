import { parent } from '@pluginjs/dom'

const outputIdentity = identity => {
  if (!identity) {
    return { type: 'self', value: '' }
  }
  if (typeof identity === 'string') {
    return { type: 'selector', value: identity }
  }

  return identity
}

const tupleToStyleSelector = (tuple, prefix) => {
  if (typeof tuple === 'string') {
    return tuple
  }
  return Object.entries(tuple)
    .map(kv => `[${prefix}${kv.join('=')}]`)
    .join('')
}

const dispatch = event => {
  const { target, currentTarget } = event
  const eventStorage = EventStorage.getEventStorage(currentTarget)
  const eventName = event.type

  const attrVerify = {
    self: node => node === currentTarget,
    class: (node, value) => node.matches(`.${value}`),
    selector: (node, value) => node.matches(value),
    id: (node, value) => node.matches(`#${value}`),
    tagName: (node, value) => node.matches(value),
    dom: (node, value) => node === value,
    dataset: (node, value) =>
      node.matches(tupleToStyleSelector(value, 'data-')),
    attribute: (node, value) => node.matches(tupleToStyleSelector(value)),
    func: (node, value) => Boolean(value(node))
  }

  const nodeTreeCheck = (node, result = []) => {
    if (!node) {
      return result
    }
    if (currentTarget !== window && !currentTarget.contains(node)) {
      return result
    }
    const matchEventList = eventStorage.listeners[eventName].filter(
      ({ identity }) => {
        const { type, value } = identity
        const identityMapper = attrVerify[type]
        if (identityMapper && identityMapper(node, value)) {
          return true
        }
        return false
      }
    )
    return nodeTreeCheck(parent(node), result.concat(matchEventList))
  }
  // nodeTreeCheck(target).map(e => console.log(e.handler.toString()))
  nodeTreeCheck(target).reduce(
    (result, { handler }) => result !== false && handler(event),
    true
  )
}

class EventStorage {
  constructor(element) {
    this.element = element
    this.listeners = {}
  }

  on({ identity, handler, eventName, namespace }) {
    this.ensureHandler(handler)

    if (!this.hasListeners(eventName)) {
      this.createEventListener(eventName)
    }

    if (this.checkRepeats(eventName, handler)) {
      return
    }

    this.listeners[eventName].push({ identity, handler, namespace })
  }

  once({ identity, handler, eventName, namespace }) {
    this.ensureHandler(handler)

    if (!this.hasListeners(eventName)) {
      this.createEventListener(eventName)
    }

    const callback = event => {
      this.removeListener(eventName, callback)

      return handler(event)
    }

    this.listeners[eventName].push({ identity, handler: callback, namespace })
  }

  off(_eventName, handler) {
    if (typeof handler === 'undefined') {
      return this.removeAllListeners(_eventName)
    }
    return this.removeListener(_eventName, handler)
  }

  trigger(eventName, data) {
    const event = new CustomEvent(eventName, {
      detail: data
    })
    this.element.dispatchEvent(event)
  }

  clear() {
    Object.entries(this.listeners).map(([key, _]) =>
      this.deleteEventListener(key)
    )

    this.listener = {}
  }

  removeListener(_eventName, handler) {
    const [eventName, namespace] = _eventName.split('.')
    //   .example  || click  || click.example
    if (!eventName && namespace) {
      Object.entries(this.listeners).forEach(([key, _]) => {
        this.listeners[key] = this.listeners[key].filter(
          eventTuple =>
            eventTuple.handler !== handler || eventTuple.namespace !== namespace
        )

        if (this.listeners[key].length === 0) {
          this.deleteEventListener(key)
        }
      })
    } else if (eventName && !namespace) {
      // console.log('eventName')
      this.listeners[eventName] = this.listeners[eventName].filter(
        eventTuple => eventTuple.handler !== handler
      )

      if (this.listeners[eventName].length === 0) {
        this.deleteEventListener(eventName)
      }
    } else if (eventName && namespace) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        eventTuple =>
          eventTuple.handler !== handler || eventTuple.namespace !== namespace
      )

      if (this.listeners[eventName].length === 0) {
        this.deleteEventListener(eventName)
      }
    }
  }

  removeAllListeners(_eventName) {
    const [eventName, namespace] = _eventName.split('.')
    //   .example  || click  || click.example
    if (!eventName && namespace) {
      Object.entries(this.listeners).forEach(([key, _]) => {
        this.listeners[key] = this.listeners[key].filter(
          eventTuple => eventTuple.namespace !== namespace
        )

        if (this.listeners[key].length === 0) {
          this.deleteEventListener(key)
        }
      })
    } else if (eventName && !namespace) {
      this.deleteEventListener(eventName)
    } else if (eventName && namespace && this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        eventTuple => eventTuple.namespace !== namespace
      )

      if (this.listeners[eventName].length === 0) {
        this.deleteEventListener(eventName)
      }
    }

    return this
  }

  createEventListener(eventName) {
    this.listeners[eventName] = []
    this.element.addEventListener(eventName, dispatch, false)
  }

  deleteEventListener(eventName) {
    this.element.removeEventListener(eventName, dispatch)
    delete this.listeners[eventName]
  }

  checkRepeats(eventName, handler) {
    return (
      this.listeners[eventName].filter(value => value.handler === handler)
        .length !== 0
    )
  }

  hasListeners(eventName) {
    if (
      !this.listeners[eventName] ||
      Object.keys(this.listeners[eventName]).length === 0
    ) {
      return false
    }

    return true
  }

  ensureHandler(handler) {
    const type = typeof handler
    if (type === 'function') {
      return handler
    }
    throw new TypeError(
      `Listeners should be function or closure. Received type: ${type}`
    )
  }

  static of({ type: _eventName, identity, handler }, element) {
    if (!element.__eventStorage) {
      element.__eventStorage = new this(element)
    }

    const [eventName, namespace] = _eventName.split('.')

    const eventStorage = this.getEventStorage(element)

    eventStorage.on({
      identity: outputIdentity(identity),
      handler,
      eventName,
      namespace
    })
  }

  static once({ type: _eventName, identity, handler }, element) {
    if (!element.__eventStorage) {
      element.__eventStorage = new this(element)
    }

    const [eventName, namespace] = _eventName.split('.')

    const eventStorage = this.getEventStorage(element)

    eventStorage.once({
      identity: outputIdentity(identity),
      handler,
      eventName,
      namespace
    })
  }

  static delete(options, element) {
    const eventStorage = this.getEventStorage(element)
    if (!eventStorage) {
      return
    }

    const { type: _eventName = options, handler } = options
    eventStorage.off(_eventName, handler)
  }

  static getEventStorage(element) {
    return element.__eventStorage
  }
}

export default EventStorage
