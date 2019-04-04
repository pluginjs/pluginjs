import {
  isDate,
  isMap,
  isSet,
  isSymbol,
  isRegexp,
  isError,
  isArray,
  isObject,
  isPlainObject,
  isUndefined,
  isElement
} from '@pluginjs/is'

export const nub = arr => {
  return Array.from(new Set(arr))
}

export const each = (obj, callback) => {
  if (isArray(obj)) {
    let index = 0
    const length = obj.length
    for (; index < length; index++) {
      callback(obj[index], index)
    }
  } else {
    Object.entries(obj).map(([key, value]) => callback(key, value))
  }
  return obj
}

/** to createEvent */
export function triggerNative(el, event, data) {
  const e = document.createEvent('HTMLEvents')
  if (typeof data !== 'undefined') {
    e.initCustomEvent(event, true, true, data)
  } else {
    e.initEvent(event, true, false)
  }
  el.dispatchEvent(e)
}

/** Credit to https://github.com/jonschlinkert/shallow-clone MIT */
export const clone = val => {
  if (isElement(val)) {
    return val
  } else if (isArray(val)) {
    return val.slice()
  } else if (isDate(val)) {
    return new val.constructor(Number(val))
  } else if (isMap(val)) {
    return new Map(val)
  } else if (isSet(val)) {
    return new Set(val)
  } else if (isSymbol(val)) {
    return Symbol.prototype.valueOf
      ? Object(Symbol.prototype.valueOf.call(val))
      : {}
  } else if (isRegexp(val)) {
    const re = new val.constructor(val.source, /\w+$/.exec(val))
    re.lastIndex = val.lastIndex
    return re
  } else if (isError(val)) {
    return Object.create(val)
  } else if (isPlainObject(val)) {
    return Object.assign({}, val)
  }
  return val
}

/** Credit to https://github.com/jonschlinkert/clone-deep MIT */
export const deepClone = val => {
  if (isPlainObject(val)) {
    return deepCloneObject(val)
  } else if (isArray(val)) {
    return deepCloneArray(val)
  }
  return clone(val)
}

export const deepCloneObject = obj => {
  if (isPlainObject(obj)) {
    const res = new obj.constructor()
    for (const key in obj) { // eslint-disable-line
      res[key] = deepClone(obj[key])
    }
    return res
  }
  return obj
}

export const deepCloneArray = arr => {
  const res = new arr.constructor(arr.length)
  for (let i = 0; i < arr.length; i++) {
    res[i] = deepClone(arr[i])
  }
  return res
}

export const merge = (target, ...sources) => {
  sources.forEach(src => {
    for (const prop in src) { // eslint-disable-line
      target[prop] = src[prop]
    }
  })
  return target
}

function deepMergeTwo(target, source) {
  const sourceIsArray = isArray(source)
  const targetIsArray = isArray(target)

  if (isUndefined(source)) {
    return target
  }

  if (sourceIsArray !== targetIsArray) {
    return clone(source)
  } else if (sourceIsArray) {
    return clone(source)
  } else if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      target[key] = deepMergeTwo(target[key], source[key])
    })

    return target
  }

  return clone(source)
}

export const deepMerge = (...args) => {
  return args.filter(isObject).reduce(deepMergeTwo, {})
}

export const curry = (fn, args = []) => (...subArgs) => {
  const currylen = fn.currylen || fn.length
  const collect = args.concat(subArgs)
  if (collect.length >= currylen) {
    return fn(...collect)
  }
  return curry(fn, collect)
}

export const curryWith = (fn, enSureFunction, args = []) => (...subArgs) => {
  const index = subArgs.findIndex(enSureFunction)
  if (index >= 0) {
    const collect = args.concat(...subArgs.slice(0, index + 1))
    return fn(...collect)
  }

  const collect = args.concat(...subArgs)
  return curryWith(fn, enSureFunction, collect)
}

export const compose = (...fn) => {
  const callback = (...args) =>
    fn.reduceRight((r, i, index) => {
      if (Array.isArray(r) && index === fn.length - 1) {
        return i(...r)
      }
      return i(r)
    }, args)
  callback.currylen = fn[fn.curylen || fn.length - 1].length
  return callback
}

const MAX_UID = 1000000

