import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { isArray } from '@pluginjs/is'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { getStyle } from '@pluginjs/styled'
import {
  parseHTML,
  children,
  query,
  queryAll,
  getData,
  appendTo,
  closest
} from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'
import Pj from '@pluginjs/factory'
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
class Filters extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.itemSelector = `.${this.classes.ITEM}`
    this.$activeItem = null

    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.CONTAINER, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    if (this.options.items) {
      this.build(this.options.items)
    }

    if (!this.$filters) {
      this.$filters = this.getFilters()
      this.filtersData = this.getFiltersData(this.$filters)
    }

    if (this.options.default) {
      this.setActiveItemByValue(this.options.default)
    }

    if (this.options.responsive) {
      this.responsive()
    }
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  getFilters() {
    return queryAll(this.itemSelector, this.element)
  }

  build(items) {
    const html = this.getItemsHtml(items)

    if (html) {
      this.element.innerHTML = html
    }

    this.$filters = this.getFilters()
    this.filtersData = this.getFiltersData(this.$filters)
  }

  append(items) {
    const html = this.getItemsHtml(items)

    if (html) {
      this.element.append(...parseHTML(html))
    }

    this.$filters = this.getFilters()
    this.filtersData = this.getFiltersData(this.$filters)
  }

  getFiltersData($filters) {
    const itemArr = []
    $filters.forEach(($item, index) => {
      itemArr.push({
        $el: $item,
        width: this.getOuterWidth($item),
        data: {
          label: $item.innerHTML,
          index
        }
      })
    })

    return itemArr
  }

  getOuterWidth(el) {
    const { marginLeft, marginRight } = getStyle(
      ['marginLeft', 'marginRight'],
      el
    )

    return (
      parseInt(marginLeft, 10) +
      parseInt(marginRight, 10) +
      parseFloat(getStyle('width', el), 10)
    )
  }

  getItemsHtml(items) {
    let html = ''

    if (isArray(items)) {
      const template = templateEngine.compile(
        this.options.templates.item.call(this)
      )
      items.forEach(item => {
        html += template(
          Object.assign(
            {
              classes: this.classes
            },
            item
          )
        )
      })
    }

    return html
  }

  bind() {
    bindEvent(
      this.eventName('click touch'),
      this.itemSelector,
      ({ target }) => {
        if (!this.is('disabled')) {
          if (!hasClass(this.itemSelector, target)) {
            target = closest(this.itemSelector, target)
          }
          this.setActiveItem(target)
        }
      },
      this.element
    )

    if (this.options.responsive) {
      Pj.emitter.on(this.eventNameWithId('resize'), () => {
        this.responsive()
      })
    }
  }

  responsive() {
    const itemArr = [].concat(this.filtersData)
    let tempWidth = 0
    let nodeIndex = 0

    for (let index = 0; index < itemArr.length; index++) {
      const item = itemArr[index]
      removeClass(this.classes.HIDE, item.$el)
      tempWidth += item.width

      if (Math.round(tempWidth) > Math.round(this.getWidth())) {
        nodeIndex = index - 1
        break
      }
    }

    if (!nodeIndex) {
      if (this.DROPDOWN) {
        this.$more.remove()
        this.DROPDOWN.destroy()
        this.DROPDOWN.$dropdown.remove()
        this.DROPDOWN = null
      }
      return
    }

    const dropdownItems = itemArr.splice(nodeIndex)
    const data = []
    dropdownItems.forEach(item => {
      addClass(this.classes.HIDE, item.$el)
      data.push(item.data)
    })

    if (!this.DROPDOWN) {
      this.$more = appendTo(
        templateEngine.render(this.options.templates.more.call(this), {
          classes: this.classes,
          text: this.options.responsiveMoreText
        }),
        this.element
      )

      this.DROPDOWN = Dropdown.of(this.$more, {
        data,
        itemValueAttr: 'data-index',
        placement: 'bottom-end',
        target: false,
        classes: {
          DROPDOWN: `${this.classes.DROPDOWN} {namespace}`
        },
        templates: {
          item() {
            return '<div class="{classes.ITEM}" {itemValueAttr}="{item.index}">{item.label}</div>'
          }
        },
        onSelect: el => {
          const index = getData('index', el)
          this.setActiveItem(this.$filters[index])
        }
      })
    } else {
      children(this.DROPDOWN.$dropdown).map(item => item.remove())
      this.DROPDOWN.appendItems(data)
    }

    this.setDropdownActive()
    this.trigger(EVENTS.RESPONSIVED)
  }

  getFiltersWidth() {
    let count = 0
    this.$filters.forEach(item => {
      count += this.getOuterWidth(item)
    })

    return count
  }

  getWidth() {
    return parseFloat(getStyle('width', this.element), 10)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    Pj.emitter.off(this.eventNameWithId('resize'))
  }

  setActiveItem($item) {
    if ($item && !$item.matches(`.${this.classes.ACTIVE}`)) {
      this.active = this.$filters.indexOf($item)

      if (this.DROPDOWN) {
        this.setDropdownActive()
      }

      this.$filters.map(removeClass(this.classes.ACTIVE))
      addClass(this.classes.ACTIVE, $item)

      this.trigger(EVENTS.CHANGE, this.getItemValue($item))
    }
  }

  setDropdownActive() {
    const $dropdownItems = children(this.DROPDOWN.$dropdown)

    removeClass(this.classes.ACTIVE, this.$more)
    $dropdownItems.forEach($el => {
      removeClass(this.classes.ACTIVE, $el)
      removeClass('pj-dropdown-active', $el)
      if (getData('index', $el) === this.active) {
        addClass(this.classes.ACTIVE, $el)
        addClass(this.classes.ACTIVE, this.$more)
      }
    })
  }

  setActiveItemByValue(value) {
    let $item
    if (this.options.valueFrom === 'text') {
      this.$filters.forEach(el => {
        if (value === el.innerHTML.trim()) {
          $item = el
        }
      })
    } else {
      $item = this.$filters.filter(el =>
        el.matches(`[${this.options.valueFrom}="${value}"]`)
      )
    }

    $item.map(this.setActiveItem.bind(this))
  }

  set(value) {
    return this.setActiveItemByValue(value)
  }

  getItemValue($item) {
    if (this.options.valueFrom === 'text') {
      return $item.textContent
    }

    if (isArray(this.options.valueFrom)) {
      return query(this.options.valueFrom[0], $item).getAttribute(
        this.options.valueFrom[1]
      )
    }

    return $item.getAttribute(this.options.valueFrom)
  }

  getActiveItem() {
    return this.$filters.filter(el => el.matches(`.${this.classes.ACTIVE}`))
  }

  getActiveItemValue() {
    const $item = this.getActiveItem()

    if ($item.length > 0) {
      return $item.map(this.getItemValue.bind(this))
    }
    return null
  }

  get() {
    return this.getActiveItemValue()
  }

  enable() {
    if (this.is('disabled')) {
      this.$filters.map(removeClass(this.classes.DISABLED)).forEach(el => {
        el.disabled = false
      })
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.$filters.map(addClass(this.classes.DISABLED)).forEach(el => {
        el.disabled = true
      })
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.$filters.map(removeClass(this.classes.DISABLED)).forEach(el => {
        el.disabled = false
      })

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Filters
