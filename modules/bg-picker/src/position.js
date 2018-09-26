import template from '@pluginjs/template'
import { parseHTML, queryAll, closest, setData, getData } from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'

export default class Position {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.position.values
    this.defaultValue = instance.options.position.defaultValue

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.position.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'position'
      ),
      bgPosition: this.instance.translate('bgPosition')
    })

    this.$wrap = parseHTML(html)

    this.$items = queryAll('li', this.$wrap)
    this.values.forEach((value, key) => {
      // this.$items[key].dataset.position = value
      setData('position', value, this.$items[key])
    })

    const value =
      typeof this.instance.value.position !== 'undefined'
        ? this.instance.value.position
        : this.defaultValue
    this.set(value)

    this.bind()
  }

  set(value) {
    let found = false
    this.$items.map(removeClass(this.instance.classes.ACTIVE))
    for (let i = 0; i < this.values.length; i++) {
      if (value === this.values[i]) {
        this.instance.value.position = value
        addClass(this.instance.classes.ACTIVE, this.$items[i])
        setStyle('background-position', value, this.instance.$image)
        setStyle('background-position', value, this.instance.TRIGGER.$fillImage)
        found = true
      }
    }

    if (!found) {
      this.set(this.defaultValue)
    }
  }

  clear() {
    this.set(this.defaultValue)
  }

  bind() {
    bindEvent(
      this.instance.eventName('click'),
      'li',
      ({ target }) => {
        const el = target.tagName === 'LI' ? target : closest('li', target)
        if (this.instance.disabled) {
          return null
        }
        const value = getData('position', el)
        this.set(value)
        // that.instance.update();
        return false
      },
      this.$wrap
    )
  }
}
