/*eslint-disable */
/* Credit to http://is.js.org MIT */
const toString = Object.prototype.toString
const is = {
  // Type checks
  /* -------------------------------------------------------------------------- */
  // is a given value Arguments?
  arguments: function(value) {
    // fallback check is for IE
    return (
      toString.call(value) === '[object Arguments]' ||
      (value != null && typeof value === 'object' && 'callee' in value)
    )
  },

  // is a given value Array?
  array: function(val) {
    if (Array.isArray) {
      return Array.isArray(val)
    }
    return toString.call(val) === '[object Array]'
  },

  // is a given value Boolean?
  boolean: function(val) {
    return (
      val === true || val === false || toString.call(val) === '[object Boolean]'
    )
  },

  // is a given value Char?
  char: function(val) {
    return this.string(val) && val.length === 1
  },

  // is a given value Date Object?
  date: function(value) {
    return toString.call(value) === '[object Date]'
  },

  // is a given object a DOM node?
  domNode: function(object) {
    return this.object(object) && object.nodeType > 0
  },

  // is a given value Error object?
  error: function(val) {
    return toString.call(val) === '[object Error]'
  },

  // is a given value function?
  function: function(val) {
    // fallback check is for IE
    return (
      toString.call(val) === '[object Function]' || typeof val === 'function'
    )
  },

  // is given value a pure JSON object?
  json: function(value) {
    return toString.call(value) === '[object Object]'
  },

  // is a given value NaN?
  nan: function(val) {
    // NaN is number :) Also it is the only value which does not equal itself
    return val !== val
  },

  // is a given value null?
  null: function(val) {
    return val === null
  },

  // is a given value number?
  number: function(val) {
    return !this.nan(val) && toString.call(val) === '[object Number]'
  },

  // is a given value object?
  object: function(val) {
    return Object(val) === val
  },

  // is a given value empty object?
  emptyObject: function(val) {
    return this.object(val) && Object.getOwnPropertyNames(val).length == 0
  },

  // is a given value RegExp?
  regexp: function(val) {
    return toString.call(val) === '[object RegExp]'
  },

  // is a given value String?
  string: function(val) {
    return typeof val === 'string' || toString.call(val) === '[object String]'
  },

  // is a given value undefined?
  undefined: function(val) {
    return val === void 0
  },

  // Arithmetic checks
  /* -------------------------------------------------------------------------- */
  // is a given value numeric?
  numeric: function(n) {
    return (this.number(n) || this.string(n)) && !this.nan(n - parseFloat(n))
  },

  // is a given number percentage?
  percentage: function(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1
  },

  // is a given number decimal?
  decimal: function(n) {
    return this.number(n) && n % 1 !== 0
  },

  // is a given number finite?
  finite: function(n) {
    if (isFinite) {
      return isFinite(n)
    }
    return !this.infinite(n) && !this.nan(n)
  },

  // is a given number infinite?
  infinite: function(n) {
    return n === Infinity || n === -Infinity
  },

  integer: function(n) {
    return this.number(n) && n % 1 === 0
  },

  // is a given number negative?
  negative: function(n) {
    return this.number(n) && n < 0
  },

  // is a given number positive?
  positive: function(n) {
    return this.number(n) && n > 0
  }
}

export default is
