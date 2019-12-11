import { appendTo, query } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'

export default class Clearable {
  constructor(instance) {
    this.element = appendTo(
      `<i class="${instance.classes.CLEAR}"></i>`,
      query(`.${instance.classes.TRIGGER}`, instance.$wrap)
    )
    addClass(instance.classes.CLEARABLE, instance.$wrap)
    bindEvent(
      instance.eventName('click'),
      () => {
        instance.clear(true)
        
        return false
      },
      this.element
    )
  }

  destroy() {
    this.element.remove()
  }
}
