// import { getData } from '@pluginjs/dom'

export default class Component {
  constructor(element = null) {
    // if(getData(this.plugin, element)) {
    //   throw new Error(`The plugin ${this.plugin} already initialized on element.`);
    // }
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
