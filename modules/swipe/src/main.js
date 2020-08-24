import anime from 'animejs'
import Component from '@pluginjs/component'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import templateEngine from '@pluginjs/template'
import { setStyle, getStyle } from '@pluginjs/styled'
import { isPlainObject } from '@pluginjs/is'
import { compose } from '@pluginjs/utils'
import { append, parentWith, query, queryAll, remove } from '@pluginjs/dom'
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
import Item from './item'
import Swipeable from '@pluginjs/swipeable'
import Arrows from '@pluginjs/arrows'
import Dots from '@pluginjs/dots'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Swipe extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    addClass(this.classes.NAMESPACE, this.element)

    this.initContainer()
    this.initWrapper()
    this.initInner()
    this.initState()
    if (this.options.arrows) {
      this.initArrows()
    }

    this.width = this.getWidth()
    this.itemWidth = this.getItemWidth()
    this.$items = this.getItems()
    this.chunks = this.createChunks(this.$items)
    this.innerWidth =
      this.chunks.length * (this.itemWidth + this.gutter) - this.gutter
    this.itemsGrid = this.getItemsGrid()
    this.snapGrid = this.getSnapGrid()
    this.maxCount = this.getMaxCount()
    this.active =
      this.options.active > this.maxCount - 1
        ? this.maxCount
        : this.options.active

    if (this.options.pagination) {
      this.initPagination()
    }

    if (this.options.arrows) {
      this.updateArrows()
    }

    if (this.options.swipeable) {
      this.initSwipeable()
    }

    this.bind()

    this.render(this.active, false)

    if (this.options.autoplay) {
      this.autoPlay()
    }

    console.log('instance', this)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initContainer() {
    this.$container = query(`.${this.classes.CONTAINER}`, this.element)

    if (!this.$container) {
      if (this.options.containerSelector) {
        this.$container = query(this.options.containerSelector, this.element)
        addClass(this.classes.CONTAINER, this.$wrapper)
      } else {
        const $container = this.createEle('container', {
          classes: this.classes
        })
        append($container, this.element)
        this.$container = query(`.${this.classes.CONTAINER}`, this.element)
      }
    }
  }

  initWrapper() {
    this.$wrapper = query(`.${this.classes.WRAPPER}`, this.element)

    if (!this.$wrapper) {
      if (this.options.wrapperSelector) {
        this.$wrapper = query(this.options.wrapperSelector, this.element)
        addClass(this.classes.WRAPPER, this.$wrapper)
      } else {
        const $wrapper = this.createEle('wrapper', {
          classes: this.classes
        })
        append($wrapper, this.$container)
        this.$wrapper = query(`.${this.classes.WRAPPER}`, this.element)
      }
    }
  }

  initInner() {
    this.$inner = query(`.${this.classes.INNER}`, this.element)

    if (!this.$inner) {
      if (this.options.innerSelector) {
        this.$inner = query(this.options.innerSelector, this.element)
        addClass(this.classes.INNER, this.$inner)
      } else {
        const $inner = this.createEle('inner', {
          classes: this.classes
        })
        append($inner, this.$wrapper)
        this.$inner = query(`.${this.classes.INNER}`, this.element)
        this.getItems().forEach($item => {
          append($item, this.$inner)
        })
      }
    }
  }

  initState() {
    this.initBreakpoint()
    this.gutter = this.column > 1 ? this.options.gutter : 0
    this.duration = this.options.duration
    this.outside = this.options.outside
    this.group = this.options.group
    this.loop = this.options.loop
    this.center = this.options.center

    this.$items = []
    this.chunks = []
    this.itemsGrid = []
    this.snapGrid = []

    this._interval = {
      createTimer: time => {
        return window.setInterval(() => {
          this.next()
        }, time)
      },
      removeTimer: () => {
        window.clearInterval(this.timer())
      }
    }
  }

  initBreakpoint() {
    Breakpoints.init()
    if (Breakpoints.is('lg+')) {
      this.column =
        this.options.desktopColumn > 0 ? this.options.desktopColumn : 1
    }

    if (Breakpoints.is('md')) {
      this.column =
        this.options.tabletColumn > 0 ? this.options.tabletColumn : 1
    }

    if (Breakpoints.is('sm-')) {
      this.column =
        this.options.mobileColumn > 0 ? this.options.mobileColumn : 1
    }
  }

  getItems() {
    let $items = queryAll(`.${this.classes.ITEM}`, this.element)
    if ($items.length === 0) {
      $items = queryAll(this.options.itemSelector, this.element)
      $items.forEach($item => {
        addClass(this.classes.ITEM, $item)
      })
    }

    return $items
  }

  createChunks($items) {
    const chunks = []
    const length = $items.length

    $items.forEach(($item, index) => {
      chunks.push(
        new Item(this, $item, {
          index,
          length
        })
      )
    })
    return chunks
  }

  getItemsGrid() {
    const itemsGrid = []
    this.chunks.forEach((chunk, index) => {
      itemsGrid.push((this.itemWidth + this.gutter) * index)
    })
    return itemsGrid
  }

  getSnapGrid() {
    let snapGrid = []
    const itemGroupNum = this.group ? this.column : 1
    let index = 0
    let itemPosition = 0
    let prevItemSize = 0

    for (let i = 0; i < this.$items.length; i++) {
      if (this.center) {
        itemPosition =
          itemPosition + this.itemWidth / 2 + prevItemSize / 2 + this.gutter
        if ((prevItemSize === 0 && i !== 0) || i === 0) {
          itemPosition = itemPosition - this.width / 2 - this.gutter
        }
        if (Math.abs(itemPosition) < 1 / 1000) {
          itemPosition = 0
        }
        if (index % itemGroupNum === 0) {
          snapGrid.push(itemPosition)
        }
      } else {
        if (index % itemGroupNum === 0) {
          snapGrid.push(itemPosition)
        }
        itemPosition = itemPosition + this.itemWidth + this.gutter
      }

      prevItemSize = this.itemWidth

      index += 1
    }

    if (!this.center) {
      const newItemsGrid = []
      for (let i = 0; i < snapGrid.length; i++) {
        const itemsGridItem = snapGrid[i]
        if (snapGrid[i] <= this.innerWidth - this.width) {
          newItemsGrid.push(itemsGridItem)
        }
      }

      snapGrid = newItemsGrid
      if (
        Math.floor(this.innerWidth - this.width) -
          Math.floor(snapGrid[snapGrid.length - 1]) >
        1
      ) {
        snapGrid.push(this.innerWidth - this.width)
      }
    }

    if (snapGrid.length === 0) {
      snapGrid = [0]
    }

    return snapGrid
  }

  getMaxCount() {
    let count = 0
    let targetItem = this.itemsGrid[0]
    const maxWidth = this.innerWidth - this.width
    if (maxWidth <= 0) {
      return 1
    }
    for (const item of this.itemsGrid) {
      if (item >= maxWidth) {
        break
      }
      count++
      targetItem = item
    }

    if (Math.floor(targetItem) < Math.floor(maxWidth) && !this.loop) {
      count += 1
    }

    return Math.max(1, count)
  }

  initPagination() {
    const that = this
    const $pagination = this.createEle('pagination', {
      classes: this.classes
    })
    const items = []

    for (let index = 0; index < this.maxCount; index++) {
      items.push({ index })
    }

    let config = {
      items,
      valueFrom: 'data-href',
      default: `${this.active}`,
      template: {
        item(css) {
          return `<li class="${css} ${that.classes.PAGINATIONITEM}" data-href="{index}"><a>{index}</a></li>`
        }
      }
    }

    append($pagination, this.element)
    config = isPlainObject(this.options.pagination)
      ? Object.assign({}, config, this.options.pagination)
      : config

    this.$pagination = Dots.of(
      query(`.${this.classes.PAGINATION}`, this.element),
      config
    )
  }

  initArrows() {
    this.$arrows = Arrows.of(this.$container, this.options.arrows)
    if (this.options.outside) {
      addClass(this.classes.OUTSIDE, this.element)
    }
  }

  updateArrows() {
    if (this.loop) {
      return
    }

    if (this.maxCount === 1) {
      this.$arrows.disable('prev')
      this.$arrows.disable('next')
    } else if (this.active === 0) {
      this.$arrows.disable('prev')
      this.$arrows.enable('next')
    } else if (this.active === this.maxCount - 1) {
      this.$arrows.disable('next')
      this.$arrows.enable('prev')
    } else {
      this.$arrows.enable('prev')
      this.$arrows.enable('next')
    }
  }

  initSwipeable() {
    const that = this

    this.$swipeable = Swipeable.of(this.$inner, {
      container: that.element,
      onStart() {
        that.startTime = Date.now()
        this.startPointer = this.info.pointer.x
        if (that.anime) {
          that.anime.pause()
        }
        if (that.options.autoplay) {
          that.intervalToggle(false)
        }
        that.leave('move')
      },
      onMove() {
        if (that.is('disable')) {
          return
        }
        if (!that.is('move')) {
          if (that.loop) {
            // ================================
            // ==========    loop    ==========
            // ================================
          }
          this.startPosition.x = that.getTranslate()
        }
        that.enter('move')

        const diff = this.info.pointer.x - this.startPointer
        that.swipeDirection = diff > 0 ? 'prev' : 'next'
        that.currentTranslate = diff + this.startPosition.x

        if (diff > 0 && that.currentTranslate > that.minTranslate()) {
          that.currentTranslate =
            that.minTranslate() -
            1 +
            (-that.minTranslate() + this.startPosition.x + diff) ** 0.85
        } else if (diff < 0 && that.currentTranslate < that.maxTranslate()) {
          that.currentTranslate =
            that.maxTranslate() +
            1 -
            (that.maxTranslate() - this.startPosition.x - diff) ** 0.85
        }

        that.setTranslate(that.currentTranslate)
        this.position = { x: that.currentTranslate, y: 0 }
      },
      onEnd() {
        if (that.is('disable')) {
          return
        }
        that.leave('move')
        const EndTime = Date.now()
        const timeDiff = EndTime - that.startTime
        const currentPos = -this.position.x
        const itemsGrid = that.itemsGrid
        let stopIndex = 0
        let groupSize = that.itemWidth
        const itemGroupNum = that.group ? that.column : 1

        for (let i = 0; i < itemsGrid.length; i += itemGroupNum) {
          if (typeof itemsGrid[i + itemGroupNum] !== 'undefined') {
            if (
              currentPos >= itemsGrid[i] &&
              currentPos < itemsGrid[i + itemGroupNum]
            ) {
              stopIndex = i
              groupSize = itemsGrid[i + itemGroupNum] - itemsGrid[i]
            }
          } else if (currentPos >= itemsGrid[i]) {
            stopIndex = i
            groupSize =
              itemsGrid[itemsGrid.length - 1] - itemsGrid[itemsGrid.length - 2]
          }
        }

        const ratio = (currentPos - itemsGrid[stopIndex]) / groupSize
        if (timeDiff > 300) {
          if (that.swipeDirection === 'next') {
            if (ratio >= 0.5) {
              that.render(stopIndex + itemGroupNum)
            } else {
              that.render(stopIndex)
            }
          }
          if (that.swipeDirection === 'prev') {
            if (ratio > 0.5) {
              that.render(stopIndex + itemGroupNum)
            } else {
              that.render(stopIndex)
            }
          }
        } else {
          if (that.swipeDirection === 'next') {
            that.render(stopIndex + itemGroupNum)
          }
          if (that.swipeDirection === 'prev') {
            that.render(stopIndex)
          }
        }
      }
    })
  }

  getTranslate() {
    const transform = getStyle('transform', this.$inner)
    if (transform === 'none') {
      return 0
    }

    return Number(transform.split(',')[4])
  }

  setTranslate(translate) {
    const x = translate

    setStyle({ transform: `translateX(${x}px)` }, this.$inner)
  }

  minTranslate() {
    return -this.snapGrid[0]
  }

  maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1]
  }

  render(index, duration = this.duration) {
    if (this.is('disabled')) {
      return
    }
    let itemIndex = index
    if (itemIndex >= this.maxCount) {
      itemIndex = this.maxCount - 1
    }
    if (itemIndex < 0) {
      itemIndex = 0
    }

    this.active = itemIndex

    let distance = 0

    distance = this.itemsGrid[itemIndex]

    if (this.$pagination) {
      this.$pagination.set(`${this.active}`)
    }

    if (this.options.arrows) {
      this.updateArrows()
    }

    this.move(distance, duration)

    this.updateItemActive()
  }

  move(distance, duration) {
    if (!duration) {
      setStyle({ transform: `translateX(${-distance}px)` }, this.$inner)
    } else {
      if (this.$anime) {
        this.$anime.pause()
      }
      this.$anime = anime({
        targets: this.$inner,
        translateX: -distance,
        easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
        duration: this.duration,
        begin: () => {
          this.enter('decaying')
          if (this.options.autoplay) {
            this.intervalToggle(false)
          }
        },
        complete: () => {
          this.leave('decaying')
          if (this.options.autoplay) {
            this.intervalToggle(true)
          }
        }
      })
    }
  }

  prev() {
    if (this.is('disabled')) {
      return
    }

    const maxIndex = this.loop ? this.maxCount - 1 : 0

    const active = this.active - 1 >= 0 ? this.active - 1 : maxIndex

    if (this.loop && active === this.maxCount - 1) {
      // ================================
      // ==========    loop    ==========
      // ================================
    }

    this.render(active)
  }

  next() {
    if (this.is('disabled')) {
      return
    }

    const minIndex = this.loop ? 0 : this.active

    const active = this.active >= this.maxCount - 1 ? minIndex : this.active + 1

    if (this.loop && active === 0) {
      // ================================
      // ==========    loop    ==========
      // ================================
    }

    this.render(active)
  }

  updateItemActive() {
    if (this.loop) {
      return
    }

    this.chunks.forEach((chunk, index) => {
      removeClass(this.classes.ACTIVE, chunk.element)
      if (index === this.active) {
        addClass(this.classes.ACTIVE, chunk.element)
      }
    })
  }

  resizeDebounce() {
    this.update()

    if (!this.is('disabled')) {
      this.trigger(EVENTS.RESIZE)
    }
  }

  autoPlay() {
    this.intervalToggle(true)
  }

  intervalToggle(open) {
    if (open) {
      this.setIntervalTime(this.options.playCycle)
      this.enter('play')
    } else {
      this._interval.removeTimer()
      this.leave('play')
    }
  }

  setIntervalTime(time) {
    if (this._interval.timer) {
      this._interval.removeTimer()
    }

    this._interval.timer = this._interval.createTimer(time)
  }

  timer() {
    return this._interval.timer
  }

  getWidth() {
    return parseFloat(getStyle('width', this.element), 10)
  }

  getItemWidth() {
    return (this.width - (this.column - 1) * this.gutter) / this.column
  }

  createEle(name, options) {
    return templateEngine.compile(this.options.templates[name]())(options)
  }

  bind() {
    if (this.options.pagination) {
      bindEvent(
        this.eventName('click'),
        `.${this.classes.PAGINATIONITEM}`,
        e => {
          const $item = parentWith(
            hasClass(this.classes.PAGINATIONITEM),
            e.target
          )
          const index = this.$pagination.dots.indexOf($item)
          this.render(index)
        },
        this.element
      )
    }

    if (this.options.arrows) {
      this.$arrows.options.onPrev = () => {
        this.prev()
        this.trigger(EVENTS.PREV)
      }

      this.$arrows.options.onNext = () => {
        this.next()
        this.trigger(EVENTS.NEXT)
      }
    }

    compose(
      bindEvent(this.eventName('mousedown'), () => {
        if (!this.is('decaying')) {
          return
        }
        this.enter('pause')
        this.$anime.pause()
      })
      // bindEvent(this.eventName('mouseup'), () => {
      //   if (!this.is('pause')) {
      //     return
      //   }
      //   this.$anime.play()
      //   this.leave('pause')
      // })
    )(this.$wrapper)
  }

  unbind() {
    if (this.options.arrows) {
      this.$arrows.unbind()
    }

    if (this.options.pagination) {
      this.$pagination.unbind()
    }

    removeEvent(this.eventName(), this.element)
  }

  update() {
    if (Breakpoints.is('lg+')) {
      this.column =
        this.options.desktopColumn > 0 ? this.options.desktopColumn : 1
    }

    if (Breakpoints.is('md')) {
      this.column =
        this.options.tabletColumn > 0 ? this.options.tabletColumn : 1
    }

    if (Breakpoints.is('sm-')) {
      this.column =
        this.options.mobileColumn > 0 ? this.options.mobileColumn : 1
    }
    this.unbind()
    if (this.$arrows) {
      remove(this.$arrows.$prev)
      remove(this.$arrows.$next)
      this.$arrows = null
    }
    if (this.$pagination) {
      remove(this.$pagination.element)
      this.$pagination = null
    }

    this.width = this.getWidth()
    this.itemWidth = this.getItemWidth()
    this.innerWidth =
      this.chunks.length * (this.itemWidth + this.gutter) - this.gutter
    this.itemsGrid = this.getItemsGrid()
    this.maxCount = this.getMaxCount()
    this.active = this.active > this.maxCount - 1 ? this.maxCount : this.active

    if (this.options.pagination) {
      this.initPagination()
    }

    if (this.options.arrows) {
      this.initArrows()
      this.updateArrows()
    }

    this.chunks.forEach(chunk => {
      chunk.updateSize()
    })

    this.bind()

    this.render(this.active, false)
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

export default Swipe
