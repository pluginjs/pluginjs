import template from '@pluginjs/template'
import { parseHTML, setData, append } from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import Tooltip from '@pluginjs/tooltip'

export default class FontStyle {
  constructor(instance) {
    this.instance = instance
    this.value = instance.options.fontStyle.value
    this.defaultValue = instance.options.fontStyle.value

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.fontStyle.template())({
      classes: this.instance.classes,
      font: this.instance.translate('font')
    })
    
    this.$wrap = parseHTML(html)
    Tooltip.of(this.$wrap, {
      trigger: 'hover',
      title: '',
      placement: 'bottom'
    })

    append(this.$wrap, this.instance.$typoDecorations)
    setData('fontStyle', this.value, this.$wrap)
    this.set(this.value)

    this.bind()
  }

  set(value) {
    if (value === 'italic') {
      addClass(this.instance.classes.ACTIVE, this.$wrap)
      this.instance.value.fontStyle = 'italic'
    } else {
      removeClass(this.instance.classes.ACTIVE, this.$wrap)
      this.instance.value.fontStyle = ''
    }
  }

  clear() {
    this.set(this.defaultValue)
  }

  bind() {
    const that = this
    bindEvent(
      this.instance.eventName('click'),
      e => {
        if (that.instance.is('disabled')) {
          return this
        }
        if (that.instance.value.fontStyle === 'italic') {
          that.instance.value.fontStyle = ''
          removeClass(that.instance.classes.ACTIVE, e.target)
        } else {
          that.instance.value.fontStyle = 'italic'
          addClass(that.instance.classes.ACTIVE, e.target)
        }
        return null
      },
      this.$wrap
    )
  }
}
