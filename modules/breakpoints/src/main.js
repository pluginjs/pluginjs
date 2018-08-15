import DEFAULTS from './defaults'
import ChangeEvent from './changeEvent'
import Size from './size'
import UnionSize from './unionSize'
import { merge, each } from '@pluginjs/utils'

let sizes = {}
const unionSizes = {}

let Breakpoints = (...args) => {
  Breakpoints.define(...args)
}

Breakpoints.defaults = DEFAULTS

Breakpoints = merge(Breakpoints, {
  defined: false,
  define(values, options = {}) {
    if (this.defined) {
      this.destroy()
    }

    if (!values) {
      values = Breakpoints.defaults
    }

    this.options = merge(options, {
      unit: 'px'
    })

    for (const size in values) {
      if (Object.prototype.hasOwnProperty.call(values, size)) {
        this.set(size, values[size].min, values[size].max, this.options.unit)
      }
    }

    this.defined = true
  },

  destroy() {
    each(sizes, (name, size) => {
      size.destroy()
    })
    sizes = {}
    ChangeEvent.current = null
  },

  is(size) {
    const breakpoint = this.get(size)
    if (!breakpoint) {
      return null
    }

    return breakpoint.isMatched()
  },

  /* get all size name */
  all() {
    const names = []
    each(sizes, name => {
      names.push(name)
    })
    return names
  },

  set(name, min = 0, max = Infinity, unit = 'px') {
    const size = this.get(name)
    if (size) {
      size.destroy()
    }

    sizes[name] = new Size(name, min, max, unit)
    return sizes[name]
  },

  get(size) {
    if (Object.prototype.hasOwnProperty.call(sizes, size)) {
      return sizes[size]
    }

    return null
  },

  getUnion(sizes) {
    if (Object.prototype.hasOwnProperty.call(unionSizes, sizes)) {
      return unionSizes[sizes]
    }

    unionSizes[sizes] = new UnionSize(sizes)

    return unionSizes[sizes]
  },

  getMin(size) {
    const obj = this.get(size)
    if (obj) {
      return obj.min
    }
    return null
  },

  getMax(size) {
    const obj = this.get(size)
    if (obj) {
      return obj.max
    }
    return null
  },

  current() {
    return ChangeEvent.current
  },

  getMedia(size) {
    const obj = this.get(size)
    if (obj) {
      return obj.media
    }
    return null
  },

  on(sizes, types, data, fn, /* INTERNAL*/ one = false) {
    sizes = sizes.trim()

    if (sizes === 'change') {
      fn = data
      data = types
      return ChangeEvent.on(data, fn, one)
    }
    if (sizes.includes(' ')) {
      const union = this.getUnion(sizes)

      if (union) {
        union.on(types, data, fn, one)
      }
    } else {
      const size = this.get(sizes)

      if (size) {
        size.on(types, data, fn, one)
      }
    }

    return this
  },

  one(sizes, types, data, fn) {
    return this.on(sizes, types, data, fn, true)
  },

  off(sizes, types, fn) {
    sizes = sizes.trim()

    if (sizes === 'change') {
      return ChangeEvent.off(types)
    }

    if (sizes.includes(' ')) {
      const union = this.getUnion(sizes)

      if (union) {
        union.off(types, fn)
      }
    } else {
      const size = this.get(sizes)

      if (size) {
        size.off(types, fn)
      }
    }

    return this
  }
})

export default Breakpoints
