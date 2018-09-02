/* eslint-disable no-undefined, no-undef */
import { isString, isFunction } from '@pluginjs/is'
import { curryWith } from '@pluginjs/utils'
import EventEmitter from './eventEmitter'

const supportEventListener = element => {
  return typeof element === 'object' && 'addEventListener' in element
}

export const trigger = (event, ...args) => {
  const element = args[args.length - 1]
  if (!supportEventListener(element)) {
    return
  }

  if (event instanceof window.Event) {
    element.dispatchEvent(event)
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

const getDelegator = (event, selector, callback, element) => {
  return (e, args) => {
    let target = e.target
    const currentTarget = e.currentTarget || element
    const applyArgs = args ? [e].concat(args) : [e]
    let result

    if (isString(selector)) {
      while (target && target !== currentTarget) {
        if (target.matches(selector)) {
          result = callback.apply(target, applyArgs)
        }
        target = target.parentNode
      }
    } else {
      result = callback.apply(currentTarget, applyArgs)
    }

    if (result === false) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}

const dispatch = e => {
  const eventName =
    typeof e.namespace === 'undefined' ? e.type : `${e.type}.${e.namespace}`

  const emitter = EventEmitter.getEventEmitter(e.currentTarget)

  if (e.detail) {
    emitter.emit(eventName, e, e.detail)
  } else {
    emitter.emit(eventName, e)
  }
}

const bind = (event, selector, callback, element, once) => {
  const emitter = EventEmitter.getEventEmitter(element)
  const { eventName } = EventEmitter.parseEvent(event)

  if (!emitter.hasListeners(event)) {
    element.addEventListener(eventName, dispatch, false)
  }

  const delegator = getDelegator(event, selector, callback, element)
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

    if (emitter.hasListeners(event)) {
      if (emitter.getListeners(event).length === 0) {
        element.removeEventListener(eventName, dispatch)
      }

      if (typeof callback === 'undefined') {
        emitter.off(event)
      } else {
        emitter.off(event, callback._delegator)
      }
    }
  }

  return element
}, supportEventListener)

export const bindEvent = curryWith((events, selector, callback, element) => {
  const eventArr = events.split(' ')
  const selectorArr = isString(selector) ? selector.split(',') : null

  switch (true) {
    case Boolean(eventArr.length > 1): {
      eventArr.forEach(e => {
        bindEvent(e, selector, callback, element)
      })
      break
    }

    case Boolean(selectorArr && selectorArr.length > 1): {
      selectorArr.forEach(s => {
        bindEvent(events, s.trim(), callback, element)
      })
      break
    }

    default: {
      if (!isString(selector) && !isFunction(callback)) {
        element = callback
        callback = selector
        selector = undefined
      }
      bind(events, selector, callback, element)
      break
    }
  }

  return element
}, supportEventListener)

export const bindEventOnce = curryWith(
  (events, selector, callback, element) => {
    const eventArr = events.split(' ')
    const selectorArr = isString(selector) ? selector.split(',') : null

    switch (true) {
      case Boolean(eventArr.length > 1): {
        eventArr.forEach(e => {
          bindEventOnce(e, selector, callback, element)
        })
        break
      }

      case Boolean(selectorArr && selectorArr.length > 1): {
        selectorArr.forEach(s => {
          bindEventOnce(events, s.trim(), callback, element)
        })
        break
      }

      default: {
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
        break
      }
    }

    return element
  },
  supportEventListener
)

export const on = bindEvent

export const off = removeEvent

export const once = bindEventOnce

export const getEventEmitter = element => EventEmitter.getEventEmitter(element)
