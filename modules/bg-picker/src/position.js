import template from '@pluginjs/template'
import { parseHTML, queryAll, closest, setData, getData } from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import Tooltip from '@pluginjs/tooltip'

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
      bgPosition: this.instance.translate('bgPosition'),
      topLeft: this.instance.translate('topLeft'),
      topCenter: this.instance.translate('topCenter'),
      topRight: this.instance.translate('topRight'),
      centerLeft: this.instance.translate('centerLeft'),
      centerRight: this.instance.translate('centerRight'),
      center: this.instance.translate('center'),
      bottomLeft: this.instance.translate('bottomLeft'),
      bottomRight: this.instance.translate('bottomRight'),
      bottomCenter: this.instance.translate('bottomCenter')
    })

    this.$wrap = parseHTML(html)

    this.$items = queryAll('li', this.$wrap)
    for (let i = 0; i < this.$items.length; i++) {
      Tooltip.of(this.$items[i], {
        trigger: 'hover',
        title: '',
        placement: 'bottom'
      })
    }
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