export const getUID = prefix => {
  do {
    // eslint-disable-next-line no-bitwise
    prefix += ~~(Math.random() * MAX_UID) // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix))
  return prefix
}

export const range = v => Array.from({ length: v }, (v, i) => i)

export const reflow = element => element.offsetHeight

export const arrayEqual = (a, b) => {
  if (a === b) {
    return true
  }
  if (typeof a === 'undefined' || typeof b === 'undefined') {
    return false
  }
  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

export const objectEqual = (a, b) => {
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)

  if (aProps.length !== bProps.length) {
    return false
  }

  for (let i = 0; i < aProps.length; i++) {
    const prop = aProps[i]

    if (isArray(a[prop]) && isArray(b[prop])) {
      if (!arrayEqual(a[prop], b[prop])) {
        return false
      }
    } else if (isObject(a[prop]) && isObject(b[prop])) {
      if (!objectEqual(a[prop], b[prop])) {
        return false
      }
    } else if (a[prop] !== b[prop]) {
      return false
    }
  }

  return true
}

export const arrayDiff = (a, b) => {
  return a.filter(n => b.indexOf(n) < 0)
}

export const arrayIntersect = (a, b) => {
  let t
  if (b.length > a.length) {
    t = b
    b = a
    a = t
  }
  return a.filter(n => b.indexOf(n) !== -1)
}

export const convertPercentageToFloat = n =>
  parseFloat(n.slice(0, -1) / 100, 10)

export const convertFloatToPercentage = n => {
  if (n < 0) {
    n = 0
  } else if (n > 1) {
    n = 1
  }
  return `${parseFloat(n).toFixed(4) * 100}%`
}

export const convertMatrixToArray = value => {
  if (value && value.substr(0, 6) === 'matrix') {
    return value
      .replace(/^.*\((.*)\)$/g, '$1')
      .replace(/px/g, '')
      .split(/, +/)
  }
  return false
}

export const getTime = () => {
  if (typeof window.performance !== 'undefined' && window.performance.now) {
    return window.performance.now()
  }
  return Date.now()
}

export const camelize = (word, first = true) => {
  word = word.replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase())

  if (first) {
    word = word.substring(0, 1).toUpperCase() + word.substring(1)
  }
  return word
}

export const dasherize = word =>
  word.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()

/* Credit to https://github.com/jonschlinkert/get-value MIT */
export const getValueByPath = (obj, path) => {
  if (Object(obj) !== obj || typeof path === 'undefined') {
    return obj
  }

  if (path in obj) {
    return obj[path]
  }

  const segs = path.split('.')
  const length = segs.length
  if (!length) {
    return undefined
  }
  let i = -1

  while (obj && ++i < length) {
    let key = segs[i]
    while (key[key.length - 1] === '\\') {
      key = `${key.slice(0, -1)}.${segs[++i]}`
    }
    obj = obj[key]
  }
  return obj
}

/* Throttle execution of a function.
 * Especially useful for rate limiting execution of
 * handlers on events like resize and scroll. */
export function throttle(func, delay) {
  let running = false
  function resetRunning() {
    running = false
  }

  if (typeof delay !== 'undefined' || delay !== null) {
    return (...args) => {
      const that = this

      if (running) {
        return
      }
      running = true
      func.apply(that, args)
      window.setTimeout(resetRunning, delay)
    }
  }

  return (...args) => {
    const that = this

    if (running) {
      return
    }
    running = true
    window.requestAnimationFrame(() => {
      func.apply(that, args)
      resetRunning()
    })
  }
}

/* Debounce execution of a function.
 * Debouncing, unlike throttling, guarantees that a function
 * is only executed a single time at the very end. */
export function debounce(func, delay = 100) {
  let timer

  return (...args) => {
    const that = this
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      func.apply(that, args)
    }, delay)
  }
}

export function fromPairs(arr) {
  return arr.reduce(
    (r, [k, v]) => ({
      ...r,
      [k]: v
    }),
    {}
  )
}

export const SvgElement = (tag, attrs) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag)

  if (!attrs) {
    return el
  }

  for (const key in attrs) {
    if (!Object.hasOwnProperty.call(attrs, key)) {
      continue
    }

    el.setAttribute(key, attrs[key])
  }
  return el
}

export function parseDataOptions(dataset) {
  return Object.entries(dataset).reduce((result, [k, v]) => {
    try {
      const content = JSON.parse(`{"data": ${v.replace(/'/g, '"')}}`).data

      return {
        ...result,
        [k]: content
      }
    } catch (err) {
      return {
        ...result,
        [k]: v
      }
    }
  }, {})
}
