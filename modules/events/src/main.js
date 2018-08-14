/* eslint-disable no-undefined, no-undef */
import { isString, isFunction, isElement } from '@pluginjs/is'
import { curryWith } from '@pluginjs/utils'
import EventEmitter from './eventEmitter'

export const trigger = (event, ...args) => {
  const element = args[args.length - 1]
  if (!isElement(element)) {
    return
  }

  const data = args.length > 1 ? args.slice(0, args.length - 1) : null

  const { eventName, namespace } = EventEmitter.parseEvent(event)

  const cusEvent = new CustomEvent(eventName, {
    cancelable: true,
    bubbles: true,
    detail: data
  })

  if (namespace) {
    cusEvent.namespace = namespace
  }
  element.dispatchEvent(cusEvent)
}

export const bindEvent = curryWith((events, selector, callback, element) => {
  const eventArr = events.split(' ')
  if (eventArr.length > 1) {
    eventArr.forEach(e => {
      bindEvent(e, selector, callback, element)
    })
  } else {
    if (!isString(selector) && !isFunction(callback)) {
      element = callback
      callback = selector
      selector = undefined
    }

    bind(events, selector, callback, element)
  }

  return element
}, isElement)

const getDelegator = (event, selector, callback) => {
  return (e, args) => {
    let target = e.target
    const currentTarget = e.currentTarget
    const applyArgs = args ? [e].concat(args) : [e]

    if (isString(selector)) {
      while (target !== currentTarget) {
        if (target.matches(selector)) {
          callback.apply(e, applyArgs)
        }
        target = target.parentNode
      }
    } else {
      callback.apply(e, applyArgs)
    }
  }
}

const dispatch = e => {
  const eventName =
    typeof e.namespace === 'undefined' ? e.type : `${e.type}.${e.namespace}`

  const emitter = EventEmitter.getEventEmitter(e.currentTarget)
  const result = e.detail
    ? emitter.emit(eventName, e, e.detail)
    : emitter.emit(eventName, e)

  if (result === false) {
    e.preventDefault()
    e.stopPropagation()
  }
}

const bind = (event, selector, callback, element, once) => {
  const emitter = EventEmitter.getEventEmitter(element)
  const { eventName } = EventEmitter.parseEvent(event)

  if (!emitter.hasListeners(event)) {
    element.addEventListener(eventName, dispatch, false)
  }

  const delegator = getDelegator(event, selector, callback)
  callback._delegator = delegator

  if (once) {
    emitter.once(event, delegator)
  } else {
    emitter.on(event, delegator)
  }
}

export const removeEvent = curryWith((events, selector, callback, element) => {
  const eventArr = events.split(' ')
  if (eventArr.length > 1) {
    eventArr.forEach(e => {
      removeEvent(e, selector, callback, element)
    })
  } else {
    if (!isString(selector) && !isFunction(callback)) {
      element = callback
      callback = selector
      selector = undefined
    }

    if (!isFunction(callback)) {
      element = callback
      callback = undefined
    }

    const event = events
    const emitter = EventEmitter.getEventEmitter(element)
    const { eventName } = EventEmitter.parseEvent(event)

    if (!emitter.hasListeners(event)) {
      return
    }

    if (emitter.getListeners(event).length === 0) {
      element.removeEventListener(eventName, dispatch)
    }

    if (typeof callback === 'undefined') {
      emitter.off(event)
    } else {
      emitter.off(event, callback._delegator)
    }
  }

  return element
}, isElement)

export const bindEventOnce = curryWith(
  (events, selector, callback, element) => {
    const eventArr = events.split(' ')
    if (eventArr.length > 1) {
      eventArr.forEach(e => {
        bindEventOnce(e, selector, callback, element)
      })
    } else {
      if (!isString(selector) && !isFunction(callback)) {
        element = callback
        callback = selector
        selector = undefined
      }

      const recursiveFunction = e => {
        removeEvent(eventArr[0], selector, recursiveFunction, element)
        return callback(e)
      }

      bind(eventArr[0], selector, recursiveFunction, element, true)
    }

    return element
  },
  isElement
)

export const on = bindEvent

export const off = removeEvent

export const once = bindEventOnce

export const getEventEmitter = element => EventEmitter.getEventEmitter(element)
