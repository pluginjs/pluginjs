import { clone, removeAttr, attr, prop, insertAfter } from '@pluginjs/dom'
import { addClass } from '@pluginjs/classes'
import { getStyle, setStyle } from '@pluginjs/styled'
export default class Hint {
  constructor(instance) {
    this.element = clone(instance.element)
    this.element.value = ''
    addClass(instance.classes.HINT, this.element)
    removeAttr('id name placeholder required', this.element)
    attr(
      {
        'aria-hidden': 'true',
        autocomplete: 'off',
        spellcheck: 'false',
        tabindex: -1
      },
      this.element
    )
    prop('readonly', true, this.element)
    setStyle(
      getStyle(
        [
          'backgroundAttachment',
          'backgroundClip',
          'backgroundColor',
          'backgroundImage',
          'backgroundOrigin',
          'backgroundPosition',
          'backgroundRepeat',
          'backgroundSize'
        ],
        instance.element
      ),
      this.element
    )

    setStyle('backgroundColor', 'transparent', instance.element)

    insertAfter(this.element, instance.element)
    this.instance = instance
  }

  check(value) {
    if (this.element.value.indexOf(value) !== 0) {
      this.clear()
    }
  }

  val() {
    return this.element.value
  }

  set(value) {
    this.element.value = value
  }

  clear() {
    this.set('')
  }

  disable() {
    this.element.disabled = true
  }

  enable() {
    this.element.disabled = false
  }

  destroy() {
    setStyle('backgroundColor', null, this.instance.element)
    this.element.remove()
  }
}
