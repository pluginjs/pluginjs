import { curry } from '@pluginjs/utils'
import { isElement } from '@pluginjs/is'

export const hasClass = curry((className, element) =>
  element.classList.contains(className)
)

export const indexOfClass = curry((className, element) =>
  element.classList.item(className)
)

export const addClass = (...args) => {
  const classes = args.slice(0, -1)
  const element = args.slice(-1)[0]

  if (isElement(element)) {
    element.classList.add(...classes)
  }

  return element
}

export const removeClass = (...args) => {
  const classes = args.slice(0, -1)
  const element = args.slice(-1)[0]

  if (isElement(element)) {
    element.classList.remove(...classes)
  }

  return element
}

export const toggleClass = curry((className, element) => {
  element.classList.toggle(className)
  return element
})
