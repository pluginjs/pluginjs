import { setStyle } from '@pluginjs/styled'
import { append, detach, parseHTML, parent } from '@pluginjs/dom'
import { bindEvent, bindEventOnce, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { isString } from '@pluginjs/is'
import template from '@pluginjs/template'
import { reflow } from '@pluginjs/utils'

export default class Overlay {
  constructor(instance) {
    this.el = parseHTML(
      template.render(instance.options.templates.overlay.call(instance), {
        classes: instance.classes
      })
    )

    this.instance = instance

    addClass(instance.classes.OVERLAY, this.el)

    if (isString(instance.options.overlay)) {
      setStyle(
        {
          backgroundColor: instance.options.overlay
        },
        this.el
      )
    }

    bindEvent(
      instance.eventName('click'),
      () => {
        instance.close()
      },
      this.el
    )
  }

  attach(el) {
    append(this.el, parent(el.element))
    reflow(this.el)
    addClass(this.instance.classes.OVERLAYSHOW, this.el)
  }

  detach() {
    bindEventOnce(
      this.instance.eventName('transitionend'),
      () => {
        detach(this.el)
      },
      this.el
    )

    removeClass(this.instance.classes.OVERLAYSHOW, this.el)
  }

  destroy() {
    removeEvent(this.instance.eventName(), this.el)
  }
}
