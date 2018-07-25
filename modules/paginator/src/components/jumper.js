import templateEngine from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query } from '@pluginjs/dom'
import { deepMerge } from '@pluginjs/utils'

class Jumper {
  constructor(instance) {
    this.options = deepMerge(
      Jumper.defaults,
      instance.options.components.jumper
    )
    this.instance = instance
  }

  generate() {
    return templateEngine.render(this.options.template.call(this), {
      classes: this.instance.classes,
      label: this.instance.translate('jump', {
        input: '<input type="number" min="1" value="1" />'
      })
    })
  }

  bind() {
    const instance = this.instance
    this.jumper = query(`.${instance.classes.JUMPER}`, instance.element)
    this.input = query('input', this.jumper)

    bindEvent(
      {
        type: 'keydown',
        handler: e => {
          if (e.which === 13) {
            let page = parseInt(e.target.value, 10)
            page = page > 0 ? page : instance.currentPage
            instance.goTo(page)
            e.preventDefault()
          }
        }
      },
      this.input
    )
  }

  unbind() {
    removeEvent('keydown', this.input)
  }
}

Jumper.defaults = {
  template() {
    return '<li class="{classes.ITEM} {classes.JUMPER}">{label}</span>'
  }
}

Jumper.translations = {
  en: { jump: 'Goto {input}' },
  zh: { jump: '前往 {input} 页' }
}

Jumper.classes = { JUMPER: '{namespace}-jumper' }

export default Jumper
