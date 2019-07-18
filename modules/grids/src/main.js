import Component from '@pluginjs/component'
import { addClass, removeClass, toggleClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  append,
  find,
  queryAll,
  // parent,
  // closest,
  children,
  getData
} from '@pluginjs/dom'

import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'

// import ImageLoader from '@pluginjs/image-loader'
// import Loader from '@pluginjs/loader'

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

// import models
import Grid from './models/grid'
import Masonry from './models/masonry'
import Justified from './models/justified'
import Nested from './models/nested'

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

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.initGlobalArgs()

    this.initToolbar()

    // if (this.options.imgSelector) {
    //   this.imgs = queryAll(this.options.imgSelector, this.$inner)
    //   this.loading(this.chunks)
    //   if (this.imgs && this.imgs.length > 0) {
    //     this.imgs.forEach(img => {
    //       let loader = ''

    //       if (this.options.loader) {
    //         loader = Loader.of(parent(img), this.options.loader)
    //         loader.show()
    //       }

    //       ImageLoader.of(img).on('loaded', img => {
    //         if (this.options.loader) {
    //           loader.hide()
    //         }
    //         addClass(
    //           this.classes.LOADED,
    //           closest(`.${this.classes.CHUNK}`, img)
    //         )
    //       })
    //     })
    //   }
    // } else {

    // }
    this.loading(this.chunks)

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initGlobalArgs() {
    this.$items = this.options.itemSelector
      ? queryAll(this.options.itemSelector, this.element)
      : children(this.element)

    append(`<div class="${this.classes.INNER}"></div>`, this.element)
    this.$inner = find(`.${this.classes.INNER}`, this.element)

    this.$items.forEach($item => {
      append($item, this.$inner)
    })

    this.minWidth = this.options.minWidth
    this.minHeight = this.options.minHeight
    this.gutter = this.options.gutter
    this.width = this.getWidth()
    this.tags = this.getTags()
    this.filters = this.options.filters
    this.sortby = this.options.sortby

    this.defaultChunks = this.createChunks(this.$items)

    /* 处理chunks --> 根据filters过滤， 根据sortby重排 */
    this.handleChunks()

    /* 初始化正常的模块 */
    this.model = this.initModel(this.options.model)

    /* 初始化animate，chunks发生filter，loading时使用 */
    this.ANIMATE = new Animate(this)
  }

  createChunks(items) {
    const chunks = []
    items.forEach((item, index) => {
      const config = {
        index,
        aspectRatio: this.options.aspectRatio
      }

      chunks.push(new Item(this, item, config))
    })

    return chunks
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

  _sort(sortby = this.options.sortby, chunks = this.chunks) {
    this.sortby = sortby

    return this.options.sort.bind(this)(sortby, chunks)
  }

  initToolbar() {
    const { filters, sort } = this.options.toolbar
    if (!filters && !sort) {
      return
    }

    this.TOOLBAR = new Toolbar(this, this.options.toolbar)
  }

  getTags() {
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

    return Array.from(new Set(tags))
  }

  getSortData() {
    const sortData = []

    this.$items.forEach(el => {
      sortData.push(getData('sort', el))
    })

    return sortData
  }

  sort(sortby) {
    this.handleChunks(this.filters, sortby)

    this.model.handleState()

    this.chunks.forEach(chunk => {
      chunk.moveTo(chunk.movePosition)
    })

    this.trigger(EVENTS.SORT)
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

  initModel(model) {
    if (model === 'grid') {
      return new Grid(this)
    }

    if (model === 'masonry') {
      return new Masonry(this)
    }

    if (model === 'justified') {
      return new Justified(this)
    }

    if (model === 'nested') {
      return new Nested(this)
    }

    return null
  }

  resize() {
    this.width = this.getWidth()
    this.trigger(EVENTS.RESIZE, this.width)
  }

  bind() {
    bindEvent(this.eventName('click'), `.${this.classes.CHUNK}`, e => {
      this.trigger(EVENTS.CHUNKCLICK, e.currentTarget)
    })
  }

  unbind() {
    removeEvent(this.eventName(), window)
  }

  loading(chunks) {
    addClass(this.classes.INNERSHOW, this.$inner)

    this.ANIMATE.loading(chunks, () => {
      this.enter('loaded')
      this.setHeight(this.model.height)
    })
  }

  /*
    render items instance
  */
  render() {
    this.model.render(this.chunks, this.chunksArr)
  }

  setHeight(height) {
    setStyle(
      {
        height,
        transition: `height ${parseFloat(this.options.duration, 10)}ms`
      },
      this.$inner
    )
  }

  setContainerWidth(width) {
    setStyle('width', width, this.$container)

    this.containerWidth = parseFloat(getStyle('width', this.$container), 10)
  }

  getWidth() {
    return parseFloat(getStyle('width', this.element), 10)
  }

  reverse() {
    this.chunks.reverse()
    this.model.handleState()

    this.chunks.forEach(chunk => {
      chunk.moveTo(chunk.movePosition)
    })

    toggleClass(this.classes.REVERSEMIN, this.TOOLBAR.$reverse)
    this.trigger(EVENTS.REVERSE)
  }

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

  setOptions(attr, value) {
    if (this.options[attr] === value) {
      return
    }

    this.options[attr] = value

    this.destroy()
    this.initialize()
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
