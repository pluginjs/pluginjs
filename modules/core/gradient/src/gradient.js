import is from '@pluginjs/is'
import { deepMerge, isPlainObject } from '@pluginjs/utils'
import * as util from './util'
import ColorStop from './colorStop'
import { defaults } from './constant'
import GradientString from './gradientString'
import GradientTypes from './gradientTypes'

let DEFAULTS = defaults

class Gradient {
  constructor(string, options) {
    if (is.object(string) && is.undefined(options)) {
      options = string
      string = null
    }
    this.value = {
      angle: 0,
      stops: []
    }
    this.options = deepMerge(DEFAULTS, options)

    this.privateType = 'LINEAR'
    this.privatePrefix = null
    this.length = this.value.stops.length
    this.current = 0
    this.privateStopIdCount = 0

    this.init(string)
  }

  init(string) {
    if (string) {
      this.fromString(string)
    }
  }

  val(value) {
    if (is.undefined(value)) {
      return this.toString()
    }
    this.fromString(value)
    return this
  }

  angle(value) {
    if (is.undefined(value)) {
      return this.value.angle
    }
    this.value.angle = GradientString.parseAngle(value)
    return this
  }

  append(color, position) {
    return this.insert(color, position, this.length)
  }

  reorder() {
    if (this.length < 2) {
      return
    }

    this.value.stops = this.value.stops.sort((a, b) => a.position - b.position)
  }

  insert(color, position, index) {
    if (is.undefined(index)) {
      index = this.current
    }

    const stop = new ColorStop(color, position, this)

    this.value.stops.splice(index, 0, stop)

    this.length = this.length + 1
    this.current = index
    return stop
  }

  getById(id) {
    if (this.length > 0) {
      for (const i in this.value.stops) {
        if (id === this.value.stops[i].id) {
          return this.value.stops[i]
        }
      }
    }
    return false
  }

  removeById(id) {
    const index = this.getIndexById(id)
    if (index) {
      this.remove(index)
    }
  }

  getIndexById(id) {
    let index = 0
    for (const i in this.value.stops) {
      if (Object.prototype.hasOwnProperty.call(this.value.stops, i)) {
        if (id === this.value.stops[i].id) {
          return index
        }
        index++
      }
    }
    return false
  }

  getCurrent() {
    return this.value.stops[this.current]
  }

  setCurrentById(id) {
    let index = 0
    for (const i in this.value.stops) {
      if (this.value.stops[i].id !== id) {
        index++
      } else {
        this.current = index
      }
    }
  }

  get(index) {
    if (is.undefined(index)) {
      index = this.current
    }
    if (index >= 0 && index < this.length) {
      this.current = index
      return this.value.stops[index]
    }
    return false
  }

  remove(index) {
    if (is.undefined(index)) {
      index = this.current
    }
    if (index >= 0 && index < this.length) {
      this.value.stops.splice(index, 1)
      this.length = this.length - 1
      this.current = index - 1
    }
  }

  empty() {
    this.value.stops = []
    this.length = 0
    this.current = 0
  }

  reset() {
    this.value.privateAngle = 0
    this.empty()
    this.privatePrefix = null
    this.privateType = 'LINEAR'
  }

  type(type) {
    if (
      is.string(type) &&
      (type = type.toUpperCase()) &&
      !is.undefined(GradientTypes[type])
    ) {
      this.privateType = type
      return this
    }
    return this.privateType
  }

  fromString(string) {
    this.reset()

    const result = GradientString.parseString(string)
    if (result) {
      this.privatePrefix = result.prefix
      this.type(result.type)
      if (result.value) {
        this.value.angle = GradientString.parseAngle(
          result.value.angle,
          this.privatePrefix !== null
        )

        result.value.stops.forEach(stop => {
          this.append(stop.color, stop.position)
        })
      }
    }
  }

  toString(prefix) {
    if (prefix === true) {
      prefix = util.getPrefix()
    }
    return GradientTypes[this.type()].to(this.value, this, prefix)
  }

  matchString(string) {
    return GradientString.matchString(string)
  }

  toStringWithAngle(angle, prefix) {
    const value = deepMerge(this.value)
    value.angle = GradientString.parseAngle(angle)

    if (prefix === true) {
      prefix = util.getPrefix()
    }

    return GradientTypes[this.type()].to(value, this, prefix)
  }

  getPrefixedStrings() {
    const strings = []
    for (let i = 0; i < this.options.prefixes.length; i++) {
      strings.push(this.toString(this.options.prefixes[i]))
    }
    return strings
  }

  static setDefaults(options) {
    DEFAULTS = deepMerge(DEFAULTS, isPlainObject(options) && options)
  }
}

export default Gradient
