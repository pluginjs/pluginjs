import template from '@pluginjs/template'
import { parseHTML } from '@pluginjs/dom'
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
class ItemList extends List {
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
        addText: this.translate('add')
      })
    )

    this.$wrapper.append(this.$add)
  }

  clone(index) {
    const item = this.data[index]

    this.add(item, index + 1)

    this.trigger(EVENTS.CLONE, index, item)
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      () => {
        if (this.is('disabled')) {
          return
        }
        console.log(233)
        this.trigger(EVENTS.CLICKADD)
      },
      this.$add
    )

    super.bind()
  }

  unbind() {
    removeEvent(this.eventName(), this.$add)

    super.unbind()
  }

  destroy() {
    this.$add.remove()
    super.destroy()
  }

  enable() {
    if (this.is('disabled')) {
      this.$add.disabled = false
    }
    super.enable()
  }

  disable() {
    if (!this.is('disabled')) {
      this.$add.disabled = true
    }
    super.disable()
  }
}

export default ItemList
