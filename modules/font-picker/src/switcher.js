import { prependTo, query, html } from '@pluginjs/dom'
import templateEngine from '@pluginjs/template'
import Dropdown from '@pluginjs/dropdown'

export default class Switcher {
  constructor(instance) {
    this.instance = instance

    this.element = prependTo(
      templateEngine.render(
        instance.options.templates.switcher.call(instance),
        {
          classes: instance.classes,
          label: this.getLabel(instance.current)
        }
      ),
      instance.getActions()
    )

    this.$label = query(`.${instance.classes.SWITCHERLABEL}`, this.element)
    this.DROPDOWN = Dropdown.of(this.$label, {
      reference: this.element,
      target: query(`.${instance.classes.SWITCHERDROPDOWN}`, this.element),

      placement: 'top-start',
      value: instance.current.name,
      data: instance.getSources().map(source => {
        return {
          value: source.name,
          label: this.getLabel(source)
        }
      }),
      keyboard: instance.options.keyboard,
      onChange: value => {
        instance.switchSource(value)
        const source = instance.getSource(value)
        html(this.getLabel(source), this.$label)
      }
    })
  }

  getLabel(source) {
    return templateEngine.render(
      this.instance.options.templates.switcherLabel.call(this.instance),
      {
        classes: this.instance.classes,
        source
      }
    )
  }

  destroy() {
    this.DROPDOWN.destroy()
    this.element.remove()
  }
}
