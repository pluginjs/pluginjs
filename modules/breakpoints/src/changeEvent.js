import { isFunction } from '@pluginjs/is'

export default {
  current: null,
  listeners: [],
  trigger(size) {
    const previous = this.current
    this.current = size
    this.listeners.forEach((obj, i) => {
      obj.listener.call(
        {
          current: size,
          previous
        },
        obj.data
      )

      if (obj.one) {
        delete this.listeners[i]
      }
    })
  },
  one(data, listener) {
    return this.on(data, listener, true)
  },
  on(data, listener, /* INTERNAL*/ one = false) {
    if (typeof listener === 'undefined' && isFunction(data)) {
      listener = data
      data = undefined
    }
    if (isFunction(listener)) {
      this.listeners.push({
        data,
        listener,
        one
      })
    }
  },
  off(listener) {
    if (typeof listener === 'undefined') {
      this.listeners = []
    } else {
      this.listeners = this.listeners.filter(obj => obj.listener !== listener)
    }
  }
}
