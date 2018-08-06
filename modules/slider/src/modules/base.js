import { addClass, hasClass } from '@pluginjs/classes'
import { append, query, parentWith } from '@pluginjs/dom'

class Base {
  constructor(instance, data) {
    this.instance = instance
    this.classes = instance.classes
    this.type = data.type
    this.data = data
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
        return target
      })
      .catch(target => {
        this.errorHandler(target)
        return target
      })
  }

  loaded(target) {
    const card = parentWith(hasClass(this.classes.CARD), target)
    const content = query(`.${this.classes.CONTENT}`, card)
    const loader = query(`.${this.classes.LOADER}`, card)

    addClass(this.classes.LOADED, loader)
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
