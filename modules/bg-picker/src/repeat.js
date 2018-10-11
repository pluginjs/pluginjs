import template from '@pluginjs/template'
import { parseHTML, queryAll, closest, setData, getData } from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import Tooltip from '@pluginjs/tooltip'

export default class Repeat {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.repeat.values
    this.defaultValue = instance.options.repeat.defaultValue

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.repeat.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'repeat'
      ),
      bgRepeat: this.instance.translate('bgRepeat'),
      repeat: this.instance.translate('repeat'),
      noRepeat: this.instance.translate('noRepeat'),
      repeatX: this.instance.translate('repeatX'),
      repeatY: this.instance.translate('repeatY')
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
      // this.$items[key].dataset.repeat = value
      setData('repeat', value, this.$items[key])
    })

    const value =
      typeof this.instance.value.repeat !== 'undefined'
        ? this.instance.value.repeat
        : this.defaultValue
    this.set(value)
    this.bind()
  }

  set(value) {
    let found = false
    this.$items.map(removeClass(this.instance.classes.ACTIVE))
    for (let i = 0; i < this.values.length; i++) {
      if (value === this.values[i]) {
        this.instance.value.repeat = value
        addClass(this.instance.classes.ACTIVE, this.$items[i])
        setStyle('background-repeat', value, this.instance.$image)
        setStyle('background-repeat', value, this.instance.TRIGGER.$fillImage)
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
        const el = target.tagName === 'LI' ? target : closest('LI', target)
        if (this.instance.disabled) {
          return null
        }
        const value = getData('repeat', el)
        this.set(value)
        // that.instance.update();
        return false
      },
      this.$wrap
    )
  }
}
