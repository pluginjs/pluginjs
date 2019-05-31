/* eslint-disable */
/* Credit to http://is.js.org MIT */
const toString = Object.prototype.toString

// Type checks
/* -------------------------------------------------------------------------- */
// is a given value Arguments?
export const isArguments = value => {
  // fallback check is for IE
  return (
    toString.call(value) === '[object Arguments]' ||
    (value != null && typeof value === 'object' && 'callee' in value)
  )
}

// is a given value Array?
export const isArray = val => {
  if (Array.isArray) {
    return Array.isArray(val)
  }
  return toString.call(val) === '[object Array]'
}

// is a given value Boolean?
export const isBoolean = val => {
  return (
    val === true || val === false || toString.call(val) === '[object Boolean]'
  )
}

// is a given value Char?
export const isChar = val => {
  return isString(val) && val.length === 1
}

// is a given value Date Object?
export const isDate = value => {
  return toString.call(value) === '[object Date]'
}

// is a given object a DOM node?
export const isDomNode = object => {
  return isObject(object) && object.nodeType > 0
}

// is a given object a Element?
export const isElement = el => {
  return isObject(el) && el.nodeType === 1 && !isPlainObject(el);
}

// is a given value window object
export const isWindow = val => {
  return val != null && typeof val === 'object' && 'setInterval' in val;
}

// is a given value document object
export const isDocument = val => {
  return typeof val === 'object' && val.nodeType === 9
}

// is a given value Error object?
export const isError = val => {
  return toString.call(val) === '[object Error]'
}

// is a given value function?
export const isFunction = val => {
  // fallback check is for IE
  return toString.call(val) === '[object Function]' || typeof val === 'function'
}

// is given value a pure JSON object?
export const isJson = value => {
  return toString.call(value) === '[object Object]'
}

// is a given value NaN?
export const isNan = val => {
  // NaN is number :) Also it is the only value which does not equal itself
  return val !== val
}

// is a given value null?
export const isNull = val => {
  return val === null
}

// is a given value number?
export const isNumber = val => {
  return !isNan(val) && toString.call(val) === '[object Number]'
}

// is a given value object?
export const isObject = val => {
  return Object(val) === val
}

// is a given value plain object?
export const isPlainObject = val => {
  return toString.call(val) === '[object Object]'
}

// is a given value empty object?
export const isEmptyObject = val => {
  return isObject(val) && Object.getOwnPropertyNames(val).length == 0
}

// is a given value RegExp?
export const isRegexp = val => {
  return toString.call(val) === '[object RegExp]'
}

// is a given value String?
export const isString = val => {
  return typeof val === 'string' || toString.call(val) === '[object String]'
}

// is a given value undefined?
export const isUndefined = val => {
  return val === void 0
}

// is a given value Map?
export const isMap = val => {
  return val != null && val.constructor?val.constructor.name === 'Map' :false
}

// is a given value Set?
export const isSet = val => {
  return val != null && val.constructor?val.constructor.name === 'Set' :false
}

// is a given value Promise?
export const isPromise = val => {
  return val != null && val.constructor?val.constructor.name === 'Promise' :false
}

// is a given value Symbol?
export const isSymbol = val => {
  return val != null && val.constructor?val.constructor.name === 'Symbol' :false
}

// is a given value is empty
export const isEmpty = val => {
  return (isNumber(val) && val === 0) ||
    (isArray(val) && val.length === 0) ||
    (isString(val) && val === '') ||
    isEmptyObject(val) ||
    isNull(val) ||
    isUndefined(val) ||
    val === false
}

// Arithmetic checks
/* -------------------------------------------------------------------------- */
// is a given value numeric?
export const isNumeric = n => {
  return (isNumber(n) || isString(n)) && !isNan(n - parseFloat(n))
}

// is a given number percentage?
export const isPercentage = n => {
  return typeof n === 'string' && n.indexOf('%') !== -1
}

// is a given number decimal?
export const isDecimal = n => {
  return isNumber(n) && n % 1 !== 0
}

// is a given number finite?
export const isFinite = n => {
  return !isInfinite(n) && !isNan(n)
}

// is a given number infinite?
export const isInfinite = n => {
  return n === Infinity || n === -Infinity
}

export const isInteger = n => {
  return isNumber(n) && n % 1 === 0
}

// is a given number negative?
export const isNegative = n => {
  return isNumber(n) && n < 0
}

// is a given number positive?
export const isPositive = n => {
  return isNumber(n) && n > 0
}

