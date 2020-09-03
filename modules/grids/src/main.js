import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import { removeEvent } from '@pluginjs/events'
import { isPlainObject } from '@pluginjs/is'
import { queryAll, children } from '@pluginjs/dom'
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
import Breakpoints from '@pluginjs/breakpoints'
// import components
import Item from './components/item'
// import models
import Grid from './models/grid'
import Justified from './models/justified'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Grids extends Component {
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

    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.initState()

    this.$items = this.options.itemSelector
      ? queryAll(this.options.itemSelector, this.element)
      : children(this.element)
    this.chunks = this.createChunks(this.$items)
    this.width = this.getWidth()
    this.model = this.initModel(this.options.model)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initState() {
    Breakpoints.init()
    this.updateBreakpoint()
    this.ratio = this.options.aspectRatio
  }

  updateBreakpoint() {
    if (Breakpoints.is('lg+')) {
      if (isPlainObject(this.options.column)) {
        this.column =
          this.options.column.desktop > 0 ? this.options.column.desktop : 3
      } else {
        this.column = this.options.column || 3
      }
      if (isPlainObject(this.options.gutter)) {
        this.gutter = this.options.gutter.desktop || 0
      } else {
        this.gutter = this.options.gutter || 0
      }
      if (isPlainObject(this.options.rowHeight)) {
        this.rowHeight = this.options.rowHeight.desktop || 200
      } else {
        this.rowHeight = this.options.rowHeight || 200
      }
    }

    if (Breakpoints.is('md')) {
      if (isPlainObject(this.options.column)) {
        this.column =
          this.options.column.tablet > 0 ? this.options.column.tablet : 2
      } else {
        this.column = this.options.column || 2
      }
      if (isPlainObject(this.options.gutter)) {
        this.gutter = this.options.gutter.tablet || 0
      } else {
        this.gutter = this.options.gutter || 0
      }
      if (isPlainObject(this.options.rowHeight)) {
        this.rowHeight = this.options.rowHeight.desktop || 200
      } else {
        this.rowHeight = this.options.rowHeight || 200
      }
    }

    if (Breakpoints.is('sm-')) {
      if (isPlainObject(this.options.column)) {
        this.column =
          this.options.column.mobile > 0 ? this.options.column.mobile : 1
      } else {
        this.column = this.options.column || 1
      }
      if (isPlainObject(this.options.gutter)) {
        this.gutter = this.options.gutter.mobile || 0
      } else {
        this.gutter = this.options.gutter || 0
      }
      if (isPlainObject(this.options.rowHeight)) {
        this.rowHeight = this.options.rowHeight.mobile || 200
      } else {
        this.rowHeight = this.options.rowHeight || 200
      }
    }
  }

  createChunks($items) {
    const chunks = []
    const length = $items.length
    $items.forEach((item, index) => {
      chunks.push(
        new Item(this, item, {
          index,
          length,
          ratio: this.ratio
        })
      )
    })
    return chunks
  }

  initModel(model) {
    if (model === 'grid') {
      return new Grid(this)
    }

    if (model === 'justified') {
      return new Justified(this)
    }

    return null
  }

  resizeDebounce() {
    this.updateBreakpoint()
    this.width = this.getWidth()
    this.model.resize()
    this.trigger(EVENTS.RESIZE, this.width)
  }

  unbind() {
    removeEvent(this.eventName(), window)
  }

  setHeight(height) {
    setStyle(
      {
        height
      },
      this.element
    )
  }

  getWidth() {
    return parseFloat(getStyle('width', this.element), 10)
  }

  // reverse() {
  //   this.chunks.reverse()

  //   this.model.handleState()

  //   this.chunks.forEach(chunk => {
  //     chunk.moveTo(chunk.movePosition)
  //   })

  //   toggleClass(this.classes.REVERSEMIN, this.TOOLBAR.$reverse)
  //   this.trigger(EVENTS.REVERSE)
  // }

  // add(datas) {
  //   if (!isArray(datas) || datas.length <= 0) {
  //     return
  //   }

  //   let addItems = ''
  //   const chunkOptions = []
  //   const tempWrap = document.createElement('div')

  //   datas.forEach(data => {
  //     const html = data.html ? data.html : ''
  //     const customClass = data.class ? data.class : ''
  //     const chunkOption = data.options ? data.options : {}
  //     const chunk = templateEngine.render(
  //       this.options.templates.chunk.call(this),
  //       {
  //         classes: this.classes,
  //         html,
  //         class: customClass
  //       }
  //     )

  //     addItems += chunk
  //     chunkOptions.push(chunkOption)
  //   })

  //   append(addItems, tempWrap)

  //   this.addItems = queryAll(`.${this.classes.CHUNK}`, tempWrap)

  //   this.addChunks = []

  //   const oldItemsLength = this.$items.length

  //   this.addItems.forEach((addItem, index) => {
  //     append(addItem, this.$inner)
  //     this.$items.push(addItem)
  //     this.addChunks.push(
  //       new Item(
  //         this,
  //         addItem,
  //         Object.assign({}, chunkOptions[index], {
  //           index: oldItemsLength + index,
  //           aspectRatio:
  //             chunkOptions[index].aspectRatio || this.options.aspectRatio
  //         })
  //       )
  //     )
  //   })

  //   this.tags = this.getTags(datas)

  //   this.filters = this.options.filters
  //   this.sortby = this.options.sortby

  //   this.defaultChunks = this.defaultChunks.concat(this.addChunks)

  //   this.handleChunks()

  //   this.model.handleState()

  //   this.model.height = this.model.getHeight()

  //   this.loading(this.chunks, true)
  // }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  getModel() {
    return this.model
  }

  getChunks() {
    return this.chunks
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
      this.model = null

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      this.leave('initialized')
      this.leave('loaded')
    }

    this.trigger(EVENTS.DESTROY)
  }
}

export default Grids
