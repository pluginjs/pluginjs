import { curry, curryWith } from '@pluginjs/utils'
import { isElement } from '@pluginjs/is'

export const hasClass = curry((classes, element) => {
  let has = true
  classes.split(' ').forEach(className => {
    has = has && element.classList.contains(className)
  })
  return has
})

export const indexOfClass = curry((className, element) =>
  element.classList.item(className)
)

export const addClass = curryWith((...args) => {
  let classes = args.slice(0, -1)
  const element = args.slice(-1)[0]

  if (isElement(element)) {
    if (classes.length === 1) {
      classes = classes[0].split(/\s+/g).filter(v => v !== '')
    }
    element.classList.add(...classes)
  }

  return element
}, isElement)

export const removeClass = curryWith((...args) => {
  let classes = args.slice(0, -1)
  const element = args.slice(-1)[0]

  if (isElement(element)) {
    if (classes.length === 1) {
      classes = classes[0].split(/\s+/g).filter(v => v !== '')
    }
    element.classList.remove(...classes)
  }

  return element
}, isElement)

export const toggleClass = curry((className, element) => {
  element.classList.toggle(className)
  return element
})
