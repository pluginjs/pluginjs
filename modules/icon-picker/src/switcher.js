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
          text: instance.current.title
        }
      ),
      instance.getActions()
    )

    this.$label = query('span', this.element)

    this.DROPDOWN = Dropdown.of(this.element, {
      target: query(`.${instance.classes.SWITCHERDROPDOWN}`, this.element),
      placement: 'top-start',
      data: instance.getPacks().map(pack => {
        return {
          value: pack.name,
          label: pack.title
        }
      }),
      keyboard: instance.options.keyboard,
      onChange: value => {
        instance.switchPack(value)
        const pack = instance.getPack(value)
        html(pack.title, this.$label)
      }
    })
  }
}
