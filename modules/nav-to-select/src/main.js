import Component from '@pluginjs/component'
import { isUndefined } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  parseHTML,
  query,
  insertBefore,
  insertAfter,
  wrap
} from '@pluginjs/dom'
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class NavToSelect extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    const items = this.getItems()

    addClass(this.classes.ORIGINAL, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.build(items)

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    bindEvent(
      this.eventName('change'),
      this.options.onChange.bind(this.select),
      this.select
    )

    /* fix orientation change issue */
    bindEvent(
      this.eventName('orientationchange'),
      () => {
        if (this.$select.is(':hidden') && this.$select.is(':focus')) {
          this.select.blur()
        }
      },
      document.body
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.select)
    removeEvent(this.eventName(), document.body)
  }

  build(items) {
    this.wrap = parseHTML(`<div class=${this.classes.WRAP} />`)
    this.select = parseHTML(
      `<select class=${this.classes.SELECT} ${
        this.options.multiple ? 'multiple' : ''
      }/>`
    )
    this.select.innerHTML = this.buildOptions(items, 1)

    wrap(this.wrap, this.select)

    if (this.options.prependTo === null) {
      insertAfter(this.wrap, this.element)
    } else {
      const prependTo =
        typeof this.options.prependTo === 'string'
          ? this.options.prependTo
          : query(this.options.prependTo)

      insertBefore(this.wrap, prependTo)
    }
    this.enter('builded')
  }

  buildOption(item, level) {
    let indent = new Array(level).join(this.options.indentString)

    if (level !== 1 && this.options.indentSpace) {
      indent += '&nbsp '
    }

    return `<option value="${item.value}" ${
      item.items && !item.linkable ? 'disabled' : ''
    } ${!item.linkable ? 'data-linkable="false"' : ''} ${
      item.actived ? 'selected="selected"' : ''
    } ${item.hidden ? 'hidden' : ''}>${indent}${item.label}</option>`
  }

  buildOptions(items, level) {
    if (level > this.options.maxLevel) {
      return ''
    }
    let options = ''
    items.forEach(item => {
      if (isUndefined(item.items)) {
        options += this.buildOption(item, level)
      } else if (this.options.useOptgroup && level === 1) {
        options += `<optgroup label="${item.label}">`
        options += this.buildOptions(item.items, level + 1)
        options += '</optgroup>'
      } else {
        options += this.buildOption(item, level)
        options += this.buildOptions(item.items, level + 1)
      }
    })
    return options
  }

  getItems() {
    let items = []
    if (this.options.placeholder) {
      items = items.concat({
        value: '#',
        label: this.options.placeholder,
        linkable: false,
        hidden: true
      })
    }

    items = items.concat(
      this.options.getItemsFromList.call(this, this.element, 1)
    )

    return items
  }

  // Get link url
  getItemValue(li) {
    return li.querySelector(this.options.linkSelector).getAttribute('href')
  }

  // Check if a item can link
  isLinkable(li) {
    const value = this.getItemValue(li)

    return value !== '#' && value.indexOf('void(0)') === -1
  }

  // Check if a item is actived
  isActived(li) {
    return li.classList.contains(this.options.activeClass)
  }

  // Check if select is builded already
  isBuilded() {
    return this.is('builded')
  }

  getSelect() {
    return this.select
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default NavToSelect
