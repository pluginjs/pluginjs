import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import is from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { outerWidth, outerWidthWithMargin, clientWidth } from '@pluginjs/styled'
import { parseHTML, children, query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'
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
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.itemSelector = `.${this.classes.ITEM}`
    this.$activeItem = null

    this.initStates()
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
    return children(this.element).filter(el => el.matches(this.itemSelector))
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
        width: outerWidthWithMargin($item),
        data: {
          label: $item.innerHTML,
          index
        }
      })
    })

    return itemArr
  }

  getItemsHtml(items) {
    let html = ''

    if (is.array(items)) {
      const template = templateEngine.compile(
        this.options.template.item.call(this, this.classes.ITEM)
      )
      items.forEach(item => {
        html += template(item)
      })
    }

    return html
  }

  bind() {
    bindEvent(
      {
        type: this.eventName('click touch'),
        identity: { type: 'selector', value: this.itemSelector },
        handler: ({ target }) => {
          if (!this.is('disabled')) {
            this.setActiveItem(target)
          }
        }
      },
      this.element
    )

    if (this.options.responsive) {
      window.onresize = () => {
        clearTimeout(this.goResponsive)

        this.goResponsive = setTimeout(() => {
          this.responsive()
        }, 100)
      }
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

      if (tempWidth > this.getWidth()) {
        nodeIndex = index - 1
        break
      }
    }

    if (!nodeIndex) {
      if (this.DROPDOWN) {
        this.$dropdown.remove()
        this.DROPDOWN.POPPER.destroy()
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
      this.element.append(
        parseHTML(`<div class="${this.classes.DROPDOWN}">More</div>`)
      )
      this.$dropdown = query(`.${this.classes.DROPDOWN}`, this.element)
      this.DROPDOWN = Dropdown.of(this.$dropdown, {
        data,
        itemValueAttr: 'index',
        width: this.options.dropdownWidth,
        imitateSelect: false,
        onClick: el => {
          const index = el.dataset.index
          this.setActiveItem(this.$filters[index])
        }
      })

      this.DROPDOWN.POPPER.options.removeOnDestroy = true
    } else {
      this.DROPDOWN.replaceByData(data)
    }

    this.setDropdownActive()
    this.trigger(EVENTS.RESPONSIVED)
  }

  getFiltersWidth() {
    let count = 0
    this.$filters.forEach(item => {
      count += outerWidth(item)
    })

    return count
  }

  getWidth() {
    return clientWidth(this.element)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
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
    const $dropdownItems = this.DROPDOWN.items
    $dropdownItems.map(removeClass(this.classes.ACTIVE))
    $dropdownItems.forEach($el => {
      if ($el.dataset.index === this.active) {
        addClass(this.classes.ACTIVE, $el)
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

    if (is.array(this.options.valueFrom)) {
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
