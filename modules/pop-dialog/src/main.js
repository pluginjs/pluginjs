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
    if (!action) {
      return false
    }

    for (let i = 0; i < this.options.buttons.length; i++) {
      if (action === this.options.buttons[i].action) {
        const button = this.options.buttons[i]
        if (isFunction(button.fn)) {
          button.fn(this.hide.bind(this))
        } else {
          this.hide()
        }
      }
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
    this.options.buttons.forEach(button => {
      if (button.action) {
        buttons += buttonTemplate({
          action: button.action,
          label: button.label,
          classes: this.classes,
          colorClass: this.getClass(
            this.classes.BUTTONCOLOR,
            'color',
            button.color
          ),
          custom: button.classes
        })
      }
    })

    return buttons
  }
}

export default PopDialog
