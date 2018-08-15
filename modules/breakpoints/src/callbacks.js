import { isFunction } from '@pluginjs/is'

export default class Callbacks {
  constructor() {
    this.length = 0
    this.list = []
  }

  add(fn, data, one = false) {
    this.list.push({
      fn,
      data,
      one
    })

    this.length++
  }

  remove(fn) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].fn === fn) {
        this.list.splice(i, 1)
        this.length--
        i--
      }
    }
  }

  empty() {
    this.list = []
    this.length = 0
  }

  call(caller, i, fn = null) {
    if (!i) {
      i = this.length - 1
    }
    const callback = this.list[i]

    if (isFunction(fn)) {
      fn.call(this, caller, callback, i)
    } else if (isFunction(callback.fn)) {
      callback.fn.call(caller || window, callback.data)
    }

    if (callback.one) {
      delete this.list[i]
      this.length--
    }
  }

  fire(caller, fn = null) {
    for (const i in this.list) {
      if (Object.prototype.hasOwnProperty.call(this.list, i)) {
        this.call(caller, i, fn)
      }
    }
  }
}
