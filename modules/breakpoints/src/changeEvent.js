import Callbacks from './callbacks'
import { isFunction } from '@pluginjs/is'

export default {
  current: null,
  callbacks: new Callbacks(),
  trigger(size) {
    const previous = this.current
    this.current = size
    this.callbacks.fire(size, (caller, callback) => {
      if (isFunction(callback.fn)) {
        callback.fn.call(
          {
            current: size,
            previous
          },
          callback.data
        )
      }
    })
  },
  one(data, fn) {
    return this.on(data, fn, true)
  },
  on(data, fn, /* INTERNAL*/ one = false) {
    if (typeof fn === 'undefined' && isFunction(data)) {
      fn = data
      data = undefined
    }
    if (isFunction(fn)) {
      this.callbacks.add(fn, data, one)
    }
  },
  off(fn) {
    if (typeof fn === 'undefined') {
      this.callbacks.empty()
    }
  }
}
