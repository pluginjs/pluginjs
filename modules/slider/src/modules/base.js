import { addClass, hasClass } from '@pluginjs/classes'
import { append, query, parentWith } from '@pluginjs/dom'
import { events as EVENTS } from '../constant'

class Base {
  constructor(instance, data, loader) {
    this.instance = instance
    this.classes = instance.classes
    this.type = data.type
    this.data = data
    this.loader = loader
  }

  load($target) {
    const _load = new Promise((resolve, reject) => {
      $target.addEventListener('load', () => {
        resolve($target)
      })

      $target.addEventListener('error', () => {
        reject($target)
      })
    })
    return _load
      .then(target => {
        this.loadHandler(target)
        this.instance.trigger(EVENTS.LOADED, target)
        return target
      })
      .catch(target => {
        this.errorHandler(target)
        this.instance.trigger(EVENTS.ERROR, target)
        return target
      })
  }

  loaded(target) {
    const card = parentWith(hasClass(this.classes.CARD), target)
    const content = query(`.${this.classes.CONTENT}`, card)

    if (this.loader) {
      this.loader.hide()
    }

    addClass(this.classes.LOADED, content)
  }

  error(target) {
    return target
  }

  afterLoad() {
    return this
  }

  replace(target) {
    target.parentNode.replaceChild(this.element, target)

    this.afterLoad()
    return this
  }

  appendTo(target) {
    append(this.element, target)

    this.afterLoad()
    return this
  }

  setData(data) {
    for (const key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        this.element.dataset[key] = data[key]
      }
    }

    return this
  }
}

export default Base
