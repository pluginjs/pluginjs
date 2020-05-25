import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
import { docReady, queryAll, children, query } from '@pluginjs/dom'
import { outerWidth, setStyle, getStyle } from '@pluginjs/styled'

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

// import components
import Item from './components/item'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Masonry extends Component {
  constructor(element, options = {}) {
    super(element)

    this.events = EVENTS
    this.namespace = NAMESPACE
    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.NAMESPACE, this.element)
    setStyle(
      {
        position: 'relative'
      },
      this.element
    )

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.gutter = this.options.gutter

    this.$items = this.options.itemSelector
      ? queryAll(this.options.itemSelector, this.element)
      : children(this.element)
    this.$base =
      this.options.colWidth === 'base'
        ? query(this.options.baseClass, this.element) || this.$items[0]
        : this.$items[0]

    docReady(() => {
      this.chunks = this.createChunks(this.$items)

      this.render(true)

      this.enter('initialized')
      this.trigger(EVENTS.READY)
    })
  }

  createChunks($items) {
    const chunks = []
    const length = $items.length
    $items.forEach((item, index) => {
      chunks.push(
        new Item(this, item, {
          index,
          length
        })
      )
    })
    return chunks
  }

  render(intact = false) {
    this.width = this.getWidth()
    this.colWidth = this.getColWidth()
    this.colsNum = this.getcolsNum()

    this.initPosition(intact)
  }

  initPosition(intact = false) {
    this.cols = []

    for (let i = 0; i < this.colsNum; i++) {
      this.cols.push(0)
    }

    this.setPosition(this.chunks, intact)
  }

  setPosition(chunks, intact = false) {
    chunks.forEach(chunk => {
      chunk.render(intact)
    })

    this.setHeight()
  }

  setHeight() {
    setStyle(
      {
        height: `${this.getHeight()}px`
      },
      this.element
    )
  }

  add($items) {
    if (!$items) {
      return
    }

    if (!Array.isArray($items)) {
      $items = [$items]
    }

    const chunks = this.createChunks($items)

    this.$items = this.$items.concat($items)
    this.chunks = this.chunks.concat(chunks)
    this.setPosition(chunks, true)

    this.trigger(EVENTS.ADD)
  }

  reverse() {
    this.chunks.reverse()

    this.colWidth = this.getColWidth()
    this.colsNum = this.getcolsNum()

    this.cols = []

    for (let i = 0; i < this.colsNum; i++) {
      this.cols.push(0)
    }

    this.setPosition(this.chunks, true)

    this.trigger(EVENTS.REVERSE)
  }

  getWidth() {
    let width = outerWidth(false, this.element, true)
    let { marginLeft, marginRight } = getStyle(
      ['marginLeft', 'marginRight'],
      this.element
    )

    marginLeft = parseFloat(marginLeft, 10)
    marginRight = parseFloat(marginRight, 10)

    if (marginLeft < 0) {
      width += -marginLeft
    }
    if (marginRight < 0) {
      width += -marginRight
    }

    width += this.options.gutter

    return width
  }

  getHeight() {
    return Math.max.apply(null, this.cols)
  }

  getColWidth() {
    const colWidth =
      this.options.colWidth && this.options.colWidth !== 'base'
        ? this.options.colWidth
        : outerWidth(true, this.$base, true)
    return colWidth + this.options.gutter
  }

  getcolsNum() {
    const diff = this.colWidth - (this.width % this.colWidth)
    const columns = Math[diff < 1 ? 'round' : 'floor'](
      this.width / this.colWidth
    )

    return Math.max(columns, 1)
  }

  resizeDebounce() {
    this.render()

    this.trigger(EVENTS.RESIZE)
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

export default Masonry
