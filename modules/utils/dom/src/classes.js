import { curry } from '@pluginjs/utils'
import { curryWith, isElement } from './curry-built-in'
import { init, last } from './data.list'

export const hasClass = curry((className, element) =>
  element.classList.contains(className)
)
export const indexOfClass = curry((className, element) =>
  element.classList.item(className)
)
export const addClass = curryWith((...args) => {
  const classes = init(args)
  const element = last(args)
  element.classList.add(...classes)
  return element
}, isElement)
export const removeClass = curryWith((...args) => {
  const classes = init(args)
  const element = last(args)
  element.classList.remove(...classes)
  return element
}, isElement)
export const toggleClass = curry((className, element) => {
  element.classList.toggle(className)
  return element
})

// compose(
//   append(parent),
//   addClass('foo')
// )(el)

// compose(append(parent), addClass('foo'), ...)
// let c = append(parent).addClass('foo').fn$fn, fn

// let el = document.createElement('div')
//   |> addClass('foo')
//   |> append(parent)

// addclass()
//   .remove()
//   .append()

// addClass(el, ...args)

// addClass(...args, el)
// addClass('foo','bar')
