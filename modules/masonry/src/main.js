import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { queryAll, append, children, getData } from '@pluginjs/dom'
import { isArray } from '@pluginjs/is'
import { setStyle, getStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, toggleClass } from '@pluginjs/classes'
import { debounce } from '@pluginjs/utils'

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
import Animate from './components/animate'
import Toolbar from './components/toolbar'

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

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.initGlobalArgs()

    this.initToolbar()

    this.loading(this.chunks)

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initGlobalArgs() {
    this.$items = this.options.itemSelector
      ? queryAll(this.options.itemSelector, this.element)
      : children(this.element)

    this.minWidth = this.options.minWidth
    this.gutter = this.options.gutter
    this.width = this.getWidth()
    this.tags = this.getTags()
    this.filters = this.options.filters
    this.sortby = this.options.sortby

    this.defaultChunks = this.createChunks(this.$items)

    this.handleChunks()

    this.handleState()

    this.height = this.getHeight()

    this.ANIMATE = new Animate(this)
  }

  handleChunks(filters = this.filters, sortby = this.sortby) {
    this.filteredChunks = this._filter(filters, this.defaultChunks)

    this.chunks = this._sort(sortby, this.filteredChunks)
  }

  _filter(tags, chunks = this.defaultChunks) {
    if (!tags || !Array.isArray(tags) || tags.length <= 0) {
      return chunks
    }

    const chunkList = [].concat(chunks)
    const tempArr = []

    chunkList.forEach(chunk => {
      const chunkTagsSize = chunk.tags ? chunk.tags.length : 0
      const filterSize = tags.length

      const arr = new Set(tags.concat(chunk.tags))

      if (arr.size < chunkTagsSize + filterSize) {
        tempArr.push(chunk)
      }
    })

    return tempArr
  }

  filter(filters = this.filters) {
    if (filters.toString() === this.filters.toString()) {
      return
    }

    this.filters = filters

    const oldChunks = this.chunks
    this.handleChunks(filters, this.sortby)

    let hideChunks = []
    let moveChunks = []
    let showChunks = []

    moveChunks = this.intersectArr(oldChunks, this.chunks)

    if (moveChunks.length <= 0) {
      hideChunks = oldChunks
      showChunks = this.chunks
    } else {
      showChunks = this.disjoint(this.chunks, moveChunks)
      hideChunks = this.disjoint(oldChunks, moveChunks)
    }

    this.trigger(EVENTS.FILTER, {
      hideChunks,
      showChunks,
      moveChunks
    })
  }

  _sort(sortby = this.options.sortby, chunks = this.chunks) {
    this.sortby = sortby

    return this.options.sort.bind(this)(sortby, chunks)
  }

  sort(sortby) {
    this.handleChunks(this.filters, sortby)

    this.handleState()

    this.chunks.forEach(chunk => {
      chunk.moveTo(chunk.movePosition)
    })

    this.trigger(EVENTS.SORT)
  }

  intersectArr(oldArr, newArr) {
    const arr = []

    oldArr.forEach(item => {
      let inside = false

      newArr.forEach(newItem => {
        if (item.index === newItem.index) {
          inside = true
        }
      })

      if (inside) {
        arr.push(item)
      }
    })

    return arr
  }

  disjoint(originArr, intersectArr) {
    const tempArr = [].concat(originArr)

    intersectArr.forEach(item => {
      tempArr.forEach((tempItem, index) => {
        if (item.index === tempItem.index) {
          tempArr.splice(index, 1)

          return
        }
      })
    })

    return tempArr
  }

  handleState() {
    this.columnCount = this.getColumnCount()
    this.columnHeights = this.initColumnHeights()

    this.chunks.forEach(chunk => {
      const width = this.getChunkWidth()

      const size = {
        width
      }

      chunk.setSize(size)
    })

    this.update()
  }

  initColumnHeights() {
    // support IE11
    if (!Array.prototype.fill) {
      const arr = []

      for (let i = 0; i < this.columnCount; i++) {
        arr.push(i)
      }

      return arr
    }

    return new Array(this.columnCount).fill(0)
  }

  update() {
    const gutter = parseFloat(this.gutter, 10)

    this.chunks.forEach(chunk => {
      const minCol = this.getMinHeightColumn()

      const position = {
        x: 0,
        y: 0
      }

      position.x = (chunk.info.width + gutter) * minCol
      position.y = this.columnHeights[minCol]

      this.columnHeights[minCol] += Math.round(chunk.info.height + gutter)

      if (this.options.direction.indexOf('Right') >= 0) {
        position.x = this.width - chunk.info.width - position.x
      }

      chunk.movePosition = position
    })

    if (this.options.direction.indexOf('bottom') >= 0) {
      const maxHeight = Math.max(...this.columnHeights)

      this.chunks.forEach(chunk => {
        chunk.movePosition.y =
          maxHeight - (chunk.movePosition.y + chunk.info.height)
      })
    }
  }

  render() {
    this.chunks.forEach(chunk => {
      // set item size.
      chunk.info = Object.assign({}, chunk.info, chunk.movePosition)

      if (this.options.delay) {
        setTimeout(() => {
          chunk.moveTo(chunk.movePosition)
        }, chunk.index * this.options.delay)
      } else {
        chunk.moveTo(chunk.movePosition)
      }
    })

    this.setHeight(this.getHeight())
  }

  initToolbar() {
    const { filters, sort } = this.options.toolbar
    if (!filters && !sort) {
      return
    }

    this.TOOLBAR = new Toolbar(this, this.options.toolbar)
  }

  getChunkWidth() {
    const gutter = parseFloat(this.options.gutter, 10)

    return `calc((100% - ${(this.columnCount - 1) * gutter}px) / ${
      this.columnCount
    })`
  }

  getHeight() {
    return Math.max(...this.columnHeights)
  }

  getColumnCount() {
    const gutter = parseFloat(this.gutter, 10)
    const minWidth = parseFloat(this.minWidth, 10)
    const maxColumn = parseFloat(this.options.maxColumn, 10)

    let columnCount = Math.floor((this.width - gutter) / (minWidth + gutter))

    if (this.options.maxColumn) {
      columnCount = columnCount > maxColumn ? maxColumn : columnCount
    }

    return columnCount
  }

  getMinHeightColumn() {
    let index = 0
    let value = this.columnHeights[0]

    this.columnHeights.forEach((val, i) => {
      if (val < value) {
        index = i
        value = val
      }
    })

    return index
  }

  createChunks(items) {
    const chunks = []
    items.forEach((item, index) => {
      chunks.push(
        new Item(this, item, {
          index
        })
      )
    })

    return chunks
  }

  getWidth() {
    return parseFloat(getStyle('width', this.element), 10)
  }

  reverse() {
    this.chunks.reverse()
    this.handleState()

    this.chunks.forEach(chunk => {
      chunk.moveTo(chunk.movePosition)
    })

    toggleClass(this.classes.REVERSEMIN, this.TOOLBAR.$reverse)
    this.trigger(EVENTS.REVERSE)
  }

  customResize() {
    this.width = this.getWidth()
    this.trigger(EVENTS.RESIZE, this.width)
  }

  bind() {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.customResize()
      }, 150)
    )

    bindEvent(
      `${this.namespace}:${this.events.RESIZE}`,
      (e, instance, data) => {
        if (data < this.minWidth) {
          return
        }
        this.handleState()
        this.render()
      },
      this.element
    )

    bindEvent(
      `${this.namespace}:${this.events.FILTER}`,
      (e, instance, data) => {
        const { showChunks, hideChunks, moveChunks } = data

        this.handleState()

        if (hideChunks) {
          hideChunks.forEach(chunk => {
            chunk.hide()
          })
        }

        if (showChunks) {
          showChunks.forEach(chunk => {
            chunk.show()
          })
        }

        if (moveChunks) {
          moveChunks.forEach(chunk => {
            chunk.moveTo(chunk.movePosition)
          })
        }

        this.setHeight(this.getHeight())
      },
      this.element
    )

    bindEvent(
      `${this.namespace}:${this.events.SORT}`,
      () => {
        this.setHeight(this.getHeight())
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  loading(chunks) {
    this.ANIMATE.loading(chunks, () => {
      this.setHeight(this.height)
      this.enter('loaded')
    })
  }

  setHeight(height) {
    setStyle(
      {
        height,
        transition: `height ${parseFloat(this.options.duration, 10)}ms`
      },
      this.element
    )
  }

  getTags(datas) {
    let tags = []
    this.$items.forEach(el => {
      const tag = this.options.parseTagsStr(getData('tags', el))
      if (tag) {
        tag.forEach((item, index) => {
          tag[index] = item.trim()
        })

        tags = tags.concat(tag)
      }
    })

    if (datas) {
      datas.forEach(data => {
        const tag = data.options.tags
          ? this.options.parseTagsStr(data.options.tags)
          : null

        if (tag) {
          tag.forEach((item, index) => {
            tag[index] = item.trim()
          })

          tags = tags.concat(tag)
        }
      })
    }

    return Array.from(new Set(tags))
  }

  getSortData() {
    const sortData = []

    this.$items.forEach(el => {
      sortData.push(getData('sort', el))
    })

    return sortData
  }

  add(datas) {
    if (!isArray(datas) || datas.length <= 0) {
      return
    }

    let addItems = ''
    const chunkOptions = []

    const tempWrap = document.createElement('div')

    datas.forEach(data => {
      const html = data.html ? data.html : ''
      const customClass = data.class ? data.class : ''
      const chunkOption = data.options ? data.options : {}
      const chunk = templateEngine.render(
        this.options.templates.chunk.call(this),
        {
          classes: this.classes,
          html,
          class: customClass
        }
      )

      addItems += chunk
      chunkOptions.push(chunkOption)
    })

    append(addItems, tempWrap)

    this.addItems = queryAll(`.${this.classes.CHUNK}`, tempWrap)

    this.addChunks = []

    const oldItemsLength = this.$items.length

    this.addItems.forEach((addItem, index) => {
      append(addItem, this.element)
      this.$items.push(addItem)
      this.addChunks.push(
        new Item(
          this,
          addItem,
          Object.assign({}, chunkOptions[index], {
            index: oldItemsLength + index
          })
        )
      )
    })

    this.tags = this.getTags(datas)

    this.filters = this.options.filters
    this.sortby = this.options.sortby

    this.defaultChunks = this.defaultChunks.concat(this.addChunks)

    this.handleChunks()

    this.handleState()

    this.height = this.getHeight()

    if (this.TOOLBAR) {
      this.TOOLBAR.init(true)
    }

    this.loading(this.addChunks)
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
