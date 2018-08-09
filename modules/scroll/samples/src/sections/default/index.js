import { query } from '@pluginjs/dom'
import scrollHelper from '@pluginjs/scroll'

class SelectHelper {
  constructor(element) {
    this.element = element
  }

  get value() {
    return this.element.value
  }
}

const easing = new SelectHelper(query('.easing'))
const duration = new SelectHelper(query('.duration'))

const root = query('#default')

root.addEventListener('click', ({ target }) => {
  const matches = apiName => target.classList.contains(`api-${apiName}`)

  if (matches('scrollto')) {
    const { x, y } = target.dataset
    scrollHelper.to({
      x,
      y,
      easing: easing.value,
      duration: duration.value,
      complete(x, y) {
        console.info(`to: ${x}, ${y}`)
      }
    })
  }

  if (matches('scrolltox')) {
    const { value } = target.dataset
    scrollHelper.toX(value, easing.value, duration.value, value => {
      console.info(`to x: ${value}`)
    })
  }

  if (matches('scrolltoy')) {
    const { value } = target.dataset
    scrollHelper.toY(value, easing.value, duration.value, value => {
      console.info(`to y: ${value}`)
    })
  }

  if (matches('scrollbyx')) {
    const { value } = target.dataset
    scrollHelper.byX(value, easing.value, duration.value, value => {
      console.info(`by x: ${value}`)
    })
  }

  if (matches('scrollbyy')) {
    const { value } = target.dataset
    scrollHelper.byY(value, easing.value, duration.value, value => {
      console.info(`by y: ${value}`)
    })
  }

  if (matches('scrollby')) {
    const { x, y } = target.dataset
    scrollHelper.by({
      x,
      y,
      easing: easing.value,
      duration: duration.value,
      complete(x, y) {
        console.info(`by: ${x}, ${y}`)
      }
    })
  }

  if (matches('scrolltop')) {
    const { element: selector, offset } = target.dataset
    const element = query(selector)
    scrollHelper.top({
      element,
      offset,
      easing: easing.value,
      duration: duration.value,
      complete(value) {
        console.info(`top: ${value}`)
      }
    })
  }

  if (matches('scroll-intoview')) {
    const { element: selector } = target.dataset
    const element = query(selector)
    scrollHelper.intoView({
      element,
      easing: easing.value,
      duration: duration.value,
      complete(x, y) {
        console.info(`intoView: ${x}, ${y}`)
      }
    })
  }

  if (matches('scroll-intoview-offset')) {
    const {
      element: selector,
      offsetTop: top,
      offsetLeft: left
    } = target.dataset
    const element = query(selector)
    scrollHelper.intoView({
      element,
      offset: {
        top,
        left
      },
      easing: easing.value,
      duration: duration.value,
      complete(x, y) {
        console.info(`intoView: ${x}, ${y}`)
      }
    })
  }
})
