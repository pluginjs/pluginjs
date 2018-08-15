import Callbacks from './callbacks'
import { isFunction } from '@pluginjs/is'

export default class MediaQuery {
  constructor(name, media) {
    this.name = name
    this.media = media

    this.initialize()
  }

  initialize() {
    this.callbacks = {
      enter: new Callbacks(),
      leave: new Callbacks()
    }

    this.mql = (window.matchMedia && window.matchMedia(this.media)) || {
      matches: false,
      media: this.media,
      addListener() {
        // do nothing
      },
      removeListener() {
        // do nothing
      }
    }

    const that = this
    this.mqlListener = mql => {
      const type = (mql.matches && 'enter') || 'leave'

      that.callbacks[type].fire(that)
    }
    this.mql.addListener(this.mqlListener)
  }

  on(types, data, fn, one = false) {
    if (typeof types === 'object') {
      for (const type in types) {
        if (Object.prototype.hasOwnProperty.call(types, type)) {
          this.on(type, data, types[type], one)
        }
      }
      return this
    }

    if (typeof fn === 'undefined' && isFunction(data)) {
      fn = data
      data = undefined
    }

    if (!isFunction(fn)) {
      return this
    }

    if (typeof this.callbacks[types] !== 'undefined') {
      this.callbacks[types].add(fn, data, one)

      if (types === 'enter' && this.isMatched()) {
        this.callbacks[types].call(this)
      }
    }

    return this
  }

  one(types, data, fn) {
    return this.on(types, data, fn, true)
  }

  off(types, fn) {
    let type

    if (typeof types === 'object') {
      for (type in types) {
        if (Object.prototype.hasOwnProperty.call(types, type)) {
          this.off(type, types[type])
        }
      }
      return this
    }

    if (typeof types === 'undefined') {
      this.callbacks.enter.empty()
      this.callbacks.leave.empty()
    } else if (types in this.callbacks) {
      if (fn) {
        this.callbacks[types].remove(fn)
      } else {
        this.callbacks[types].empty()
      }
    }

    return this
  }

  isMatched() {
    return this.mql.matches
  }

  destroy() {
    this.off()
  }
}
