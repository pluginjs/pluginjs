import { isString, isIE, isIE11 } from '@pluginjs/is'
import { query } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'

class Preview {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.$color = query(`.${this.instance.classes.PREVIEWCOLOR}`, this.element)

    this.bind()
  }

  bind() {
    bindEvent(
      this.instance.selfEventName('change'),
      (e, el, color) => {
        this.update(color)
      },
      this.instance.element
    )
  }

  update(color) {
    if (isString(color)) {
      setStyle('background', color, this.$color)
    } else {
      setStyle('background', color.toRGBA(), this.$color)
    }
    return null
  }

  remove() {
    if(isIE() || isIE11()) {
      this.element.removeNode(true);
    } else {
      this.element.remove()
    }
  }
}

export default Preview
