export default class Component {
  constructor(element = null) {
    this.element = element

    this.constructor.addInstance(this)
  }

  static of(...args) {
    return new this(...args)
  }

  destroy() {
    this.constructor.removeInstance(this)

    this.element = null
  }
}
