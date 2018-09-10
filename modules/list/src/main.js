import Component from '@pluginjs/component'
import {
  parseHTML,
  wrap,
  parent,
  children,
  queryAll,
  query,
  closest,
  appendTo,
  unwrap,
  replace,
  empty,
  insertAfter,
  insertBefore
} from '@pluginjs/dom'
import { arrayEqual, each } from '@pluginjs/utils'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { hasClass, addClass, removeClass } from '@pluginjs/classes'
import { isArray } from '@pluginjs/is'
import template from '@pluginjs/template'
import Sortable from 'sortablejs'
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
class List extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupStates()
    this.setupClasses()
    this.setupI18n()

    this.initData()
    this.initialize()
  }

  initData() {
    if (this.element.value) {
      this.data = this.options.parse.call(this, this.element.value)
    } else if (this.options.data) {
      this.data = this.options.data
    } else {
      this.data = []
    }

    this.data = this.processData(this.data)
  }

  initialize() {
    this.element.value = this.val()

    this.build()
    this.setupSortable()
    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  build() {
    addClass(this.classes.ELEMENT, this.element)

    this.$wrapper = wrap(
      `<div class="${this.classes.WRAPPER}"></div>`,
      this.element
    )

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrapper)
    }

    this.$list = appendTo(
      template.compile(this.options.templates.container())({
        classes: this.classes
      }),
      this.$wrapper
    )

    this.buildItems()
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      `.${this.classes.ITEM}`,
      ({ target }) => {
        if (hasClass(this.classes.ACTION, target)) {
          return
        }
        const $item = hasClass(this.classes.ITEM, target)
          ? target
          : closest(`.${this.classes.ITEM}`, target)
        const index = this.getIndex($item)

        this.trigger(EVENTS.CLICKITEM, index, this.data[index])
      },
      this.$list
    )

    bindEvent(
      this.selfEventName([
        EVENTS.REMOVE,
        EVENTS.ADD,
        EVENTS.EDIT,
        EVENTS.SORT,
        EVENTS.CLEAR
      ]),
      () => {
        const value = this.val()
        this.element.value = value

        this.trigger(EVENTS.CHANGE, value)
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.$list)
  }

  setupSortable() {
    this.sortable = Sortable.create(this.$list, {
      animation: 150,
      handle: `.${this.classes.HANDLE}`,
      onUpdate: e => {
        this.sort(e.oldIndex, e.newIndex, false)
      }
    })
  }

  sort(oldIndex, newIndex = -1, dom = true) {
    if (oldIndex !== newIndex) {
      const item = this.data[oldIndex]

      if (newIndex <= -1) {
        newIndex = this.data.length - 1
      }

      if (dom) {
        const $item = this.getItem(oldIndex)
        const $new = this.getItem(newIndex)

        if (oldIndex > newIndex) {
          insertBefore($item, $new)
        } else {
          insertAfter($item, $new)
        }
      }

      if (oldIndex > newIndex) {
        this.data.splice(newIndex, 0, item)
        this.data.splice(oldIndex + 1, 1)
      } else {
        this.data.splice(newIndex + 1, 0, item)
        this.data.splice(oldIndex, 1)
      }

      this.trigger(EVENTS.SORT, oldIndex, newIndex, item)
    }
  }

  buildItems() {
    empty(this.$list)

    this.data.forEach(item => {
      const $item = this.buildItem(item)

      this.$list.append($item)

      this.initActions(item, $item)
    })
  }

  buildItem(item) {
    const $item = parseHTML(
      template.compile(this.options.templates.item())({
        classes: this.classes,
        label: this.getItemLabel(item),
        actions: this.buildActions(item)
      })
    )

    return $item
  }

  initActions(item, $item) {
    each(this.options.actions, action => {
      const $action = query(`[data-action="${action.name}"]`, $item)

      action.init.apply($action, [this, item, $item])
    })
  }

  buildActions(item) {
    let actions = ''
    this.options.actions.forEach(action => {
      actions += template.compile(this.options.templates.action.call(action))({
        action,
        item,
        classes: this.classes
      })
    })

    return actions
  }

  processData(data) {
    return data
  }

  set(data) {
    if (isArray(data) && !arrayEqual(data, this.data)) {
      this.data = this.processData(data)
      this.buildItems()

      this.element.value = this.val()
    }
  }

  get() {
    return this.data
  }

  val(data) {
    if (typeof data === 'undefined') {
      return this.options.process(this.get())
    }

    data = this.options.parse.call(this, data)

    return this.set(data)
  }

  getItems() {
    return queryAll(`.${this.classes.ITEM}`, this.$wrapper)
  }

  getItemLabel(item) {
    return this.options.label(item)
  }

  getItem(index) {
    const $items = this.getItems()

    if (typeof $items[index] !== 'undefined') {
      return $items[index]
    }
    return null
  }

  getIndex($item) {
    return children(parent($item)).indexOf($item)
  }

  remove(index) {
    const $item = this.getItem(index)

    if ($item) {
      $item.remove()

      const item = this.data[index]
      this.data.splice(index, 1)

      this.trigger(EVENTS.REMOVE, index, item)
    }
  }

  add(item, index) {
    if (typeof index === 'undefined') {
      index = this.data.length
    }
    if (index < 0) {
      index = 0
    }

    const $item = this.buildItem(item)
    addClass(this.classes.NEW, $item)

    if (index === this.data.length || this.data.length === 0) {
      this.data.push(item)
      this.$list.append($item)
    } else {
      this.data.splice(index, 0, item)
      const $currentItem = this.getItem(index)
      insertBefore($item, $currentItem)
    }

    this.initActions(item, $item)

    setTimeout(() => {
      removeClass(this.classes.NEW, $item)
    }, 300)

    this.trigger(EVENTS.ADD, item)
  }

  edit(index, item) {
    const $item = this.getItem(index)

    if ($item) {
      this.data[index] = item

      replace(this.buildItem(item), $item)
      this.initActions(item, $item)
      this.trigger(EVENTS.EDIT, index, item)
    }
  }

  clear() {
    this.element.value = ''
    this.data = []
    empty(this.$list)

    this.trigger(EVENTS.CLEAR)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrapper)
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrapper)
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      this.$list.remove()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrapper)
      }
      unwrap(this.element)
      // removeClass(this.classes.INPUT, this.element)

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default List
