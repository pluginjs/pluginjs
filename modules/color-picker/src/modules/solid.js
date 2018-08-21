// import { isString } from '@pluginjs/is'
import { query } from '@pluginjs/dom'
// import { bindEvent } from '@pluginjs/events'
// import { setStyle } from '@pluginjs/styled'
// import { Color } from '@pluginjs/color'

class Solid {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.classes = this.instance.classes

    this.init()
  }

  init() {
    // init solid
    if (this.instance.hasModule('solid')) {
      this.build()
    }
  }

  build() {
    const $solid = this.instance.createEl('content', {
      handle: this.classes.SOLIDHANDLE,
      primary: this.classes.SOLIDPRIMARY,
      action: this.classes.SOLIDACTION,
      history: this.classes.SOLIDHISTORY,
      done: this.classes.SOLIDDONE
    })
    this.element = query(`.${this.classes.PANELSOLID}`, this.$panel)
    this.element.append(...$solid)
    // this.registerComponent()
  }
}

export default Solid
