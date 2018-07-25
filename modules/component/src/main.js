export default class Component {
  constructor(namespace, element) {
    this.plugin = namespace
    this.element = element
    if (!window.Pj) {
      throw new Error('Pluginjs must be required!')
    }
    if (window.Pj && window.Pj.instances[this.plugin]) {
      if (
        window.Pj.instances[this.plugin].find(
          instance => instance.element === this.element
        )
      ) {
        if (this.globalComponent) {
          throw new Error(
            `${this.plugin} has been installed on this element.\n\nElement: ${
              this.element.outerHTML
            }\n`
          )
        }
      }
      window.Pj.instances[this.plugin].push(this)
    }
  }

  static of(...args) {
    return new this(...args)
  }

  destroy() {
    this.plugin = null
    this.element = null
    if (window.Pj && window.Pj.instances[this.plugin]) {
      window.Pj.instances[this.plugin] = window.Pj.instances[
        this.plugin
      ].filter(plugin => plugin.element === this.element)
    }
  }
}
