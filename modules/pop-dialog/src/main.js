import templateEngine from '@pluginjs/template'
import { isFunction } from '@pluginjs/is'
import { compose } from '@pluginjs/utils'
import { bindEvent } from '@pluginjs/events'
import { data, closest } from '@pluginjs/dom'
import { hasClass } from '@pluginjs/classes'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import Popover from '@pluginjs/popover'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class PopDialog extends Popover {
  constructor(element, options = {}) {
    super(element, options)
  }

  bind() {
    super.bind()
    bindEvent(
      this.selfEventName(EVENTS.SHOW),
      () => this.bindButtonEvents(),
      this.element
    )
  }

  bindButtonEvents() {
    const $tip = this.getTip()
    if (data('buttonEventsBinded', $tip)) {
      return
    }

    bindEvent(
      this.eventName('click'),
      `.${this.classes.BUTTON}`,
      ({ target }) => {
        this.do(
          hasClass(this.classes.BUTTON, target)
            ? data('action', target)
            : compose(
                data('action'),
                closest(`.${this.classes.BUTTON}`)
              )(target)
        )
        return false
      },
      $tip
    )
    data({ buttonEventsBinded: true }, $tip)
  }

  do(action) {
    if (!action || typeof this.options.buttons[action] === 'undefined') {
      return false
    }
    const button = this.options.buttons[action]

    if (isFunction(button.fn)) {
      button.fn(this.hide.bind(this))
    } else {
      this.hide()
    }

    return null
  }

  createTip() {
    let arrow = ''
    let close = ''

    if (this.options.close) {
      close = templateEngine.render(this.options.templates.close.call(this), {
        classes: this.classes
      })
    }

    if (this.options.arrow) {
      arrow = templateEngine.render(this.options.templates.arrow.call(this), {
        classes: this.classes
      })
    }

    const title = templateEngine.render(
      this.options.templates.title.call(this),
      { classes: this.classes }
    )

    const content = templateEngine.render(
      this.options.templates.content.call(this),
      { classes: this.classes }
    )

    const buttons = templateEngine.render(
      this.options.templates.buttons.call(this),
      { classes: this.classes, buttons: this.createButtons() }
    )

    return templateEngine.render(this.options.template.call(this), {
      classes: this.classes,
      close,
      arrow,
      title,
      content,
      buttons
    })
  }

  createButtons() {
    const buttonTemplate = templateEngine.compile(
      this.options.templates.button.call(this)
    )

    let buttons = ''
    Object.entries(this.options.buttons).forEach(
      ([action, { label, color, classes }]) => {
        buttons += buttonTemplate({
          action,
          label,
          classes: this.classes,
          colorClass: this.getClass(this.classes.BUTTONCOLOR, 'color', color),
          custom: classes
        })
      }
    )

    return buttons
  }
}

export default PopDialog
