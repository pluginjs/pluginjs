import Component from '@pluginjs/component'
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
    this.selectInput = parseHTML(`<div class=${this.classes.INPUT} />`)
    this.select = parseHTML(`<select class=${this.classes.SELECT} />`)
    this.select.innerHTML = this.buildOptions(items, 1)
    this.selectin = this.select.selectedIndex
    if (this.options.prependTo === null) {
      insertAfter(this.select, this.element)
      wrap(this.selectInput, this.select)
    } else {
      const prependTo =
        typeof this.options.prependTo === 'string'
          ? this.options.prependTo
          : query(this.options.prependTo)
      insertBefore(this.select, prependTo)
    }
    this.enter('builded')
  }

  buildOption(item, level) {
    let INDENT = new Array(level).join(this.options.indentString)
    if (level !== 1 && this.options.indentSpace) {
      INDENT += '&nbsp '
    }
    return `<option value="${item.value}"${
      item.linkable === false ? ' data-linkable="false"' : ''
    }${item.actived === true ? ' selected="selected"' : ''} ${
      item.hidden === true ? 'hidden' : ''
    }>${INDENT}${item.label}</option>`
  }
  buildOptions(items, level) {
    if (level > this.options.maxLevel) {
      return ''
    }
    let options = ''
    items.forEach(item => {
      if (typeof item.items !== 'undefined') {
        options += this.buildOption(item, level)
        options += this.buildOptions(item.items, level + 1)
      } else {
        options += this.buildOption(item, level)
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
    return this.getItemValue(li) !== '#'
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
