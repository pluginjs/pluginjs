import Emitter from '@pluginjs/simple-emitter'
import { isFunction } from '@pluginjs/is'

export default class MediaQuery {
  constructor(media) {
    this.media = media

    this.initialize()
  }

  initialize() {
    this.emitter = new Emitter()

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

      this.emitter.emit(type, that)
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

    if (one) {
      this.emitter.once(types, fn, data)
    } else {
      this.emitter.on(types, fn, data)
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
      this.emitter.off('enter')
      this.emitter.off('leave')
    } else {
      this.emitter.off(types, fn)
    }

    return this
  }

  isMatched() {
    return this.mql.matches
  }

  destroy() {
    this.emitter.off('enter')
    this.emitter.off('leave')
  }
}
