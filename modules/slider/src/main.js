import Component from '@pluginjs/component'
import Hammer from 'hammerjs'
import { range, deepMerge, compose } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import { action, processor } from './decorators'
import Arrows from '@pluginjs/arrows'
import Dots from '@pluginjs/dots'
import { cube, linear, fade } from './animate'

@translateable(TRANSLATIONS)
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
class Slider extends Component {
  state = true
  current = 0

  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)
    this.sliderBox = this.element.querySelector(`.${this.classes.BOX}`)
    this.sliderCards = this.element.querySelectorAll(`.${this.classes.CARD}`)
    this.itemSelector = this.classes.ITEM
    this.initStates()
    this.initialize()
    this.setupI18n()
    this.defaultLocation = this.initLocation()
    this.location = this.defaultLocation
  }

  initialize() {
    addClass(this.classes.CONTAINER, this.element)
    addClass(this.classes.ACTIVE, this.sliderCards[0])
    const element = this.element.querySelector(`.${this.classes.BOX}`)
    const touchEvent = Hammer(element)
    if (this.options.direction === 'vertical') {
      compose(addClass(this.classes.VERTICAL))(this.element)
      touchEvent.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL })
      touchEvent
        .on('swipedown', () => {
          this.prevTimeout()
        })
        .on('swipeup', () => {
          this.nextTimeout()
        })
    } else {
      compose(addClass(this.classes.HORIZONTAL))(this.element)
      touchEvent
        .on('swiperight', () => {
          this.prevTimeout()
        })
        .on('swipeleft', () => {
          this.nextTimeout()
        })
    }
    this.bind()
    this.initializeArrows()
    this.initializeDots()
    this.setAnimation(this.options.animation)
    if (this.options.autoplay) {
      this.autoPlay()
    }
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initializeArrows() {
    if (this.options.arrows) {
      const nSpace = this.options.arrowNameSpace
        ? this.options.arrowNameSpace
        : 'pj-arrow'
      const opts = Object.assign({}, this.options, {
        classes: {
          NAMESPACE: nSpace
        }
      })
      this._arrows = Arrows.of(this.element, opts)
      compose(
        bindEvent({
          type: 'arrows:next',
          handler: () => {
            this.nextTimeout()
          }
        }),
        bindEvent({
          type: 'arrows:prev',
          handler: () => {
            this.prevTimeout()
          }
        })
      )(this._arrows.element)
    }
  }

  initializeDots() {
    if (this.options.dots) {
      const nSpace = this.options.dotNameSpace
        ? this.options.dotNameSpace
        : 'pj-dot'
      const opts = Object.assign({}, this.options, {
        classes: {
          NAMESPACE: nSpace
        }
      })
      this._dots = Dots.of(this.element.querySelector(`.${nSpace}s`), {
        ...opts,
        direction: 'horizontal'
      })
      const container = [...this._dots.element.children]
      bindEvent(
        {
          type: 'dots:change',
          handler: () => {
            if (this.state === true) {
              const time = this._animation === 'cube' ? '600' : '200'
              this.state = false
              const activeItem = this._dots.element.querySelector(
                `.${nSpace}-active`
              )
              const key = container.indexOf(activeItem)
              this.current = key
              this.autoPlay()
              this.setActive(key)
              this.setSpecPage(key)
              setTimeout(() => {
                this.state = true
                this.autoPlay()
              }, time)
            } else {
              return
            }
          }
        },
        this._dots.element
      )
    }
  }

  _interval = {
    status: false,
    createTimer: time =>
      window.setInterval(() => {
        if (this.state === true) {
          const t = this._animation === 'cube' ? '600' : '200'
          this.state = false
          this.goNext()
          setTimeout(() => {
            this.state = true
          }, t)
        } else {
          return
        }
      }, time),
    removeTimer: () => window.clearInterval(this.timer)
  }

  get timer() {
    return this._interval.timer
  }

  get interval() {
    return this._interval.status
  }

  set interval(toggler) {
    if (toggler) {
      this._interval.status = true
      this.intervalTime = this.options.playcycle
    } else {
      this._interval.status = false
      this._interval.removeTimer()
    }
  }

  set intervalTime(time) {
    if (this._interval.timer) {
      this._interval.removeTimer()
    }
    if (!this.interval) {
      this._interval.status = true
    }
    const timer = this._interval.createTimer(time)
    this._interval.timer = timer
  }

  get distance() {
    const { direction } = this.options
    const { clientWidth: width, clientHeight: height } = this.sliderBox
    return direction === 'horizontal' ? width : height
  }

  get location() {
    return this._location
  }

  set location(nextLocation) {
    this._location = nextLocation
    for (const { key, ...rest } of nextLocation) {
      const itemStyle = this.sliderBox.children[key].style
      itemStyle.cssText = ''
      for (const [k, v] of Object.entries(rest).filter(
        ([k]) => k !== 'active'
      )) {
        itemStyle[k] = v
      }
    }
  }

  get animation() {
    switch (this._animation) {
      case 'cube':
        return cube(this.options.direction, this.distance)
      case 'fade':
        return fade
      case 'linear':
        return linear(this.options.direction, this.distance)
      default:
        return linear(this.options.direction, this.distance)
    }
  }

  set animation(name) {
    this._animation = name
  }

  computeSliderLocation(current, originalLocation = this.location) {
    const len = originalLocation.length
    const prev = current === len - 1 ? 0 : current + 1
    const next = current === 0 ? len - 1 : current - 1
    const animation = this.animation

    return originalLocation.map((v, k) => {
      switch (k) {
        case prev:
          return {
            key: v.key,
            active: false,
            ...animation.prev
          }
        case current:
          return {
            key: v.key,
            active: true,
            ...animation.current
          }
        case next:
          return {
            key: v.key,
            active: false,
            ...animation.next
          }
        default:
          if (k < current) {
            return {
              key: v.key,
              active: false,
              ...animation.next
            }
          } else if (k > current) {
            return {
              key: v.key,
              active: false,
              ...animation.prev
            }
          }
          return null
      }
    })
  }

  @action
  switchSpecKey(key) {
    const nextLocation = this.computeSliderLocation(key)
    return {
      type: 'LOCATE',
      location: nextLocation
    }
  }

  @action
  initLocation(current) {
    const originalLocation = range(this.sliderBox.children.length).map(key => ({
      key,
      active: false
    }))
    const location = this.computeSliderLocation(current || 0, originalLocation)
    return {
      type: 'INIT',
      location
    }
  }

  @action
  moveLocationtoNext() {
    const len = this.location.length
    this.current = this.current === len - 1 ? 0 : this.current + 1
    const nextLocation = this.computeSliderLocation(this.current)
    return {
      type: 'NEXT',
      location: nextLocation
    }
  }

  @action
  moveLocationtoPrev() {
    const len = this.location.length
    this.current = this.current === 0 ? len - 1 : this.current - 1
    const prevLocation = this.computeSliderLocation(this.current)
    return {
      type: 'PREV',
      location: prevLocation
    }
  }

  @processor
  processor(action, defaultLocation = this.defaultLocation) {
    if (action.type !== 'INIT') {
      if (this._animation === 'cube') {
        this.sliderBox.style.overflow = 'visible'
      } else {
        this.sliderBox.style.overflow = 'hidden'
      }
    }
    switch (action.type) {
      case 'NEXT':
        return action.location
      case 'PREV':
        return action.location
      case 'INIT':
        return action.location
      case 'LOCATE':
        return action.location
      default:
        return defaultLocation
    }
  }

  goPrev() {
    const location = this.moveLocationtoPrev()
    const key = location.filter(item => Boolean(item.active))[0].key
    if (this.options.dots) {
      const children = this._dots.element.children
      const element = children[key]
      this._dots.setActiveItem(element)
    }
    this.setActive(key)
    this.location = location
  }

  goNext() {
    const location = this.moveLocationtoNext()
    const key = location.filter(item => Boolean(item.active))[0].key
    if (this.options.dots) {
      const children = this._dots.element.children
      const element = children[key]
      this._dots.setActiveItem(element)
    }
    this.setActive(key)
    this.location = location
  }

  setActive(key) {
    const cards = Array.prototype.slice.call(this.sliderCards)
    const element = cards[key]
    const active = this.classes.ACTIVE
    cards.forEach(card => {
      removeClass(active, card)
    })
    addClass(active, element)
  }

  autoPlay() {
    if (!this.interval) {
      this.interval = true
    } else {
      this.interval = false
    }
  }

  setAnimation(v) {
    this.animation = v
    this.initLocation(this.current).forEach((v, k) => {
      setStyle(v, this.sliderBox.children[k])
    })
  }

  setAutoPlayCycle(v) {
    this.options.playcycle = v
    this.intervalTime = v
  }

  setSpecPage(v) {
    const location = this.switchSpecKey(v)
    this.location = location
  }

  prevTimeout() {
    if (this.state === true) {
      const time = this._animation === 'cube' ? '600' : '200'
      this.state = false
      this.autoPlay()
      this.goPrev()
      setTimeout(() => {
        this.state = true
        this.autoPlay()
      }, time)
    } else {
      return
    }
  }

  nextTimeout() {
    if (this.state === true) {
      const time = this._animation === 'cube' ? '600' : '200'
      this.state = false
      this.autoPlay()
      this.goNext()
      setTimeout(() => {
        this.state = true
        this.autoPlay()
      }, time)
    } else {
      return
    }
  }

  tooltipTranslate() {
    const nSpace = this.options.arrowNameSpace
      ? this.options.arrowNameSpace
      : 'pj-arrow'
    this.element
      .querySelector(`.${nSpace}-prev`)
      .setAttribute('data-original-title', this.translate('prev'))
    this.element
      .querySelector(`.${nSpace}-next`)
      .setAttribute('data-original-title', this.translate('next'))
  }

  bind() {
    // compose(
    //   bindEvent({
    //     type: this.eventName('touch'),
    //     identity: this.itemSelector,
    //     handler: () => {
    //       if (!this.is('disabled')) {
    //         this.goNext()
    //       }
    //     }
    //   }),
    //   bindEvent({
    //     type: this.eventName('click'),
    //     identity: this.itemSelector,
    //     handler: () => {
    //       if (!this.is('disabled')) {
    //         this.goNext()
    //       }
    //     }
    //   })
    // )(this.element)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.element.disable = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
      this.element.disable = true
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.direction === 'vertical') {
        removeClass(this.classes.VERTICAL, this.element)
      } else {
        removeClass(this.classes.HORIZONTAL, this.element)
      }

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      if (this.is('hidden')) {
        removeClass(this.classes.HIDDEN, this.element)
      }

      if (this.is('disabled')) {
        removeClass(this.classes.DISABLED, this.element)
        this.element.disable = false
      }

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  show() {
    if (this.is('hidden')) {
      removeClass(this.classes.HIDDEN, this.element)
      this.leave('hidden')
    }
    this.trigger(EVENTS.SHOW)
  }

  hide() {
    if (!this.is('hidden')) {
      addClass(this.classes.HIDDEN, this.element)
      this.enter('hidden')
    }
    this.trigger(EVENTS.HIDE)
  }
}

export default Slider
