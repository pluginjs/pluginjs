import keyframes2Anime from './anime-polyfill'
import { isObject, isPlainObject } from '@pluginjs/is'

export const deepClone = obj => {
  if (typeof obj === 'function') {
    return obj
  }
  return JSON.parse(JSON.stringify(obj))
}

export function nub(arr) {
  return Array.from(new Set(arr))
}

function deepMergeTwo(x, y) {
  if (
    (isPlainObject(y) && isPlainObject(x)) ||
    (isPlainObject(x) && Array.isArray(y))
  ) {
    return fromPairs(
      nub(Object.keys(x).concat(Object.keys(y))).map(key => [
        key,
        deepMergeTwo(x[key], y[key])
      ])
    )
  }

  if (isPlainObject(y) && typeof x === 'function') {
    return Object.assign(function(...args) {
      return x.apply(this, args)
    }, y)
  }

  if (isPlainObject(y) && Array.isArray(x)) {
    return Object.assign([], x, y)
  }

  if (isPlainObject(x) && typeof y === 'function') {
    return Object.assign(function(...args) {
      return y.apply(this, args)
    }, x)
  }

  if (Array.isArray(y) && Array.isArray(x)) {
    // return x.concat(y)
    return nub(Object.keys(y).concat(Object.keys(x))).map(index =>
      deepMergeTwo(x[index], y[index])
    )
  }

  if (typeof y === 'undefined') {
    return x
  }
  return y
}

export function deepMerge(...args) {
  return args.filter(isObject).reduce(deepMergeTwo)
}

export const curry = (fn, args = []) => (...subArgs) => {
  const currylen = fn.currylen || fn.length
  const collect = args.concat(subArgs)
  if (collect.length >= currylen) {
    return fn(...collect)
  }
  return curry(fn, collect)
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

export function getUID(prefix) {
  do {
    // eslint-disable-next-line no-bitwise
    prefix += ~~(Math.random() * MAX_UID) // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix))
  return prefix
}

export function range(v) {
  return Array.from({ length: v }, (v, i) => i)
}

export function reflow(element) {
  return element.offsetHeight
}

export function arraysEqual(a, b) {
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

export function arrayDiff(a, b) {
  // let t;
  // if (a.length < b.length) {
  //   t = b;
  //   b = a;
  //   a = t;
  // }
  return a.filter(n => b.indexOf(n) < 0)
}

export function arrayIntersect(a, b) {
  let t
  if (b.length > a.length) {
    t = b
    b = a
    a = t
  }
  return a.filter(n => b.indexOf(n) !== -1)
}

export function convertPercentageToFloat(n) {
  return parseFloat(n.slice(0, -1) / 100, 10)
}

export function convertFloatToPercentage(n) {
  if (n < 0) {
    n = 0
  } else if (n > 1) {
    n = 1
  }
  return `${parseFloat(n).toFixed(4) * 100}%`
}

export function convertMatrixToArray(value) {
  if (value && value.substr(0, 6) === 'matrix') {
    return value
      .replace(/^.*\((.*)\)$/g, '$1')
      .replace(/px/g, '')
      .split(/, +/)
  }
  return false
}

export function getTime() {
  if (typeof window.performance !== 'undefined' && window.performance.now) {
    return window.performance.now()
  }
  return Date.now()
}

export function camelize(word, first = true) {
  word = word.replace(/[_.-\s](\w|$)/g, (_, x) => x.toUpperCase())

  if (first) {
    word = word.substring(0, 1).toUpperCase() + word.substring(1)
  }
  return word
}

/* Credit to https://github.com/jonschlinkert/get-value MIT */
export function getValueByPath(obj, path) {
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

export function mergeWith(obj1, obj2, customizer) {
  return Object.entries(obj1).reduce(
    (r, [k, v]) => ({
      ...r,
      [k]: customizer(v, obj2[k])
    }),
    {}
  )
}

export { keyframes2Anime }
