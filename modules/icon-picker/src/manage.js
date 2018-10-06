import { appendTo } from '@pluginjs/dom'
import templateEngine from '@pluginjs/template'
import { bindEvent } from '@pluginjs/events'

export default class Manage {
  constructor(instance) {
    this.element = appendTo(
      templateEngine.render(instance.options.templates.manage.call(instance), {
        classes: instance.classes,
        text: instance.translate('manageText')
      }),
      instance.getActions()
    )

    bindEvent(
      instance.eventName('click'),
      () => {
        instance.manage()
      },
      this.element
    )
  }
}
