/* Credit to https://swiperjs.com/ MIT */
import { transitionEndEvent } from '@pluginjs/feature'
import Component from '@pluginjs/component'
import { bindEvent, removeEvent, bindEventOnce } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import templateEngine from '@pluginjs/template'
import { setStyle, getStyle, getWidth, getHeight } from '@pluginjs/styled'
import { isPlainObject, isElement } from '@pluginjs/is'
import {
  append,
  appendTo,
  prependTo,
  parentWith,
  prev,
  next,
  clone,
  attr,
  query,
  queryAll,
  children
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

    this.initWrapper()
    this.initInner()
    this.initState()
    if (this.options.loop && !this.options.multiple) {
      this.initLoop()
    }
    if (this.options.multiple) {
      addClass(this.classes.MULTIPLE, this.element)
    }
    this.updateSize()
    this.updateItem()

    if (this.options.loop && !this.options.multiple) {
      this.moveTo(this.options.defaultActive + this.loopedItemsLength, 0, true)
    } else {
      this.moveTo(this.options.defaultActive, 0, true)
    }

    if (this.options.arrows) {
      this.initArrows()
      this.updateArrows()
    }

    if (this.options.pagination) {
      this.initPagination()
      this.updatePagination()
    }

    if (this.options.swipeable) {
      this.initSwipeable()
    }

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initWrapper() {
    this.$wrapper = query(`.${this.classes.WRAPPER}`, this.element)

    if (!this.$wrapper) {
      if (!this.options.wrapperSelector) {
        throw Error('can\'t find option "wrapperSelector"!')
      }

      this.$wrapper = query(this.options.wrapperSelector, this.element)
      addClass(this.classes.WRAPPER, this.$wrapper)
    }
  }

  initInner() {
    this.$inner = query(`.${this.classes.INNER}`, this.element)

    if (!this.$inner) {
      if (!this.options.innerSelector) {
        throw Error('can\'t find option "innerSelector"!')
      }

      this.$inner = query(this.options.innerSelector, this.element)
      addClass(this.classes.INNER, this.$inner)
    }
  }

  initArrows() {
    this.$arrows = Arrows.of(this.$wrapper, this.options.arrows)
  }

  initPagination() {
    const that = this
    const pagination = this.createEl('pagination', {
      classes: this.classes
    })
    const items = []
    const itemGroupNum = this.options.group ? this.itemNums : 1

    const paginationCounts =
      this.options.loop && !this.options.multiple
        ? Math.ceil(
            (this.items.length - this.loopedItemsLength * 2) / itemGroupNum
          )
        : this.snapGrid.length
    this.paginationCounts = paginationCounts

    for (let i = 0; i < paginationCounts; i++) {
      items.push({ index: i })
    }

    let config = {
      items,
      valueFrom: 'data-href',
      default: `${this.activeIndex}`,
      template: {
        item(css) {
          return `<li class="${css} ${that.classes.PAGINATIONITEM}" data-href="{index}"><a>{index}</a></li>`
        }
      }
    }

    append(pagination, this.element)

    config = isPlainObject(this.options.pagination)
      ? Object.assign({}, config, this.options.pagination)
      : config

    this.$pagination = Dots.of(
      query(`.${this.classes.PAGINATION}`, this.element),
      config
    )
  }

  updateArrows() {
    if (!this.options.arrows || this.options.loop) {
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
    let current
    const itemGroupNum = this.options.group ? this.itemNums : 1
    const slidesLength = this.items.length
    const paginationCounts = this.paginationCounts

    if (this.options.loop && !this.options.multiple) {
      current = Math.ceil(
        (this.activeIndex - this.loopedItemsLength) / itemGroupNum
      )
      if (current > slidesLength - 1 - this.loopedItemsLength * 2) {
        current -= slidesLength - this.loopedItemsLength * 2
      }
      if (current > paginationCounts - 1) {
        current -= paginationCounts
      }
      if (current < 0) {
        current = paginationCounts + current
      }
    } else if (typeof this.snapIndex !== 'undefined') {
      current = this.snapIndex
    } else {
      current = this.activeIndex || 0
    }
    this.$pagination.set(current)
  }

  initSwipeable() {
    const that = this

    this.$swipeable = Swipeable.of(this.$inner, {
      container: that.$wrapper,
      power: 1,
      duration: that.options.duration,
      onStart() {
        that.startTime = Date.now()
        that.updateSize()
        this.startPointer = this.info.pointer.x
        that.leave('move')
      },
      onMove() {
        if (!that.is('move')) {
          if (that.options.loop && !that.options.multiple) {
            that.fixLoop()
          }
          this.startPosition.x = that.getTranslate()
          that.setTransition(0)
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

        that.updateProgress(that.currentTranslate)
        that.setTranslate(that.currentTranslate)
        this.position = { x: that.currentTranslate, y: 0 }
      },
      onEnd() {
        that.leave('move')
        const EndTime = Date.now()
        const timeDiff = EndTime - that.startTime
        const currentPos = -this.position.x
        const itemsGrid = that.itemsGrid
        let stopIndex = 0
        let groupSize = that.itemsSizesGrid[0]
        const itemGroupNum = that.options.group ? that.itemNums : 1

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
              that.moveTo(stopIndex + itemGroupNum)
            } else {
              that.moveTo(stopIndex)
            }
          }
          if (that.swipeDirection === 'prev') {
            if (ratio > 0.5) {
              that.moveTo(stopIndex + itemGroupNum)
            } else {
              that.moveTo(stopIndex)
            }
          }
        } else {
          if (that.swipeDirection === 'next') {
            that.moveTo(stopIndex + itemGroupNum)
          }
          if (that.swipeDirection === 'prev') {
            that.moveTo(stopIndex)
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

    this.loopedItemsLength = Math.ceil(parseFloat(this.itemNums, 10))

    if (this.loopedItemsLength > items.length) {
      this.loopedItemsLength = items.length
    }

    const prependItems = []
    const appendItems = []

    items.forEach((item, index) => {
      if (index < this.loopedItemsLength) {
        appendItems.push(item)
      }
      if (
        index < items.length &&
        index >= items.length - this.loopedItemsLength
      ) {
        prependItems.push(item)
      }
      attr('data-swipe-item-index', index, item)
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

  fixLoop() {
    this.trigger('beforeFixLoop')
    let newIndex
    const snapTranslate = -this.snapGrid[this.activeIndex]
    const diff = snapTranslate - this.getTranslate()

    if (this.activeIndex < this.loopedItemsLength) {
      newIndex =
        this.items.length - this.loopedItemsLength * 3 + this.activeIndex
      newIndex += this.loopedItemsLength
      const changed = this.moveTo(newIndex, 0, false)
      if (changed && diff !== 0) {
        this.setTranslate(this.translate - diff)
      }
    } else if (this.activeIndex >= this.items.length - this.loopedItemsLength) {
      newIndex = -this.items.length + this.activeIndex + this.loopedItemsLength
      newIndex += this.loopedItemsLength
      const changed = this.moveTo(newIndex, 0, false)
      if (changed && diff !== 0) {
        this.setTranslate(this.translate - diff)
      }
    }

    this.trigger('fixLoop')
  }

  initState() {
    this.enter('first')
    this.leave('last')
    this.progress = 0
    this.translate = 0
    this.activeIndex = 0
    this.realIndex = 0
    this.prevTranslate = 0
    this.virtualHeight = 0
    this.itemNums = this.options.itemNums
    this.items = []
    this.itemsGrid = []
    this.snapGrid = []
    this.itemsSizesGrid = []
    this.leave('animating')
  }

  updateSize() {
    const width = getWidth(this.element)
    this.width = width
    this.size = width
  }

  updateGutter() {
    this.gutter = this.options.gutter

    if (typeof this.gutter === 'string' && this.gutter.indexOf('%') >= 0) {
      this.gutter = (parseFloat(this.gutter.replace('%', '')) / 100) * this.size
    }
  }

  setMultipleMargin(numFullColumns, index, item) {
    let column = Math.floor(index / 2)
    let row = index - column * 2

    if (column > numFullColumns || (column === numFullColumns && row === 1)) {
      row += 1
      if (row >= 2) {
        row = 0
        column += 1
      }
    }

    if (row === 0) {
      this.firstRowHeight = getHeight(item)
    }

    if (row === 1) {
      this.secondRowHeight = getHeight(item)
      const columnHeight =
        this.firstRowHeight + this.gutter + this.secondRowHeight

      this.virtualHeight = Math.max(this.virtualHeight, columnHeight)
      this.firstRowHeight = 0
      this.secondRowHeight = 0
    }

    setStyle(
      {
        'margin-top': row !== 0 && this.gutter && `${this.gutter}px`
      },
      item
    )
  }

  updateItem() {
    const prevItemsLength = this.items.length
    const items = this.getItems()
    const itemsLength = items.length
    let snapGrid = []
    const itemsGrid = []
    const itemsSizesGrid = []
    const prevSnapGridLength = this.snapGrid.length
    const prevItemsGridLength = this.snapGrid.length
    let itemPosition = -0
    let prevItemSize = 0
    let index = 0
    this.firstRowHeight = 0
    this.secondRowHeight = 0
    this.virtualHeight = 0

    if (typeof this.size === 'undefined') {
      return
    }

    this.updateGutter()
    this.virtualSize = -this.gutter

    const itemGroupNum = this.options.group ? this.itemNums : 1
    const itemSize =
      (this.size - (this.itemNums - 1) * this.gutter) / this.itemNums
    const numFullColumns = this.options.multiple
      ? Math.floor(itemsLength / 2)
      : Math.floor(itemsLength)

    for (let i = 0; i < itemsLength; i++) {
      const item = items[i]
      setStyle({ width: `${itemSize}px` }, item)

      if (this.options.multiple) {
        this.setMultipleMargin(numFullColumns, index, item)
      }

      if (getStyle('display', item) === 'none') {
        continue
      }

      item.swipeItemSize = itemSize
      itemsSizesGrid.push(itemSize)

      if (this.options.center) {
        itemPosition =
          itemPosition + itemSize / 2 + prevItemSize / 2 + this.gutter
        if ((prevItemSize === 0 && i !== 0) || i === 0) {
          itemPosition = itemPosition - this.size / 2 - this.gutter
        }
        if (Math.abs(itemPosition) < 1 / 1000) {
          itemPosition = 0
        }
        if (index % itemGroupNum === 0) {
          snapGrid.push(itemPosition)
        }
        itemsGrid.push(itemPosition)
      } else {
        if (index % itemGroupNum === 0) {
          snapGrid.push(itemPosition)
        }
        itemsGrid.push(itemPosition)
        itemPosition = itemPosition + itemSize + this.gutter
      }

      if (this.gutter !== 0) {
        setStyle({ marginRight: `${this.gutter}px` }, item)
      }

      this.virtualSize += itemSize + this.gutter

      prevItemSize = itemSize

      index += 1
    }

    this.virtualSize = Math.max(this.virtualSize, this.size)

    let newItemsGrid
    let itemsNumberEvenToRows

    if (this.options.multiple) {
      if (Math.floor(itemsLength / 2) === itemsLength / 2) {
        itemsNumberEvenToRows = itemsLength
      } else {
        itemsNumberEvenToRows = Math.ceil(itemsLength / 2) * 2
      }

      this.virtualSize = (itemSize + this.gutter) * itemsNumberEvenToRows
      this.virtualSize = Math.ceil(this.virtualSize / 2) - this.gutter
      setStyle({ width: `${this.virtualSize + this.gutter}px` }, this.$inner)
      setStyle({ height: `${this.virtualHeight}px` }, this.$inner)

      if (this.options.center) {
        newItemsGrid = []
        for (let i = 0; i < snapGrid.length; i++) {
          const itemsGridItem = snapGrid[i]
          if (snapGrid[i] < this.virtualSize + snapGrid[0]) {
            newItemsGrid.push(itemsGridItem)
          }
        }
        snapGrid = newItemsGrid
      }
    } else {
      setStyle({ width: `${this.virtualSize}px` }, this.$inner)
    }

    if (!this.options.center) {
      newItemsGrid = []
      for (let i = 0; i < snapGrid.length; i++) {
        const itemsGridItem = snapGrid[i]
        if (snapGrid[i] <= this.virtualSize - this.size) {
          newItemsGrid.push(itemsGridItem)
        }
      }

      snapGrid = newItemsGrid
      if (
        Math.floor(this.virtualSize - this.size) -
          Math.floor(snapGrid[snapGrid.length - 1]) >
        1
      ) {
        snapGrid.push(this.virtualSize - this.size)
      }
    }

    if (snapGrid.length === 0) {
      snapGrid = [0]
    }

    this.items = items
    this.snapGrid = snapGrid
    this.itemsGrid = itemsGrid
    this.itemsSizesGrid = itemsSizesGrid

    if (itemsLength !== prevItemsLength) {
      this.trigger('itemsLengthChange')
    }
    if (snapGrid.length !== prevSnapGridLength) {
      this.trigger('snapGridLengthChange')
    }
    if (itemsGrid.length !== prevItemsGridLength) {
      this.trigger('itemsGridLengthChange')
    }
  }

  updateItemsClass() {
    this.items.forEach(item => {
      removeClass(
        this.classes.ACTIVE,
        this.classes.PREV,
        this.classes.NEXT,
        this.classes.CLONEDACTIVE,
        this.classes.CLONEDPREV,
        this.classes.CLONEDNEXT,
        item
      )
    })
    const activeItem = this.items[this.activeIndex]

    addClass(this.classes.ACTIVE, activeItem)

    if (this.options.loop && !this.options.multiple) {
      if (hasClass(this.classes.CLONED, activeItem)) {
        children(
          `.${this.classes.ITEM}:not(.${this.classes.CLONED})[data-swipe-item-index="${this.realIndex}"]`,
          this.$inner
        ).forEach(children => {
          addClass(this.classes.CLONEDACTIVE, children)
        })
      } else {
        children(
          `.${this.classes.ITEM}.${this.classes.CLONED}[data-swipe-item-index="${this.realIndex}"]`,
          this.$inner
        ).forEach(children => {
          addClass(this.classes.CLONEDACTIVE, children)
        })
      }
    }

    let nextItem = addClass(this.classes.NEXT, next(activeItem))
    if (this.options.loop && !this.options.multiple && !isElement(nextItem)) {
      nextItem = this.items[0]
      addClass(this.classes.NEXT, nextItem)
    }
    let prevItem = addClass(this.classes.PREV, prev(activeItem))
    if (this.options.loop && !this.options.multiple && !isElement(prevItem)) {
      prevItem = this.items[this.items.length - 1]
      addClass(this.classes.PREV, prevItem)
    }

    if (this.options.loop && !this.options.multiple) {
      if (hasClass(this.classes.CLONED, nextItem)) {
        children(
          `.${this.classes.ITEM}:not(.${
            this.classes.CLONED
          })[data-swipe-item-index="${attr(
            'data-swipe-item-index',
            nextItem
          )}"]`,
          this.$inner
        ).forEach(children => {
          addClass(this.classes.CLONEDNEXT, children)
        })
      } else {
        children(
          `.${this.classes.ITEM}.${
            this.classes.CLONED
          }[data-swipe-item-index="${attr(
            'data-swipe-item-index',
            nextItem
          )}"]`,
          this.$inner
        ).forEach(children => {
          addClass(this.classes.CLONEDNEXT, children)
        })
      }
      if (hasClass(this.classes.CLONED, prevItem)) {
        children(
          `.${this.classes.ITEM}:not(.${
            this.classes.CLONED
          })[data-swipe-item-index="${attr(
            'data-swipe-item-index',
            prevItem
          )}"]`,
          this.$inner
        ).forEach(children => {
          addClass(this.classes.CLONEDPREV, children)
        })
      } else {
        children(
          `.${this.classes.ITEM}.${
            this.classes.CLONED
          }[data-swipe-item-index="${attr(
            'data-swipe-item-index',
            prevItem
          )}"]`,
          this.$inner
        ).forEach(children => {
          addClass(this.classes.CLONEDPREV, children)
        })
      }
    }
  }

  moveTo(index = 0, speed = this.options.duration, runCallback = true) {
    if (this.is('disabled')) {
      return
    }
    let itemIndex = index
    if (itemIndex < 0) {
      itemIndex = 0
    }
    const { snapGrid, itemsGrid, prevIndex, activeIndex } = this
    const itemGroupNum = this.options.group ? this.itemNums : 1

    let snapIndex = Math.floor(itemIndex / itemGroupNum)
    if (snapIndex >= snapGrid.length) {
      snapIndex = snapGrid.length - 1
    }

    if (
      (activeIndex || this.options.defaultActive || 0) === (prevIndex || 0) &&
      runCallback
    ) {
      this.trigger('beforeItemChangeStart')
    }

    const translate = -snapGrid[snapIndex]

    this.updateProgress(translate)

    for (let i = 0; i < itemsGrid.length; i++) {
      if (-Math.floor(translate * 100) >= Math.floor(itemsGrid[i] * 100)) {
        itemIndex = i
      }
    }

    let direction
    if (itemIndex > activeIndex) {
      direction = 'next'
    } else if (itemIndex < activeIndex) {
      direction = 'prev'
    } else {
      direction = 'reset'
    }

    if (translate === this.translate) {
      this.updateActiveIndex(itemIndex)

      this.updateItemsClass()
      if (direction !== 'reset') {
        this.transitionStart(runCallback, direction)
        this.transitionEnd(runCallback, direction)
      }

      return
    }

    if (speed === 0) {
      this.setTransition(0)
      this.setTranslate(translate)
      this.updateActiveIndex(itemIndex)
      this.updateItemsClass()
      this.trigger('beforeTransitionStart', speed)
      this.transitionStart(runCallback, direction)
      this.transitionEnd(runCallback, direction)
    } else {
      this.setTransition(speed)
      this.setTranslate(translate)
      this.updateActiveIndex(itemIndex)
      this.updateItemsClass()
      this.trigger('beforeTransitionStart', speed)
      this.transitionStart(runCallback, direction)
      if (!this.is('animating')) {
        this.enter('animating')
        bindEventOnce(
          transitionEndEvent(),
          () => {
            this.transitionEnd(runCallback, direction)
          },
          this.$inner
        )
      }
    }

    return
  }

  prev(speed = this.options.duration, runCallback = true) {
    if (this.is('disabled')) {
      return
    }
    if (this.options.loop && !this.options.multiple) {
      if (this.is('animating')) {
        return
      }
      this.fixLoop()
      this.clientLeft = this.$inner.clientLeft
    }
    const translate = -this.translate
    const normalizedTranslate = this.normalize(translate)
    const normalizedSnapGrid = this.snapGrid.map(value => this.normalize(value))
    const prevSnap = this.snapGrid[
      normalizedSnapGrid.indexOf(normalizedTranslate) - 1
    ]

    let prevIndex
    if (typeof prevSnap !== 'undefined') {
      prevIndex = this.itemsGrid.indexOf(prevSnap)
      if (prevIndex < 0) {
        prevIndex = this.activeIndex - 1
      }
    }

    this.moveTo(prevIndex, speed, runCallback)
  }

  next(speed = this.options.duration, runCallback = true) {
    if (this.is('disabled')) {
      return
    }
    const itemGroupNum = this.options.group ? this.itemNums : 1

    if (this.options.loop && !this.options.multiple) {
      if (this.is('animating')) {
        return
      }
      this.fixLoop()
      this.clientLeft = this.$inner.clientLeft
      this.moveTo(this.activeIndex + itemGroupNum, speed, runCallback)
      return
    }

    this.moveTo(this.activeIndex + itemGroupNum, speed, runCallback)
  }

  updateProgress(translate) {
    if (typeof translate === 'undefined') {
      translate = (this && this.translate) || 0
    }
    const translateDiff = this.maxTranslate() - this.minTranslate()
    const isFirst = this.is('first')
    const isLast = this.is('last')
    if (translateDiff === 0) {
      this.progress = 0
      this.enter('first')
      this.enter('last')
    } else {
      this.progress = (translate - this.minTranslate()) / translateDiff

      if (this.progress <= 0) {
        this.enter('first')
      } else {
        this.leave('first')
      }
      if (this.progress >= 1) {
        this.enter('last')
      } else {
        this.leave('last')
      }
    }

    if (this.is('first') && !isFirst) {
      this.trigger('reachFirst')
      this.trigger('toEdge')
    }

    if (this.is('last') && !isLast) {
      this.trigger('reachLast')
      this.trigger('toEdge')
    }

    if ((isFirst && !this.is('first')) || (isLast && !this.is('last'))) {
      this.trigger('fromEdge')
    }

    this.trigger('progress', this.progress)
  }

  updateTranslate() {
    const newTranslate = Math.min(
      Math.max(this.translate, this.maxTranslate()),
      this.minTranslate()
    )
    this.setTranslate(newTranslate)
    this.updateActiveIndex()
    this.updateItemsClass()
  }

  updateActiveIndex(newActiveIndex) {
    const translate = -this.translate
    const {
      itemsGrid,
      snapGrid,
      activeIndex: prevIndex,
      realIndex: prevRealIndex,
      snapIndex: prevSnapIndex
    } = this
    const itemGroupNum = this.options.group ? this.itemNums : 1
    let activeIndex = newActiveIndex
    let snapIndex
    if (typeof activeIndex === 'undefined') {
      for (let i = 0; i < itemsGrid.length; i++) {
        if (typeof itemsGrid[i + 1] !== 'undefined') {
          if (
            translate >= itemsGrid[i] &&
            translate < itemsGrid[i + 1] - (itemsGrid[i + 1] - itemsGrid[i]) / 2
          ) {
            activeIndex = i
          } else if (
            translate >= itemsGrid[i] &&
            translate < itemsGrid[i + 1]
          ) {
            activeIndex = i + 1
          }
        } else if (translate >= itemsGrid[i]) {
          activeIndex = i
        }
      }

      if (activeIndex < 0 || typeof activeIndex === 'undefined') {
        activeIndex = 0
      }
    }

    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate)
    } else {
      snapIndex = Math.floor(activeIndex / itemGroupNum)
    }
    if (snapIndex >= snapGrid.length) {
      snapIndex = snapGrid.length - 1
    }
    if (activeIndex === prevIndex) {
      if (snapIndex !== prevSnapIndex) {
        this.snapIndex = snapIndex
        this.trigger('snapIndexChange')
      }
      return
    }

    const realIndex = parseInt(
      this.items[activeIndex].dataset.swipeItemIndex || activeIndex,
      10
    )

    this.snapIndex = snapIndex
    this.realIndex = realIndex
    this.prevIndex = prevIndex
    this.activeIndex = activeIndex

    this.trigger('activeIndexChange')
    this.trigger('snapIndexChange')
    if (prevRealIndex !== realIndex) {
      this.trigger('realIndexChange')
    }
    this.trigger('itemChange')
  }

  transitionStart(runCallback = true, direction) {
    const { activeIndex, prevIndex } = this

    let dir = direction
    if (!dir) {
      if (activeIndex > prevIndex) {
        dir = 'next'
      } else if (activeIndex < prevIndex) {
        dir = 'prev'
      } else {
        dir = 'reset'
      }
    }

    this.trigger('transitionStart')

    if (runCallback && activeIndex !== prevIndex) {
      if (dir === 'reset') {
        this.trigger('itemResetTransitionStart')
        return
      }
      this.trigger('itemChangeTransitionStart')
      if (dir === 'next') {
        this.trigger('itemNextTransitionStart')
      } else {
        this.trigger('itemPrevTransitionStart')
      }
    }
  }

  transitionEnd(runCallback = true, direction) {
    const { activeIndex, prevIndex } = this
    this.leave('animating')
    this.setTransition(0)

    let dir = direction
    if (!dir) {
      if (activeIndex > prevIndex) {
        dir = 'next'
      } else if (activeIndex < prevIndex) {
        dir = 'prev'
      } else {
        dir = 'reset'
      }
    }

    this.trigger('transitionEnd')

    if (runCallback && activeIndex !== prevIndex) {
      if (dir === 'reset') {
        this.trigger('itemResetTransitionEnd')
        return
      }
      this.trigger('itemChangeTransitionEnd')
      if (dir === 'next') {
        this.trigger('itemNextTransitionEnd')
      } else {
        this.trigger('itemPrevTransitionEnd')
      }
    }
  }

  setTransition(duration) {
    setStyle({ transitionDuration: `${duration}ms` }, this.$inner)
    this.trigger('setTransition', duration)
  }

  setTranslate(translate) {
    const x = translate
    const y = 0

    setStyle(
      { transform: `translateX(${x}px) translateY(${y}px) translateZ(0)` },
      this.$inner
    )
    this.prevTranslate = this.translate
    this.translate = x

    let newProgress
    const translateDiff = this.maxTranslate() - this.minTranslate()
    if (translateDiff === 0) {
      newProgress = 0
    } else {
      newProgress = (translate - this.minTranslate()) / translateDiff
    }

    if (newProgress !== this.progress) {
      this.updateProgress(translate)
    }

    this.trigger('setTranslate', this.translate)
  }

  getTranslate() {
    const transform = getStyle('transform', this.$inner)
    if (transform === 'none') {
      return 0
    }

    return Number(transform.split(',')[4])
  }

  minTranslate() {
    return -this.snapGrid[0]
  }

  maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1]
  }

  getItems() {
    let items = children(`.${this.classes.ITEM}`, this.$inner)

    if (items.length === 0) {
      items = queryAll(this.options.itemSelector, this.element)
      items.forEach(item => {
        addClass(this.classes.ITEM, item)
      })
    }

    return items
  }

  resize() {
    this.updateSize()
    this.updateItem()
    this.updateItemsClass()

    if (this.options.itemNums > 1 && this.is('end') && !this.options.center) {
      this.moveTo(this.items.length - 1, 0, false)
    } else {
      this.moveTo(this.activeIndex, 0, false)
    }

    if (!this.is('disabled')) {
      this.trigger(EVENTS.RESIZE)
    }
  }

  bind() {
    if (this.options.arrows) {
      this.$arrows.options.onNext = () => {
        if (this.is('last') && !this.options.loop) {
          return
        }
        this.next()
      }

      this.$arrows.options.onPrev = () => {
        if (this.is('first') && !this.options.loop) {
          return
        }
        this.prev()
      }

      bindEvent(
        this.selfEventName('toEdge'),
        () => {
          this.updateArrows()
        },
        this.element
      )

      bindEvent(
        this.selfEventName('fromEdge'),
        () => {
          this.updateArrows()
        },
        this.element
      )
    }

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
            index *= this.itemNums
          }
          if (this.options.loop && !this.options.multiple) {
            index += this.loopedItemsLength
          }

          this.moveTo(index)
        },
        this.element
      )

      bindEvent(
        this.selfEventName('activeIndexChange'),
        () => {
          if (this.options.loop && !this.options.multiple) {
            this.updatePagination()
          } else if (typeof this.snapIndex === 'undefined') {
            this.updatePagination()
          }
        },
        this.element
      )

      bindEvent(
        this.selfEventName('snapIndexChange'),
        () => {
          if (!this.options.loop) {
            this.updatePagination()
          }
        },
        this.element
      )
    }

    if (this.options.swipeable && !this.$swipeable.is('bind')) {
      this.$swipeable.bind()
    }
  }

  createEl(name, options) {
    return templateEngine.compile(this.options.templates[name]())(options)
  }

  normalize(value) {
    if (value < 0) {
      return -Math.floor(Math.abs(value))
    }
    return Math.floor(value)
  }

  unbind() {
    if (this.options.swipeable) {
      this.$swipeable.unbind()
    }

    removeEvent(this.eventName(), this.element)
  }

  enable() {
    if (this.is('disabled')) {
      if (this.options.swipeable) {
        this.$swipeable.enable()
      }
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      if (this.options.swipeable) {
        this.$swipeable.disable()
      }
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
