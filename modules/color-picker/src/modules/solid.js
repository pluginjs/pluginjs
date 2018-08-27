// import { isString } from '@pluginjs/is'
// import { query } from '@pluginjs/dom'
import { isString } from '@pluginjs/is'
// import { bindEvent } from '@pluginjs/events'
// import { setStyle } from '@pluginjs/styled'
import { Color } from '@pluginjs/color'

class Solid {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.classes = this.instance.classes
    this.color = Color.of(
      this.instance.options.defaultColor,
      this.instance.options.color
    )

    this.init()
  }

  init() {
    // init solid
    // this.color = Color.of(this.instance.options.defaultColor, this.instance.options.color)
    this.build()
  }

  build() {
    const $solid = this.instance.createEl('content', {
      handle: this.classes.SOLIDHANDLE,
      primary: this.classes.SOLIDPRIMARY,
      action: this.classes.SOLIDACTION,
      history: this.classes.SOLIDHISTORY,
      done: this.classes.SOLIDDONE
    })
    // this.element = query(`.${this.classes.PANELSOLID}`, this.$panel)
    this.element.append(...$solid)
    // this.registerComponent()
  }

  setSolid(val) {
    if (!val) {
      val = this.instance.info.solid
    }
    const color = this.color.val(val)
    if (isString(val) && val.indexOf('#') > -1) {
      this.instance.setInput(color.toHEX())
    } else if (isString(val) && !val.match(/\d/g)) {
      this.instance.setInput(color.toNAME())
    } else {
      this.instance.setInput(color.toRGBA())
    }

    this.instance.PREVIEW.update(color)
    this.instance.trigger('change', color)
  }
}

export default Solid
