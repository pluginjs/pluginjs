import Component from '@pluginjs/component'
import Hammer from 'hammerjs'
import Anime from 'animejs'
import { deepMerge } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  },
  INFO
)
class Swipeable extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.element =
      typeof element === 'string' ? document.querySelector(element) : element
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)

    addClass(this.classes.NAMESPACE, this.element)

    this.power = this.options.power

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.position = { x: 0, y: 0 }
    this.startPosition = { x: 0, y: 0 }
    this.getLocation(this.element)
    this.container = this.getContainer()
    addClass(this.classes.CONTAINER, this.container)
    if (this.options.axis === 'y') {
      addClass(this.classes.VERTICAL, this.container)
    }

    this.getSize()
    this.isEnabled = true

    this.$drag = new Hammer(this.element)
    if (this.options.axis === 'x') {
      this.$drag.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL })
    } else if (this.options.axis === 'y') {
      this.$drag.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL })
    }

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  resize() {
    this.getSize()
    this.trigger(EVENTS.RESIZE)
  }

  bind() {
    this.$drag.on('panstart panmove panend', e => {
      switch (e.type) {
        case 'panstart':
          this.panStart()
          break
        case 'panmove':
          this.panMove(e)
          break
        case 'panend':
          this.panEnd(e)
          break
        default:
          return
      }
    })
  }

  getSize() {
    this.containerWidth = parseInt(getStyle('width', this.container), 10)
    this.containerHeight = parseInt(getStyle('height', this.container), 10)
    this.width = parseInt(getStyle('width', this.element), 10)
    this.height = parseInt(getStyle('height', this.element), 10)
  }

  panStart() {
    const $target = this.element
    if (!this.isEnabled) {
      return
    }
    if (this.isdecaying === true) {
      this.isdecaying = false
      this.anime.pause()
    }

    addClass('is-dragging', this.element)
    this.startPosition.x = this.getLocation($target).translateX
      ? this.getLocation($target).translateX
      : 0
    this.startPosition.y = this.getLocation($target).translateY
      ? this.getLocation($target).translateY
      : 0
    this.trigger(EVENTS.DRAGSTART)
  }

  panMove(e) {
    const $target = this.element
    if (!this.isEnabled) {
      return
    }

    let dragX = e.deltaX
    let dragY = e.deltaY
    dragX = this.options.axis === 'y' ? 0 : dragX
    dragY = this.options.axis === 'x' ? 0 : dragY

    this.position.x = this.startPosition.x + dragX
    this.position.y = this.startPosition.y + dragY

    setStyle(
      {
        transform: `
          translateX(${this.position.x}px) translateY(${this.position.y}px)
        `
      },
      $target
    )
    this.trigger(EVENTS.DRAGMOVE)
  }

  panEnd(e) {
    const $target = this.element
    if (!this.isEnabled) {
      return
    }
    if (this.options.decay) {
      this.decayMove(e, $target)
    }
    if (this.options.rebound) {
      this.reboundMove($target)
    }

    removeClass('is-dragging', this.element)
    this.trigger(EVENTS.DRAGEND)
  }

  decayMove(e, $target) {
    const that = this
    let decayX = e.velocityX
    let decayY = e.velocityY

    decayX = this.options.axis === 'y' ? 0 : decayX
    decayY = this.options.axis === 'x' ? 0 : decayY

    const moveX = this.position.x + this.getMoveSize(decayX)
    const moveY = this.position.y + this.getMoveSize(decayY)

    const minDistance = this.getDistance().minDistance
    const maxDistance = this.getDistance().maxDistance
    const opts = {
      targets: $target,
      translateX: [this.position.x, moveX],
      translateY: [this.position.y, moveY],
      duration: this.options.duration,
      easing: 'easeOutExpo',
      update() {
        if (that.options.rebound) {
          const distance =
            that.options.axis === 'x'
              ? that.getLocation($target).translateX
              : that.getLocation($target).translateY
          if (distance >= minDistance) {
            that.anime.pause()
            that.triggerAnime($target, minDistance)
          } else if (distance < -maxDistance) {
            that.anime.pause()
            that.triggerAnime($target, -maxDistance)
          }
        }
      },
      complete() {
        that.position.x = that.getLocation($target).translateX
        that.position.y = that.getLocation($target).translateY
        that.isdecaying = false
      }
    }
    this.isdecaying = true
    this.anime = Anime(opts)
  }

  triggerAnime(target, distance) {
    const that = this
    if (this.options.axis === 'x') {
      Anime({
        targets: target,
        translateX: distance,
        duration: that.options.duration,
        easing: 'easeOutExpo'
      })
    } else {
      Anime({
        targets: target,
        translateY: distance,
        duration: that.options.duration,
        easing: 'easeOutExpo'
      })
    }
  }

  reboundMove(target) {
    const minDistance = this.getDistance().minDistance
    const maxDistance = this.getDistance().maxDistance
    const distance =
      this.options.axis === 'x'
        ? this.getLocation(target).translateX
        : this.getLocation(target).translateY
    if (distance >= minDistance) {
      this.triggerAnime(target, minDistance)
    } else if (distance < -maxDistance) {
      this.triggerAnime(target, -maxDistance)
    }
  }

  getDistance() {
    let minDistance = 0
    let maxDistance
    let addDistance
    const percent = this.options.reboundPos / 100
    if (this.options.axis === 'x') {
      maxDistance = this.width - this.containerWidth
      addDistance =
        this.containerWidth -
        this.containerWidth * percent -
        this.options.offset
    } else {
      maxDistance = this.height - this.containerHeight
      addDistance =
        this.containerHeight -
        this.containerHeight * percent -
        this.options.offset
    }

    minDistance += addDistance
    maxDistance += addDistance
    return { minDistance, maxDistance }
  }

  getMoveSize(velocity) {
    let size = (Math.pow(velocity, 2) / 2) * (10 * this.power)
    if (velocity < 0) {
      size *= -1
    }
    return Math.round(size)
  }

  getLocation(ele) {
    const transform = getStyle('transform', ele)
    if (transform === 'none') {
      return 0
    }
    const matrixValues = transform.split(',')
    const xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4
    const translateX = parseInt(matrixValues[xIndex], 10)
    const translateY = parseInt(matrixValues[xIndex + 1], 10)
    return { translateX, translateY }
  }

  getContainer() {
    const container = this.options.container
    const isElement = container instanceof HTMLElement
    if (isElement) {
      return container
    }
    if (typeof container === 'string') {
      return document.querySelector(container)
    }
    return this.element.parentNode
  }

  unbind() {
    this.$drag.off('panstart panmove panend')
  }

  enable() {
    this.isEnabled = true
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
      this.isEnabled = false
      this.unbind()
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

export default Swipeable
