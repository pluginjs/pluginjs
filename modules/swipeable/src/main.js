import Component from '@pluginjs/component'
import Hammer from 'hammerjs'
import Anime from 'animejs'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, outerWidth, outerHeight } from '@pluginjs/styled'
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Swipeable extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    this.power = this.options.power

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.position = { x: 0, y: 0 }
    this.startPosition = { x: 0, y: 0 }

    this.container = this.getContainer()
    addClass(this.classes.NAMESPACE, this.element)
    addClass(this.classes.CONTAINER, this.container)

    if (this.options.axis === 'y') {
      addClass(this.classes.VERTICAL, this.container)
    }

    this.getSize()

    this.hammer = new Hammer(this.element)
    this.hammer.get('pan').set({
      direction:
        this.options.axis === 'y'
          ? Hammer.DIRECTION_VERTICAL
          : Hammer.DIRECTION_HORIZONTAL
    })

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  getSize() {
    this.containerWidth = parseInt(outerWidth(this.container), 10)
    this.containerHeight = parseInt(outerHeight(this.container), 10)
    this.width = parseInt(outerWidth(this.element), 10)
    this.height = parseInt(outerHeight(this.element), 10)
    this.distance = this.getDistance()
  }

  bind() {
    this.hammer.on('panstart panmove panend', e => {
      if (this.is('disabled')) {
        return
      }

      this.setInfo(e)

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
          break
      }
    })

    this.enter('bind')
  }

  unbind() {
    if (!this.is('bind')) {
      return
    }

    this.hammer.off('panstart panmove panend')
    this.leave('bind')
  }

  panStart() {
    if (this.is('decaying')) {
      this.leave('decaying')
      this.anime.pause()
    }

    this.enter('paning')
    addClass('is-dragging', this.element)

    this.startPosition = this.getLocation(this.element)
    this.trigger(EVENTS.START)
  }

  panMove(e) {
    const posX = this.options.axis === 'x' ? this.startPosition.x + e.deltaX : 0
    const posY = this.options.axis === 'y' ? this.startPosition.y + e.deltaY : 0

    setStyle(
      {
        transform: `translateX(${posX}px) translateY(${posY}px)`
      },
      this.element
    )

    this.position = { x: posX, y: posY }
    this.trigger(EVENTS.MOVE)
  }

  panEnd(e) {
    const decayX = this.options.axis === 'y' ? 0 : e.velocityX
    const decayY = this.options.axis === 'x' ? 0 : e.velocityY

    if (
      (this.options.axis === 'x' && Math.abs(decayX) < 1) ||
      (this.options.axis === 'y' && Math.abs(decayY) < 1)
    ) {
      this.trigger(EVENTS.SNAIL)
    } else {
      this.trigger(EVENTS.DECAY)
    }

    if (this.options.decay) {
      this.decay(e, this.element)
    }

    if (this.options.rebound && !this.is('decaying')) {
      this.rebound(this.element)
    }

    removeClass('is-dragging', this.element)

    setTimeout(() => {
      this.leave('paning')
    }, 0)
    this.trigger(EVENTS.END)
  }

  decay(e, target) {
    const decayX = this.options.axis === 'y' ? 0 : e.velocityX
    const decayY = this.options.axis === 'x' ? 0 : e.velocityY
    const that = this

    if (
      (this.options.axis === 'x' && Math.abs(decayX) < 1) ||
      (this.options.axis === 'y' && Math.abs(decayY) < 1)
    ) {
      return
    }

    const opts = {
      targets: target,
      translateX: this.position.x + this.getMoveSize(decayX),
      translateY: this.position.y + this.getMoveSize(decayY),
      duration: this.options.duration,
      easing: 'easeOutSine',
      update() {
        if (that.options.rebound) {
          that.rebound(that.element, true)
        }
      },
      complete() {
        that.position = that.getLocation(target)
        that.leave('decaying')
        that.trigger(EVENTS.DECAYEND)
      }
    }

    this.enter('decaying')
    this.anime = Anime(opts)
  }

  rebound(target, pause = false) {
    const minDistance = this.distance.minDistance
    const maxDistance = this.distance.maxDistance
    const distance = this.getLocation(target)[this.options.axis]
    const callback = () => {
      this.trigger(EVENTS.REBOUNDEND)
    }

    if ((distance >= minDistance || distance < -maxDistance) && pause) {
      this.anime.pause()
    }

    if (distance >= minDistance) {
      this.triggerAnime(target, minDistance, callback)
    } else if (distance < -maxDistance) {
      this.triggerAnime(target, -maxDistance, callback)
    }

    this.trigger(EVENTS.REBOUND)
  }

  triggerAnime(target, distance, callback) {
    const that = this
    const opts = {
      targets: target,
      duration: this.options.duration,
      easing: 'easeOutExpo',
      complete() {
        that.position = that.getLocation(target)
        if (callback) {
          callback()
        }
      }
    }

    opts[this.options.axis === 'y' ? 'translateY' : 'translateX'] = distance

    Anime(opts)
  }

  getDistance() {
    let minDistance = 0
    let maxDistance = 0
    let addDistance = 0
    const percent = this.options.reboundPos / 100

    const distance = this.options.axis === 'x' ? this.width : this.height
    const conatinerDistance =
      this.options.axis === 'x' ? this.containerWidth : this.containerHeight
    const min = Math.min(distance, conatinerDistance)

    maxDistance = distance - conatinerDistance
    addDistance = min - min * percent - this.options.offset

    maxDistance = maxDistance < 0 ? 0 : maxDistance

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

  getLocation(target) {
    const translateX = parseInt(Anime.getValue(target, 'translateX'), 10)
    const translateY = parseInt(Anime.getValue(target, 'translateY'), 10)

    return { x: translateX, y: translateY }
  }

  getContainer() {
    let container = this.options.container

    if (container) {
      container =
        container instanceof HTMLElement
          ? container
          : document.querySelector(container)
    } else {
      container = this.element.parentNode
    }

    return container
  }

  setInfo(e) {
    this.info = {
      pointer: e.center,
      deltaTime: e.deltaTime,
      deltaX: e.deltaX,
      deltaY: e.deltaY,
      type: e.type,
      velocityX: e.velocityX,
      velocityY: e.velocityY
    }
  }

  back() {
    this.triggerAnime(this.element, this.startPosition[this.options.axis])
  }

  resize() {
    this.getSize()
    this.trigger(EVENTS.RESIZE)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
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
