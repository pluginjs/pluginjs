import DEFAULTS from './defaults'
import ChangeEvent from './changeEvent'
import { Viewport, Size } from './viewport'
import { resolveName, getName } from './utils'
import { merge, each } from '@pluginjs/utils'
import { isObject, isString, isNull } from '@pluginjs/is'

let sizes = {}
let viewports = {}

let Breakpoints = (...args) => {
  Breakpoints.define(...args)
}

Breakpoints.defaults = DEFAULTS

Breakpoints = merge(Breakpoints, {
  defined: false,
  init(...args) {
    if (!this.defined) {
      this.define(...args)
    }
  },

  define(values, options = {}) {
    // if(typeof values === 'undefined' && this.defined) {
    //   return
    // }
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
        sizes[size] = new Size(
          size,
          values[size].min,
          values[size].max,
          this.options.unit
        )
      }
    }

    this.defined = true
  },

  destroy() {
    each(sizes, (name, size) => {
      size.destroy()
    })
    sizes = {}
    viewports = {}
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

  getSize(name) {
    if (Object.prototype.hasOwnProperty.call(sizes, name)) {
      return sizes[name]
    }

    return null
  },

  getViewport(name) {
    if (Object.prototype.hasOwnProperty.call(viewports, name)) {
      return viewports[name]
    }

    return null
  },

  get(name) {
    if (isString(name)) {
      name = name.trim()
    } else if (isObject(name)) {
      name = getName(name)
    }

    const viewport = this.getSize(name) || this.getViewport(name)
    if (viewport) {
      return viewport
    }

    const { at, from, to } = resolveName(name)
    const unit = this.options.unit

    let max = null
    let min = null
    let size
    if (at) {
      size = this.getSize(at)
      if (size) {
        min = size.min
        max = size.max
      }
    } else if (from && to) {
      const fromSize = this.getSize(from)
      const toSize = this.getSize(to)

      if (fromSize && toSize) {
        min = fromSize.min
        max = toSize.max
      }
    } else if (from) {
      size = this.getSize(from)
      if (size) {
        min = size.min
        max = Infinity
      }
    } else if (to) {
      size = this.getSize(to)
      if (size) {
        min = 0
        max = size.max
      }
    }

    if (!isNull(min) && typeof !isNull(max)) {
      viewports[name] = new Viewport(name, min, max, unit)
      return viewports[name]
    }

    return null
  },

  getMin(name) {
    const obj = this.get(name)
    if (obj) {
      return obj.min
    }
    return null
  },

  getMax(name) {
    const obj = this.get(name)
    if (obj) {
      return obj.max
    }
    return null
  },

  current() {
    return ChangeEvent.current
  },

  getMedia(name) {
    const obj = this.get(name)
    if (obj) {
      return obj.media
    }
    return null
  },

  on(size, types, data, fn, /* INTERNAL*/ one = false) {
    if (size === 'change') {
      fn = data
      data = types
      return ChangeEvent.on(data, fn, one)
    }

    const obj = this.get(size)

    if (obj) {
      obj.on(types, data, fn, one)
    }

    return this
  },

  one(size, types, data, fn) {
    return this.on(size, types, data, fn, true)
  },

  off(size, types, fn) {
    if (size === 'change') {
      return ChangeEvent.off(types)
    }

    const obj = this.get(size)

    if (obj) {
      obj.off(types, fn)
    }

    return this
  },

  at(size, types, data, fn, one = false) {
    const name = getName({
      at: size
    })
    return this.on(name, types, data, fn, one)
  },

  from(size, types, data, fn, one = false) {
    return this.on(
      {
        from: size
      },
      types,
      data,
      fn,
      one
    )
  },

  to(size, types, data, fn, one = false) {
    return this.on(
      {
        to: size
      },
      types,
      data,
      fn,
      one
    )
  },

  between(from, to, types, data, fn, one = false) {
    return this.on(
      {
        from,
        to
      },
      types,
      data,
      fn,
      one
    )
  }
})

export default Breakpoints
