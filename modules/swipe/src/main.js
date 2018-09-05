import anime from 'animejs'
import Component from '@pluginjs/component'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  append,
  wrap,
  closest,
  find,
  parent,
  parentWith,
  queryAll
} from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import templateEngine from '@pluginjs/template'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

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

    if (this.options.advanced.getItemInstances) {
      this.getItemInstances = this.options.advanced.getItemInstances.bind(this)
    }

    if (this.options.advanced.computeItemLocation) {
      this.computeItemLocation = this.options.advanced.computeItemLocation.bind(
        this
      )
    }

    if (this.options.advanced.computeWidthResize) {
      this.computeWidthResize = this.options.advanced.computeWidthResize.bind(
        this
      )
    }

    addClass(this.classes.NAMESPACE, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    // wrap width
    this.width = parseFloat(getStyle('width', this.element), 10)

    this.itemNums = this.options.itemNums
    this.gutter = this.options.gutter
    this.active = 0

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.build()
    if (this.options.drag) {
      this.initSwipeable()
    }
    this.bind()

    this.active =
      this.options.defaultActive > this.maxActiveCount
        ? this.maxActiveCount
        : this.options.defaultActive

    this.move(this.itemInstances[this.active].info.x, { trigger: false })

    if (!this.options.group) {
      addClass(
        `${this.classes.ACTIVE}`,
        this.itemInstances[this.active || 0].$el
      )
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  build() {
    this.buildWrapper()

    this.items = this.getItems()

    this.buildContainer()

    this.itemInstances = this.getItemInstances(this.items)

    this.computeItemLocation(this.itemInstances)

    this.sortedItems = this.getItemsBySort()

    this.maxActiveCount = this.getMaxActiveCount()

    if (this.options.arrows) {
      this.buildArrows()
    }

    if (this.options.pagination) {
      this.buildPagination()
    }
  }

  buildWrapper() {
    this.wrapper = closest(`.${this.classes.WRAPPER}`, this.element)
    if (!this.wrapper) {
      if (this.options.wrapperSelector) {
        addClass(
          this.classes.WRAPPER,
          closest(this.options.wrapperSelector, this.element)
        )
      } else {
        wrap(`<div class="${this.classes.WRAPPER}"></div>`, this.element)
      }
      this.wrapper = parentWith(hasClass(this.classes.WRAPPER), this.element)
    }
  }

  getItems() {
    let items = queryAll(`.${this.classes.ITEM}`, this.element)
    if (items.length === 0) {
      items = queryAll(this.options.itemSelector, this.element)
      items.forEach(item => {
        addClass(this.classes.ITEM, item)
      })
    }

    return items
  }

  buildContainer() {
    this.container = find(`.${this.classes.CONTAINER}`, this.element)

    if (!this.container) {
      if (this.options.containerSelector) {
        this.container = find(this.options.containerSelector, this.element)
        addClass(this.classes.CONTAINER, this.$container)
      } else {
        const itemsParent = parent(this.items[0])
        const container = this.createEl('container', {
          classes: this.classes
        })
        append(container, itemsParent)
        this.container = find(`.${this.classes.CONTAINER}`, this.element)
        this.items.forEach(item => {
          append(item, this.container)
        })
      }
    }
  }

  getItemInstances(items) {
    const itemWidth = this.getItemWidth()
    const itemHeight = '100%'

    const itemInstances = []

    items.forEach((item, index) => {
      const instanced = new Item(item)

      instanced.index = index
      instanced.setInfo({
        width: itemWidth,
        height: itemHeight
      })
      itemInstances.push(instanced)
    })

    return itemInstances
  }

  getItemWidth() {
    return (
      (parseFloat(getStyle('width', this.element)) -
        this.gutter * (this.itemNums - 1)) /
      this.itemNums
    )
  }

  computeItemLocation(itemInstances) {
    let width = 0

    itemInstances.forEach((item, index) => {
      const $item = item.el
      const info = item.info

      const config = {
        x: width,
        y: 0
      }

      if (this.options.multiple) {
        config.height =
          (parseFloat(getStyle('height', this.container), 10) - this.gutter) / 2

        if (index % 2) {
          config.x = itemInstances[index - 1].info.x
          config.y = config.height + this.gutter
        }
      }

      item.setInfo(config)

      setStyle(
        {
          width: `${item.info.width}px`,
          height: '100%',
          transform: `translate3d(${config.x}px, ${config.y}px, 0)`
        },
        $item
      )

      if (this.options.multiple) {
        setStyle(
          {
            height: `${item.info.height}px`
          },
          $item
        )
        if (!(index % 2)) {
          width += itemInstances[index - 1]
            ? itemInstances[index - 1].info.width + this.gutter
            : item.info.width + this.gutter
        }
      } else {
        width += info.width + this.gutter
      }
    })

    width -= this.gutter

    this.setWidth(width)
  }

  setWidth(width) {
    setStyle('width', width, this.container)

    this.containerWidth = width
  }

  getItemsBySort() {
    const itemInstancesClone = [].concat(this.itemInstances)
    const tempArr = []
    let offsetX

    itemInstancesClone.sort((prev, next) => prev.info.x - next.info.x)
    itemInstancesClone.forEach(item => {
      if (Math.floor(item.info.x) !== offsetX) {
        tempArr.push(item)
        offsetX = Math.floor(item.info.x)
      }
    })

    return tempArr
  }

  getMaxActiveCount() {
    if (this.options.group) {
      return Math.ceil(this.sortedItems.length / this.options.itemNums)
    }

    if (this.options.center) {
      return this.sortedItems.length
    }

    const maxWidth = this.containerWidth - this.width

    if (maxWidth <= 0) {
      return 1
    }

    let dotNum = 0
    let targetItem = this.sortedItems[0]

    for (const item of this.sortedItems) {
      if (item.info.x >= maxWidth) {
        break
      }

      dotNum++
      targetItem = item
    }

    if (Math.floor(targetItem.info.x) < Math.floor(maxWidth)) {
      dotNum += 1
    }

    return Math.max(1, dotNum)
  }

  buildPagination() {
    const that = this
    const pagination = this.createEl('pagination', {
      classes: this.classes
    })
    const items = []

    for (let index = 0; index < this.maxActiveCount; index++) {
      items.push({ index })
    }

    let config = {
      items,
      valueFrom: 'data-href',
      default: `${this.active}`,
      template: {
        item(css) {
          return `<li class="${css} ${
            that.classes.PAGINATIONITEM
          }" data-href="{index}"><a>{index}</a></li>`
        }
      }
    }

    append(pagination, this.wrapper)

    config = Object.assign({}, config, this.options.dotConfig)

    this.pagination = Dots.of(
      find(`.${this.classes.PAGINATION}`, this.wrapper),
      config
    )
  }

  decay(distance) {
    if (distance > 0) {
      this.prev()
    } else {
      this.next()
    }
  }

  initSwipeable() {
    const that = this

    const setIndex = index => {
      if (this.swipeable.info.deltaX > 0) {
        index -= 1
        if (index < 0) {
          index = that.options.loop ? that.maxActiveCount : 0
        }
      } else {
        index += 1
        if (index > that.maxActiveCount - 1) {
          index = that.options.loop ? 0 : that.maxActiveCount
        }
      }
      that.moveTo(index)
    }

    this.swipeable = Swipeable.of(this.container, {
      container: that.element,
      decay: that.options.decay,
      power: that.options.power,
      duration: that.options.duration,
      onStart() {
        if (that.anime) {
          that.anime.pause()
        }
        that.trigger(EVENTS.DRAGSTART)
      },
      onMove() {
        let posX = this.startPosition.x + this.info.deltaX
        const scrollMax = this.containerWidth - this.width

        if (posX > 0) {
          posX = Math.round(posX / 5)
        } else if (posX < this.containerWidth - this.width) {
          posX = Math.round(scrollMax + (posX - scrollMax) / 5)
        }

        setStyle(
          {
            transform: `translateX(${posX}px)`
          },
          this.element
        )
        this.position = { x: posX, y: 0 }
      },
      onEnd() {
        if (that.is('disable')) {
          return
        }

        if (this.is('decaying')) {
          return
        }

        const decayX = this.info.velocityX
        const locationX = this.getLocation(this.element).x
        const index = that.getIndexByDistance(locationX)

        if (Math.abs(decayX) < 1) {
          that.moveTo(index)
        } else if (Math.abs(this.info.deltaX) < 200) {
          const offset = this.info.deltaX
          that.decay(offset)
        } else {
          setIndex(index)
        }
        this.trigger(EVENTS.DRAGEND)
      },
      onDecayend() {
        const locationX = this.getLocation(this.element).x
        const index = that.getIndexByDistance(locationX)
        if (that.$anime) {
          that.$anime.pause()
        }
        setIndex(index)
      }
    })
  }

  computeWidthResize() {
    this.itemInstances.forEach(item => {
      const itemWidth = this.getItemWidth()

      item.setInfo({ width: itemWidth })
    })

    this.computeItemLocation(this.itemInstances)

    this.width = parseFloat(getStyle('width', this.element), 10)

    setTimeout(() => {
      this.moveTo(this.active)
    }, 0)
  }

  buildArrows() {
    let opts = {
      type: this.options.arrowConfig.type || 'square'
    }

    opts = Object.assign({}, opts, this.options.arrowConfig)
    this.arrows = Arrows.of(this.element, opts)
    Arrows.of(this.element, opts)
  }

  resize() {
    if (!this.options.advanced.computeWidthResize) {
      this.computeWidthResize()
    } else {
      this.options.advanced.computeWidthResize.bind(this)()
    }
    this.trigger(EVENTS.RESIZE)
  }

  bind() {
    if (this.options.arrows) {
      this.arrows.options.onNext = () => {
        this.next()
      }

      this.arrows.options.onPrev = () => {
        this.prev()
      }
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
          const index = this.pagination.dots.indexOf($item)
          this.moveTo(index)
        },
        this.wrapper
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.wrapper)
  }

  next() {
    const step = 1
    const minIndex = this.options.loop ? 0 : this.active

    const active =
      this.active >= this.maxActiveCount - 1 ? minIndex : this.active + step

    this.moveTo(active, () => this.trigger(EVENTS.NEXT))
  }

  prev() {
    const step = 1
    const maxIndex = this.options.loop ? this.maxActiveCount - 1 : 0

    const active = this.active - step >= 0 ? this.active - step : maxIndex

    this.moveTo(active, () => this.trigger(EVENTS.PREV))
  }

  move(distance, details) {
    let { trigger, ease } = details
    const { callback } = details

    trigger = trigger || false
    ease = ease || 'linear'
    const duration = this.options.decay
      ? this.options.duration + 100
      : this.options.duration

    if (
      this.options.center &&
      !this.options.group &&
      this.options.itemNums > 1
    ) {
      const activeItemWidth = this.sortedItems[this.active].info.width
      distance -= (this.width - activeItemWidth) / 2
    }

    this.anime = anime({
      targets: this.container,
      translateX: -distance,
      easing: ease,
      duration
    })

    setTimeout(() => {
      if (callback) {
        callback()
      }

      if (trigger) {
        this.trigger(EVENTS.MOVEEND, this.active)
      }
    }, duration)
  }

  moveTo(index, callback) {
    let distance = 0
    if (index >= this.maxActiveCount) {
      index = this.maxActiveCount - 1
    }

    this.active = index

    if (this.options.group) {
      distance =
        Math.max(
          0,
          Math.min(
            this.sortedItems[index].info.x,
            this.containerWidth - this.width
          )
        ) * this.options.itemNums
    } else {
      distance = this.sortedItems[index].info.x
    }

    if (
      index === this.maxActiveCount - 1 &&
      index !== 0 &&
      !this.options.center
    ) {
      distance = this.containerWidth - this.width
    }

    if (this.options.pagination) {
      this.pagination.set(`${this.active}`)
    }

    if (!this.options.group) {
      this.itemInstances.forEach((item, index) => {
        const $item = item.$el
        removeClass(this.classes.ACTIVE, $item)
        if (index === this.active) {
          addClass(this.classes.ACTIVE, $item)
        }
      })
    }

    this.move(distance, {
      trigger: true,
      ease: this.options.decay ? 'easeOutQuad' : 'linear',
      callback
    })
  }

  getIndexByDistance(distance) {
    distance = -distance
    let min = 0
    let max = this.containerWidth - this.width
    let add = 0

    if (this.options.center) {
      add = (this.width - this.itemInstances[this.active].info.width) / 2

      min += add
      max += add
    }

    if (distance <= -min) {
      return 0
    }

    if (distance >= max) {
      return this.maxActiveCount - 1
    }

    if (this.options.group && !this.options.center) {
      let index = 0
      const tempWidth = this.width
      const maybeIndex = Math.ceil(distance / this.width)

      index =
        distance - (maybeIndex - 1) * tempWidth > tempWidth / 2
          ? maybeIndex
          : maybeIndex - 1
      return Math.max(0, Math.min(index, this.maxActiveCount))
    }

    const tempArr = [].concat(this.sortedItems)
    let offsetX
    let index

    for (let i = 0; i < tempArr.length; i++) {
      const item = tempArr[i]
      const tempCount = Math.abs(item.info.x - distance - add)
      if (i === 0) {
        offsetX = tempCount
        index = 0
        continue
      }

      if (tempCount < offsetX) {
        offsetX = tempCount
        index = i
      }
    }

    return index
  }

  createEl(name, opts) {
    return templateEngine.compile(this.options.templates[name]())(opts)
  }

  setPagination(num, active = this.active) {
    const items = []
    this.pagination.empty()

    for (let index = 0; index < num; index++) {
      items.push({ index })
    }

    this.pagination.load(items, true)

    if (active >= items.length) {
      active = items.length - 1
    }

    this.pagination.set(`${active}`)
    this.moveTo(active)
  }

  setHeight(height, transition = false) {
    const config = { height: `${height}px` }

    if (transition) {
      config.transition = `height ${this.options.duration}ms`
    }

    setStyle(config, this.container)
  }

  getLocationX(el) {
    const transform = getStyle('transform', el)
    if (transform === 'none') {
      return 0
    }

    return parseInt(transform.split(',')[4], 10)
  }

  getDots() {
    if (this.options.group) {
      return this.maxActiveCount
    }

    let dotNum = 0
    const maxWidth = this.containerWidth - this.width

    for (const item of this.sortedItems) {
      if (item.info.x >= maxWidth) {
        break
      }

      dotNum++
    }

    return dotNum
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
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Swipe
