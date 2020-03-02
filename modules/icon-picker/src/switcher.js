import { prependTo, appendTo, query, html } from '@pluginjs/dom'
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

    if (instance.realData.length > 1) {
      this.$label = query(`.${instance.classes.SWITCHERLABEL}`, this.element)

      this.$switcherDropdown = appendTo(
        `<div class="${instance.classes.SWITCHERDROPDOWN}"></div>`,
        this.element
      )

      this.DROPDOWN = Dropdown.of(this.$label, {
        target: query(`.${instance.classes.SWITCHERDROPDOWN}`, this.element),
        placement: 'top',
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
          if (value) {
            const pack = instance.getPack(value)
            html(this.getLabel(pack), this.$label)
            instance.switchPack(value)
          }
        }
      })
    }
  }

  getLabel(pack) {
    return pack.title
  }

  destroy() {
    if (this.DROPDOWN) {
      this.DROPDOWN.destroy()
    }
    this.element.remove()
  }
}
