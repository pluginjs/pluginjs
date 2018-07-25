import Component from '@pluginjs/component'

import { addClass, removeClass, toggleClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'

import { append, prepend, find, finds, parent, children } from '@pluginjs/dom'

import Pj from '@pluginjs/pluginjs'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'

import templateEngine from '@pluginjs/template'
import ImageLoader from '@pluginjs/image-loader'

import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

// import components
import Item from './components/item'
import Animate from './components/animate'
import Filterbar from './components/filterbar'

// import models
import Grid from './models/grid'
import Masonry from './models/masonry'
import Justified from './models/justified'
import Nested from './models/nested'

// import carsouel
import Carousel from './models/carousel'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(true)
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  },
  INFO
)
class Grids extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.namespace = NAMESPACE
    this.events = EVENTS
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    // Init
    this.initStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.WRAP, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    /* 初始化全局变量 */
    this.initGlobalArgs()
    /* 初始化过滤器filter bar */
    this.initFilterbar()

    // handle image loading
    /* 如果有imgSelector属性的话，初始化image-loader插件，当img全部加载后loading */
    if (this.options.imgSelector) {
      this.imgs = finds(this.options.imgSelector, this.$container)
      if (this.imgs && this.imgs.length > 0) {
        addClass(this.classes.LOADERSHOW, this.$loader)
        const imageLoaderApi = ImageLoader.of(this.$container, {
          selector: this.options.imgSelector
        })

        imageLoaderApi.load()
        imageLoaderApi.isDone(() => {
          this.loading(this.chunks)
          // remove($loader)
          removeClass(this.classes.LOADERSHOW, this.$loader)
        })
      }
    } else {
      this.loading(this.chunks)
    }

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initGlobalArgs() {
    // set $element
    if (this.options.wrapSelector) {
      this.element = find(this.options.wrapSelector, this.element)
    }

    this.minHeight = this.options.minHeight
    this.minWidth = this.options.minWidth

    // get $items, if not set item selector, get element's children
    this.$items = this.options.itemSelector
      ? finds(this.options.itemSelector, this.element)
      : children(this.element)

    const $itemsParent = parent(this.$items[0])

    // append loader element
    /* 如果有imgSelector 插入loader元素 */
    if (this.options.imgSelector) {
      prepend(`<div class=${this.classes.LOADER}></div>`, this.element)
      this.$loader = find(`.${this.classes.LOADER}`, this.element)
      const $loaderInner = templateEngine.compile(
        this.options.templates.loader()
      )({
        class: this.classes
      })
      append($loaderInner, this.$loader)
    }

    /* 如果html结构里，element子元素没有inner元素，生成新的inner并插入 */
    /* 初始化html结构里加入inner元素，解决item有图片的情况下的闪屏 */
    if ($itemsParent.getAttribute('class').indexOf(this.classes.INNER) >= 0) {
      this.$inner = $itemsParent
    } else {
      append(`<div class="${this.classes.INNER}"></div>`, $itemsParent)
      this.$inner = find(`.${this.classes.INNER}`, $itemsParent)
    }

    append(`<div class="${this.classes.CONTAINER}"></div>`, this.$inner)
    this.$container = find(`.${this.classes.CONTAINER}`, this.$inner)

    this.$items.forEach($item => {
      append($item, this.$container)
    })

    // get gutter width
    this.gutter = this.options.gutter
    // get wrap width
    this.width = this.getWidth()
    // get tags, get filters
    this.tags = this.getTags()
    // get filters
    this.filters = this.options.filters
    // get sortby
    this.sortby = this.options.sortby

    // defalut chunks
    /* 通过new Item生成初始的chunk实例数组 */
    this.defaultChunks = this.createChunks(this.$items)

    // handle chunks
    /* 处理chunks --> 根据filters过滤， 根据sortby重排 */
    this.handleChunks()

    /* 如果设置了carousel 初始化carousel， 否则初始化正常的模块 */
    if (this.options.carousel) {
      this.initCarousel()
    } else {
      this.model = this.initModel(this.options.model)
    }

    // init Animate
    /* 初始化animate，chunks发生filter，loading时使用 */
    this.ANIMATE = new Animate(this)
  }

  initFilterbar() {
    const { filters, sort } = this.options.filterbar
    if (!filters && !sort) {
      return
    }

    this.FILTERBAR = new Filterbar(this, this.options.filterbar)
  }

  initCarousel() {
    this.CAROUSEL = new Carousel(
      this,
      this.options.carousel,
      this.options.model
    )
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
    // filtered chunks
    this.filteredChunks = this._filter(filters, this.defaultChunks)

    // sort and get final chunks
    this.chunks = this._sort(sortby, this.filteredChunks)
  }

  getTags() {
    let tags = []
    this.$items.forEach(el => {
      const tag = this.options.parseTagsStr(el.dataset.tags)

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
      sortData.push(el.dataset.sort)
    })

    return sortData
  }

  _sort(sortby = this.options.sortby, chunks = this.chunks) {
    this.sortby = sortby

    return this.options.sort.bind(this)(sortby, chunks)
  }

  sort(sortby) {
    this.handleChunks(this.filters, sortby)

    if (!this.options.carousel) {
      this.model.handleState()
    } else {
      this.CAROUSEL.computeItemLocation(this.CAROUSEL.swipe)
    }

    this.chunks.forEach(chunk => {
      chunk.moveTo(chunk.movePosition)
    })

    this.trigger(EVENTS.SORT)
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

    // take move chunks
    moveChunks = this.intersectArr(oldChunks, this.chunks)

    if (moveChunks.length <= 0) {
      hideChunks = oldChunks
      showChunks = this.chunks
    } else {
      // take show chunks
      showChunks = this.disjoint(this.chunks, moveChunks)

      // take remove chunks
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

  bind() {
    /* lazy resize */
    Pj.emitter.on('resize', () => {
      this.width = this.getWidth()
      this.trigger(this.events.RESIZED, this.width)
    })

    bindEvent({
      type: this.eventName('click'),
      identity: `.${this.classes.CHUNK}`,
      handler: e => {
        this.trigger(EVENTS.CHUNKCLICK, e.currentTarget)
      }
    })
  }

  unbind() {
    removeEvent(this.eventName(), window)
  }

  loading(chunks) {
    addClass(this.classes.INNERSHOW, this.$inner)

    this.ANIMATE.loading(chunks, () => {
      this.enter('loaded')
      if (!this.options.carousel) {
        this.setHeight(this.model.height)
      }
    })
  }

  /*
    render items instance
  */
  render() {
    this.model.render(this.chunks, this.chunksArr)
  }

  setHeight(val) {
    setStyle(
      {
        height: val,
        transition: `height ${parseFloat(this.options.duration, 10)}ms`
      },
      this.$container
    )
  }

  setContainerWidth(width) {
    setStyle(
      {
        width
      },
      this.$container
    )

    this.containerWidth = parseFloat(getStyle('width', this.$container), 10)
  }

  getWidth() {
    return parseFloat(getStyle('width', this.element), 10)
  }

  reverse() {
    this.chunks.reverse()
    if (!this.options.carousel) {
      this.model.handleState()
    }

    this.chunks.forEach(chunk => {
      chunk.moveTo(chunk.movePosition)
    })

    toggleClass(this.classes.REVERSEMIN, this.FILTERBAR.$reverse)
    this.trigger(EVENTS.REVERSE)
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  getModel() {
    return this.options.carousel ? this.CAROUSEL : this.model
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
