import anime from 'animejs'
import Component from '@pluginjs/component'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import templateEngine from '@pluginjs/template'
import { setStyle, getStyle } from '@pluginjs/styled'
import { isPlainObject } from '@pluginjs/is'
import {
  attr,
  append,
  appendTo,
  prependTo,
  children,
  clone,
  parentWith,
  query,
  queryAll,
  remove
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

import Breakpoints from '@pluginjs/breakpoints'
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
    if (this.options.arrows && this.options.outside) {
      addClass(this.classes.OUTSIDE, this.element)
    }
    if (this.options.pagination && this.options.inside) {
      addClass(this.classes.INSIDE, this.element)
    }
    if (this.options.loop && !this.options.multiple) {
      this.initLoop()
    }
    if (this.options.multiple) {
      addClass(this.classes.MULTIPLE, this.element)
    }
    if (this.options.imageStretch) {
      addClass(this.classes.IMAGESTRETCH, this.element)
    }

    this.width = this.getWidth()
    this.itemWidth = this.getItemWidth()
    this.updateItem()
    this.itemGroupNum = this.options.group ? this.column : 1
    this.maxCount =
      this.options.loop && !this.options.multiple
        ? Math.ceil(
            (this.$items.length - this.loopItemsCount * 2) / this.itemGroupNum
          )
        : this.snapSize.length

    if (this.$items.length === 0) {
      return
    }

    this.updateCurrent()

    if (this.options.pagination) {
      this.initPagination()
      this.updatePagination()
    }

    if (this.options.arrows) {
      this.initArrows()
      this.updateArrows()
    }

    if (this.options.swipeable) {
      this.initSwipeable()
    }

    this.bind()

    if (this.options.loop && !this.options.multiple) {
      this.render(this.options.active + this.loopItemsCount, false)
    } else {
      this.render(this.options.active, false)
    }

    if (this.options.autoplay) {
      this.autoPlay()
    }

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
    this.gutter = this.options.gutter
    this.duration = this.options.duration
    this.active = 0
    this.realIndex = 0
    this.translate = 0
    this.progress = 0
    this.snapIndex = undefined
    this.$items = []
    this.itemsSize = []
    this.snapSize = []

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
      if (isPlainObject(this.options.pagination.mobile)) {
        this.paginationMobileOption = this.options.pagination.mobile
      }
    }
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
    if (this.paginationMobileOption) {
      config = Object.assign({}, config, this.paginationMobileOption)
    }

    this.$pagination = Dots.of(
      query(`.${this.classes.PAGINATION}`, this.element),
      config
    )
  }

  initArrows() {
    this.$arrows = Arrows.of(this.$container, this.options.arrows)
  }

  initSwipeable() {
    const that = this

    this.$swipeable = Swipeable.of(this.$inner, {
      container: that.$wrapper,
      onStart() {
        if (that.$anime) {
          that.$anime.pause()
        }

        that.startTime = Date.now()
        this.startPointer = this.info.pointer.x
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
          if (that.options.loop && !that.options.multiple) {
            that.updateLoop()
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
        const itemsSize = that.itemsSize
        let stopIndex = 0
        let groupSize = that.itemWidth
        const itemGroupNum = that.options.group ? that.column : 1

        for (let i = 0; i < itemsSize.length; i += itemGroupNum) {
          if (typeof itemsSize[i + itemGroupNum] !== 'undefined') {
            if (
              currentPos >= itemsSize[i] &&
              currentPos < itemsSize[i + itemGroupNum]
            ) {
              stopIndex = i
              groupSize = itemsSize[i + itemGroupNum] - itemsSize[i]
            }
          } else if (currentPos >= itemsSize[i]) {
            stopIndex = i
            groupSize =
              itemsSize[itemsSize.length - 1] - itemsSize[itemsSize.length - 2]
          }
        }

        const ratio = (currentPos - itemsSize[stopIndex]) / groupSize
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

  initLoop() {
    children(
      `.${this.classes.ITEM}.${this.classes.CLONED}`,
      this.$inner
    ).forEach(clonedItem => {
      clonedItem.remove()
    })

    const items = this.getItems()
    if (items.length === 0) {
      return
    }

    this.loopItemsCount = Math.ceil(parseFloat(this.column, 10))

    if (this.loopItemsCount > items.length) {
      this.loopItemsCount = items.length
    }

    const prependItems = []
    const appendItems = []

    items.forEach((item, index) => {
      if (index < this.loopItemsCount) {
        appendItems.push(item)
      }
      if (index < items.length && index >= items.length - this.loopItemsCount) {
        prependItems.push(item)
      }
      attr('data-item-index', index, item)
    })

    for (let i = 0; i < appendItems.length; i++) {
      addClass(
        this.classes.CLONED,
        appendTo(clone(appendItems[i]), this.$inner)
      )
    }

    for (let i = prependItems.length - 1; i >= 0; i--) {
      addClass(
        this.classes.CLONED,
        prependTo(clone(prependItems[i]), this.$inner)
      )
    }
  }

  updateLoop() {
    let newIndex
    const snapTranslate = -this.snapSize[this.active]
    const diff = snapTranslate - this.getTranslate()

    if (this.active < this.loopItemsCount) {
      newIndex = this.$items.length - this.loopItemsCount * 3 + this.active
      newIndex += this.loopItemsCount
      const changed = this.render(newIndex, false)
      if (changed && diff !== 0) {
        this.setTranslate(this.translate - diff)
      }
    } else if (this.active >= this.$items.length - this.loopItemsCount) {
      newIndex = -this.$items.length + this.active + this.loopItemsCount
      newIndex += this.loopItemsCount
      const changed = this.render(newIndex, false)
      if (changed && diff !== 0) {
        this.setTranslate(this.translate - diff)
      }
    }
  }

  setMultipleMargin(itemsLength, index, $item) {
    const maxColumnCount = Math.ceil(itemsLength / 2)
    if (index >= maxColumnCount) {
      setStyle({ 'margin-top': `${this.gutter}px` }, $item)
      if (!hasClass(this.classes.MULTIPLEROWSECOND, $item)) {
        addClass(this.classes.MULTIPLEROWSECOND, $item)
      }
    } else if (!hasClass(this.classes.MULTIPLEROWFIRST, $item)) {
      addClass(this.classes.MULTIPLEROWFIRST, $item)
    }
    if (index === maxColumnCount - 1 || index === itemsLength - 1) {
      if (!hasClass(this.classes.MULTIPLEROWLAST, $item)) {
        addClass(this.classes.MULTIPLEROWLAST, $item)
      }
    }
  }

  updateItem() {
    const $items = this.getItems()
    const itemsLength = $items.length
    const itemsSize = []
    const itemGroupNum = this.options.group ? this.column : 1
    let snapSize = []
    let index = 0
    let itemPosition = -0
    let prevItemSize = 0
    this.innerSize = -this.gutter

    for (let i = 0; i < itemsLength; i++) {
      const $item = $items[i]
      setStyle({ width: `${this.itemWidth}px` }, $item)

      const images = queryAll('img', $item)
      images.forEach(image => {
        image.onmousedown = e => {
          e.preventDefault()
        }
      })

      if (this.options.multiple) {
        this.setMultipleMargin(itemsLength, index, $item)
      }

      if (this.options.center) {
        itemPosition =
          itemPosition + this.itemWidth / 2 + prevItemSize / 2 + this.gutter
        if ((prevItemSize === 0 && i !== 0) || i === 0) {
          itemPosition = itemPosition - this.width / 2 - this.gutter
        }
        if (Math.abs(itemPosition) < 1 / 1000) {
          itemPosition = 0
        }
        if (index % itemGroupNum === 0) {
          snapSize.push(itemPosition)
        }
        itemsSize.push(itemPosition)
      } else {
        if (index % itemGroupNum === 0) {
          snapSize.push(itemPosition)
        }
        itemsSize.push(itemPosition)
        itemPosition = itemPosition + this.itemWidth + this.gutter
      }

      if (this.gutter !== 0) {
        setStyle({ marginRight: `${this.gutter}px` }, $item)
      }

      this.innerSize += this.itemWidth + this.gutter

      prevItemSize = this.itemWidth

      index += 1
    }

    this.innerSize = Math.max(this.innerSize, this.width)

    let newItemsSize = []
    let itemsNumberEvenToRows

    if (this.options.multiple) {
      if (Math.floor(itemsLength / 2) === itemsLength / 2) {
        itemsNumberEvenToRows = itemsLength
      } else {
        itemsNumberEvenToRows = Math.ceil(itemsLength / 2) * 2
      }

      this.innerSize = (this.itemWidth + this.gutter) * itemsNumberEvenToRows
      this.innerSize = Math.ceil(this.innerSize / 2) - this.gutter
      setStyle({ width: `${this.innerSize + this.gutter}px` }, this.$inner)

      if (this.options.center) {
        newItemsSize = []
        for (let i = 0; i < snapSize.length; i++) {
          const itemsSizeItem = snapSize[i]
          if (snapSize[i] < this.innerSize + snapSize[0]) {
            newItemsSize.push(itemsSizeItem)
          }
        }
        snapSize = newItemsSize
      }
    } else {
      setStyle({ width: `${this.innerSize}px` }, this.$inner)
    }

    if (!this.options.center) {
      newItemsSize = []
      for (let i = 0; i < snapSize.length; i++) {
        const itemsSizeItem = snapSize[i]
        if (snapSize[i] <= this.innerSize - this.width) {
          newItemsSize.push(itemsSizeItem)
        }
      }

      snapSize = newItemsSize
      if (
        Math.floor(this.innerSize - this.width) -
          Math.floor(snapSize[snapSize.length - 1]) >
        1
      ) {
        snapSize.push(this.innerSize - this.width)
      }
    }

    if (snapSize.length === 0) {
      snapSize = [0]
    }

    this.$items = $items
    this.itemsSize = itemsSize
    this.snapSize = snapSize
  }

  updateItemActive() {
    if (this.$items.length === 0) {
      return
    }

    this.$items.forEach(($item, index) => {
      if (index !== this.active && hasClass(this.classes.ACTIVE, $item)) {
        removeClass(this.classes.ACTIVE, $item)
      }

      if (index === this.active && !hasClass(this.classes.ACTIVE, $item)) {
        addClass(this.classes.ACTIVE, $item)
      }
    })
  }

  updateArrows() {
    if (this.options.loop) {
      return
    }

    if (this.is('first')) {
      this.$arrows.disable('prev')
    } else {
      this.$arrows.enable('prev')
    }
    if (this.is('last')) {
      this.$arrows.disable('next')
    } else {
      this.$arrows.enable('next')
    }
  }

  updatePagination() {
    if (!this.options.pagination) {
      return
    }

    this.$pagination.set(this.current)
  }

  updateCurrent(updateArrow = false) {
    let current
    const itemGroupNum = this.options.group ? this.column : 1
    const itemsLength = this.$items.length
    const paginationCount = this.maxCount

    if (this.options.loop && !this.options.multiple) {
      current = Math.ceil((this.active - this.loopItemsCount) / itemGroupNum)
      if (current > itemsLength - 1 - this.loopItemsCount * 2) {
        current -= itemsLength - this.loopItemsCount * 2
      }
      if (current > paginationCount - 1) {
        current -= paginationCount
      }
      if (current < 0) {
        current = paginationCount + current
      }
    } else if (typeof this.snapIndex !== 'undefined') {
      current = this.snapIndex
    } else {
      current = this.active || 0
    }

    if (this.maxCount === 1) {
      this.enter('first')
      this.enter('last')
    } else if (!this.options.loop) {
      if (current === 0) {
        this.enter('first')
      } else {
        this.leave('first')
      }
      if (current === this.maxCount - 1) {
        this.enter('last')
      } else {
        this.leave('last')
      }
    }

    if (updateArrow && this.options.arrows) {
      this.updateArrows()
    }

    this.current = current
  }

  updateActiveIndex(newActiveIndex) {
    const translate = -this.translate
    const {
      itemsSize,
      snapSize,
      active: prevIndex,
      snapIndex: prevSnapIndex
    } = this

    const itemGroupNum = this.options.group ? this.column : 1
    let activeIndex = newActiveIndex
    let snapIndex
    if (typeof activeIndex === 'undefined') {
      for (let i = 0; i < itemsSize.length; i++) {
        if (typeof itemsSize[i + 1] !== 'undefined') {
          if (
            translate >= itemsSize[i] &&
            translate < itemsSize[i + 1] - (itemsSize[i + 1] - itemsSize[i]) / 2
          ) {
            activeIndex = i
          } else if (
            translate >= itemsSize[i] &&
            translate < itemsSize[i + 1]
          ) {
            activeIndex = i + 1
          }
        } else if (translate >= itemsSize[i]) {
          activeIndex = i
        }
      }

      if (activeIndex < 0 || typeof activeIndex === 'undefined') {
        activeIndex = 0
      }
    }
    if (snapSize.indexOf(translate) >= 0) {
      snapIndex = snapSize.indexOf(translate)
    } else {
      snapIndex = Math.floor(activeIndex / itemGroupNum)
    }
    if (snapIndex >= snapSize.length) {
      snapIndex = snapSize.length - 1
    }
    if (activeIndex === prevIndex) {
      if (snapIndex !== prevSnapIndex) {
        this.snapIndex = snapIndex
        this.updateCurrent(true)
        if (!this.options.loop) {
          this.updatePagination()
        }
      }
      return
    }

    const realIndex = parseInt(
      this.$items[activeIndex].dataset.itemIndex || activeIndex,
      10
    )

    this.snapIndex = snapIndex
    this.realIndex = realIndex
    this.active = activeIndex

    this.updateCurrent(true)

    if (this.options.loop) {
      this.updatePagination()
    } else if (typeof this.snapIndex === 'undefined') {
      this.updatePagination()
    }

    if (!this.options.loop) {
      this.updatePagination()
    }
  }

  render(index, duration = this.duration) {
    if (this.is('disabled')) {
      return
    }

    let itemIndex = index
    if (itemIndex < 0) {
      itemIndex = 0
    }
    const itemGroupNum = this.options.group ? this.column : 1
    let snapIndex = Math.floor(itemIndex / itemGroupNum)
    if (snapIndex >= this.snapSize.length) {
      snapIndex = this.snapSize.length - 1
    }

    const distance = -this.snapSize[snapIndex]

    for (let i = 0; i < this.itemsSize.length; i++) {
      if (-Math.floor(distance * 100) >= Math.floor(this.itemsSize[i] * 100)) {
        itemIndex = i
      }
    }

    this.setTranslate(distance, false)

    this.updateActiveIndex(itemIndex)

    this.updateItemActive()

    this.move(distance, duration)
  }

  move(distance, duration) {
    if (!duration) {
      setStyle({ transform: `translateX(${distance}px)` }, this.$inner)
    } else {
      if (this.$anime) {
        this.$anime.pause()
      }
      this.$anime = anime({
        targets: this.$inner,
        translateX: distance,
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
    if (this.options.loop && !this.options.multiple) {
      this.updateLoop()
      this.clientLeft = this.$inner.clientLeft
    }

    const translate = -this.translate
    const normalizedTranslate = this.normalize(translate)
    const normalizedSnapSize = this.snapSize.map(value => this.normalize(value))
    const prevSnap = this.snapSize[
      normalizedSnapSize.indexOf(normalizedTranslate) - 1
    ]

    let prevIndex
    if (typeof prevSnap !== 'undefined') {
      prevIndex = this.itemsSize.indexOf(prevSnap)
      if (prevIndex < 0) {
        prevIndex = this.active - 1
      }
    }

    if (this.options.loop && this.options.multiple) {
      if (this.current === 0) {
        this.render(this.maxCount - 1)
        return
      }
    }

    this.render(prevIndex)
  }

  next() {
    if (this.is('disabled')) {
      return
    }
    const itemGroupNum = this.options.group ? this.column : 1

    if (this.options.loop && !this.options.multiple) {
      this.updateLoop()
      this.clientLeft = this.$inner.clientLeft
      this.render(this.active + itemGroupNum)
      return
    }

    if (this.options.loop && this.options.multiple) {
      if (this.current === this.maxCount - 1) {
        this.render(0)
        return
      }
    }

    this.render(this.active + itemGroupNum)
  }

  update() {
    if (Breakpoints.is('lg+')) {
      this.column =
        this.options.desktopColumn > 0 ? this.options.desktopColumn : 1

      if (isPlainObject(this.options.pagination.mobile)) {
        this.paginationMobileOption = null
      }
    }

    if (Breakpoints.is('md')) {
      this.column =
        this.options.tabletColumn > 0 ? this.options.tabletColumn : 1

      if (isPlainObject(this.options.pagination.mobile)) {
        this.paginationMobileOption = null
      }
    }

    if (Breakpoints.is('sm-')) {
      this.column =
        this.options.mobileColumn > 0 ? this.options.mobileColumn : 1

      if (isPlainObject(this.options.pagination.mobile)) {
        this.paginationMobileOption = this.options.pagination.mobile
      }
    }
    if (this.options.autoplay) {
      this.intervalToggle(false)
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

    if (this.options.loop && !this.options.multiple) {
      this.initLoop()
    }

    this.width = this.getWidth()
    this.itemWidth = this.getItemWidth()
    this.updateItem()
    this.itemGroupNum = this.options.group ? this.column : 1
    this.maxCount =
      this.options.loop && !this.options.multiple
        ? Math.ceil(
            (this.$items.length - this.loopItemsCount * 2) / this.itemGroupNum
          )
        : this.snapSize.length

    this.updateCurrent()

    if (this.options.pagination) {
      this.initPagination()
      this.updatePagination()
    }

    if (this.options.arrows) {
      this.initArrows()
      this.updateArrows()
    }

    if (this.options.swipeable) {
      this.initSwipeable()
    }

    this.bind()

    if (this.options.loop && !this.options.multiple) {
      this.render(this.realIndex + this.loopItemsCount, false)
    } else {
      this.render(this.active, false)
    }

    if (this.options.autoplay) {
      this.autoPlay()
    }
  }

  resize() {
    this.update()

    if (!this.is('disabled')) {
      this.trigger(EVENTS.RESIZE)
    }
  }

  getTranslate() {
    const transform = getStyle('transform', this.$inner)
    if (transform === 'none') {
      return 0
    }

    return Number(transform.split(',')[4])
  }

  setTranslate(translate, update = true) {
    const x = translate

    if (update) {
      setStyle({ transform: `translateX(${x}px)` }, this.$inner)
    }

    this.translate = x
  }

  minTranslate() {
    return -this.snapSize[0]
  }

  maxTranslate() {
    return -this.snapSize[this.snapSize.length - 1]
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

  normalize(value) {
    if (value < 0) {
      return -Math.floor(Math.abs(value))
    }
    return Math.floor(value)
  }

  getWidth() {
    return parseFloat(getStyle('width', this.element), 10)
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
          let index = this.$pagination.dots.indexOf($item)
          if (this.options.group) {
            index *= this.column
          }
          if (this.options.loop && !this.options.multiple) {
            index += this.loopItemsCount
          }
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

    if (this.options.swipeable && !this.$swipeable.is('bind')) {
      this.$swipeable.bind()
    }
  }

  unbind() {
    if (this.options.arrows) {
      this.$arrows.unbind()
    }

    if (this.options.pagination) {
      this.$pagination.unbind()
    }

    if (this.options.swipeable) {
      this.$swipeable.unbind()
    }

    removeEvent(this.eventName(), this.element)
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
