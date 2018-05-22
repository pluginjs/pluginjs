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
  arrows = true
  dots = true
  state = true

  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)
    this.itemSelector = this.classes.ITEM
    this.initStates()
    this.initialize()
    this.setupI18n()
    this.defaultLocation = this.initLocation()
    this.location = this.defaultLocation
    this.tooltipTranslate()
  }

  sliderBox = this.element.querySelector('.pj-slider-box')

  sliderCards = this.element.querySelectorAll('.pj-slider-card')

  animation = 'linear'

  current = 0

  _interval = {
    status: false,
    createTimer: time =>
      window.setInterval(() => {
        if (this.state == true) {
          this.state = false
          this.goNext()
          setTimeout(() => {
            this.state = true
          }, 500)
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
      this.intervalTime = 1500
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
      if (this._animation == 'cube') {
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
    const children = this._dots.element.children
    const element = children[key]
    this.setActive(key)
    this._dots.setActiveItem(element)
    this.location = location
  }

  goNext() {
    const location = this.moveLocationtoNext()
    const key = location.filter(item => Boolean(item.active))[0].key
    const children = this._dots.element.children
    const element = children[key]
    this.setActive(key)
    this._dots.setActiveItem(element)
    this.location = location
  }

  setActive(key) {
    const cards = Array.prototype.slice.call(this.sliderCards)
    const element = cards[key]
    const active = this.classes.ACTIVE
    cards.map(card => {
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
    this.initLocation(this.current).map((v, k) => {
      setStyle(v, this.sliderBox.children[k])
    })
  }

  setAutoPlayCycle(v) {
    this.intervalTime = v
  }

  setSpecPage(v) {
    const location = this.switchSpecKey(v)
    this.location = location
  }

  initialize() {
    addClass(this.classes.CONTAINER, this.element)
    addClass(this.classes.ACTIVE, this.sliderCards[0])
    const element = this.element.querySelector('.pj-slider-box')
    const touchEvent = Hammer(element)
    if (this.options.direction === 'vertical') {
      compose(addClass(this.classes.VERTICAL))(this.element)
      touchEvent.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL })
      touchEvent
        .on('swipedown', () => {
          if (this.state == true) {
            this.state = false
            this.goPrev()
            setTimeout(() => {
              this.state = true
            }, 500)
          } else {
            return
          }
        })
        .on('swipeup', () => {
          if (this.state == true) {
            this.state = false
            this.goNext()
            setTimeout(() => {
              this.state = true
            }, 500)
          } else {
            return
          }
        })
    } else {
      compose(addClass(this.classes.HORIZONTAL))(this.element)
      touchEvent
        .on('swiperight', () => {
          if (this.state == true) {
            this.state = false
            this.goPrev()
            setTimeout(() => {
              this.state = true
            }, 500)
          } else {
            return
          }
        })
        .on('swipeleft', () => {
          if (this.state == true) {
            this.state = false
            this.goNext()
            setTimeout(() => {
              this.state = true
            }, 500)
          } else {
            return
          }
        })
    }
    this.bind()
    this.initializeArrows()
    this.initializeDots()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initializeArrows() {
    this._arrows = Arrows.of(this.element, this.options)
    compose(
      bindEvent({
        type: 'arrows:next',
        handler: () => {
          if (this.state == true) {
            this.state = false
            this.goNext()
            setTimeout(() => {
              this.state = true
            }, 500)
          } else {
            return
          }
        }
      }),
      bindEvent({
        type: 'arrows:prev',
        handler: () => {
          if (this.state == true) {
            this.state = false
            this.goPrev()
            setTimeout(() => {
              this.state = true
            }, 500)
          } else {
            return
          }
        }
      })
    )(this._arrows.element)
  }

  initializeDots() {
    this._dots = Dots.of(this.element.querySelector('.pj-dots'), {
      ...this.options,
      direction: 'horizontal'
    })
    const container = [...this._dots.element.children]
    bindEvent(
      {
        type: 'dots:change',
        handler: () => {
          if (this.state == true) {
            this.state = false
            const activeItem = this._dots.element.querySelector(
              '.pj-dot-active'
            )
            const key = container.indexOf(activeItem)
            this.current = key
            this.setActive(key)
            this.setSpecPage(key)
            setTimeout(() => {
              this.state = true
            }, 400)
          } else {
            return
          }
        }
      },
      this._dots.element
    )
  }

  tooltipTranslate() {
    this.element
      .querySelector('.pj-arrow-prev')
      .setAttribute('data-original-title', this.translate('prev'))
    this.element
      .querySelector('.pj-arrow-next')
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
