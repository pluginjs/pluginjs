import template from '@pluginjs/template'
import { query, parseHTML } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import List from '@pluginjs/list'

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class TagList extends List {
  constructor(element, options = {}) {
    super(element, options)
  }

  build() {
    super.build()
    this.buildAddBtn()
  }

  buildAddBtn() {
    this.$add = parseHTML(
      template.compile(this.options.templates.add())({
        classes: this.classes,
        placeholder: this.translate('addPlaceholder'),
        btnText: this.translate('add')
      })
    )

    this.$input = query(`.${this.classes.ADDINPUT}`, this.$add)
    this.$btn = query(`.${this.classes.ADDBTN}`, this.$add)

    this.$wrapper.append(this.$add)
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      () => {
        if (this.is('disabled')) {
          return
        }

        if (this.$input.value !== '') {
          this.add(this.$input.value)
          this.$input.value = ''
        }
      },
      this.$btn
    )

    super.bind()
  }

  unbind() {
    removeEvent(this.eventName(), this.$btn)

    super.unbind()
  }

  destroy() {
    this.$add.remove()
    super.destroy()
  }

  enable() {
    if (this.is('disabled')) {
      this.$btn.disabled = false
      this.$input.disabled = false
    }
    super.enable()
  }

  disable() {
    if (!this.is('disabled')) {
      this.$btn.disabled = true
      this.$input.disabled = true
    }
    super.disable()
  }
}

export default TagList
