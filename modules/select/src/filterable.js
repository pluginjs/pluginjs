import { replace } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'

export default class Filterable {
  constructor(instance) {
    instance.$label = replace(
      `<input type="text" autocomplete="off" placeholder="${
        instance.placeholder
      }" class="${instance.classes.FILTER} ${instance.classes.LABEL}">`,
      instance.$label
    )
    addClass(instance.classes.FILTERABLE, instance.$wrap)
    bindEvent(
      instance.eventName('input'),
      () => {
        console.info(instance.$label.value)
      },
      instance.$label
    )
  }
}
