import templateEngine from '@pluginjs/template'
import { query } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { deepMerge } from '@pluginjs/utils'

class Total {
  constructor(instance) {
    const options = instance.options.components.total || {}
    this.options = deepMerge(Total.defaults, options)
    this.instance = instance
  }

  getLabel() {
    return this.instance.translate('total', { total: this.instance.totalItems })
  }

  generate() {
    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.instance.classes,
      label: this.getLabel()
    })
    return html
  }

  bind() {
    const instance = this.instance

    if (!this.total) {
      this.total = query(`.${instance.classes.TOTAL}`, instance.element)
    }

    bindEvent(
      {
        type: 'paginator:change',
        handler: () => {
          this.total.textContent = this.getLabel()
        }
      },
      this.instance.element
    )
  }
}

Total.defaults = {
  template() {
    return '<li class="{classes.ITEM} {classes.TOTAL}">{label}</li>'
  }
}

Total.classes = { TOTAL: '{namespace}-total' }

Total.translations = {
  en: { total: 'Total {total} items' },
  zh: { total: '共 {total} 条' }
}

export default Total
