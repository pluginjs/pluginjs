import { prependTo, query, html } from '@pluginjs/dom'
import templateEngine from '@pluginjs/template'
import Dropdown from '@pluginjs/dropdown'

export default class Switcher {
  constructor(instance) {
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

    this.DROPDOWN = Dropdown.of(this.element, {
      target: query(`.${instance.classes.SWITCHERDROPDOWN}`, this.element),
      placement: 'top-start',
      value: instance.current.name,
      data: instance.getPacks().map(pack => {
        return {
          value: pack.name,
          label: pack.title
        }
      }),
      onShow() {
        this.selectByValue(instance.current.name)
      },
      keyboard: instance.options.keyboard,
      onChange: value => {
        instance.switchPack(value)
        const pack = instance.getPack(value)
        html(this.getLabel(pack), this.$label)
      }
    })
  }

  getLabel(pack) {
    return pack.title
  }

  destroy() {
    this.DROPDOWN.destroy()
    this.element.remove()
  }
}
