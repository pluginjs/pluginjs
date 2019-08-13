import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass, toggleClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { isArray } from '@pluginjs/is'
import { append, find, query, queryAll, children, getData } from '@pluginjs/dom'

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

// import models
import Grid from './models/grid'
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

    this.loading(this.chunks)

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initGlobalArgs() {
    this.initInner()

    this.$items = this.options.itemSelector
      ? queryAll(this.options.itemSelector, this.element)
      : children(this.$inner)

    this.minWidth = this.options.minWidth
    this.minHeight = this.options.minHeight
    this.gutter = this.options.gutter
    this.width = this.getWidth()
    this.tags = this.getTags()
    this.filters = this.options.filters
    this.sortby = this.options.sortby

    this.defaultChunks = this.createChunks(this.$items)

    this.handleChunks()

    this.model = this.initModel(this.options.model)

    this.ANIMATE = new Animate(this)
  }

  initInner() {
    this.$inner = this.options.innerSelector
      ? query(this.options.innerSelector, this.element)
      : null

    if (!this.$inner) {
      const items = children(this.element)
      append(`<div class="${this.classes.INNER}"></div>`, this.element)
      this.$inner = find(`.${this.classes.INNER}`, this.element)
      items.forEach(item => {
        append(item, this.$inner)
      })
    } else {
      addClass(this.classes.INNER, this.$inner)
    }
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
      if (chunk.tags.includes(tags[0])) {
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
        const tag =
          data.options && data.options.tags
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

  loading(chunks, update = false) {
    this.ANIMATE.loading(
      chunks,
      () => {
        this.setHeight(this.model.height)
        this.enter('loaded')
      },
      update
    )
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
      append(addItem, this.$inner)
      this.$items.push(addItem)
      this.addChunks.push(
        new Item(
          this,
          addItem,
          Object.assign({}, chunkOptions[index], {
            index: oldItemsLength + index,
            aspectRatio:
              chunkOptions[index].aspectRatio || this.options.aspectRatio
          })
        )
      )
    })

    this.tags = this.getTags(datas)

    this.filters = this.options.filters
    this.sortby = this.options.sortby

    this.defaultChunks = this.defaultChunks.concat(this.addChunks)

    this.handleChunks()

    this.model.handleState()

    this.model.height = this.model.getHeight()

    if (this.TOOLBAR) {
      this.TOOLBAR.init(true)
    }

    this.loading(this.chunks, true)
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
