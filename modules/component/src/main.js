export default class Component {
  constructor(namespace, element = null) {
    this.plugin = namespace
    this.element = element

    this.constructor.addInstance(this)
  }

  static of(...args) {
    return new this(...args)
  }

  destroy() {
    this.plugin = null
    this.element = null

    this.constructor.removeInstance(this)
  }
}
