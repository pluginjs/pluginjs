import anime from 'animejs'
import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { deepMerge, compose } from '@pluginjs/utils'
import { outerWidth, outerHeight } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, append, parseHTML } from '@pluginjs/dom'
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
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

import Arrows from '@pluginjs/arrows'
import Swipeable from '@pluginjs/swipeable'
import ImageLoader from '@pluginjs/image-loader'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Slider extends Component {
  page = 0
  stash = 0
  direction = true

  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.current = this.options.current || 0

    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    if (!this.options.data || this.options.data.length < 0) {
      // console.error('NO DATA EXIST')
      return
    }

    this.data = this.options.data
    this.axis = this.options.vertical ? 'translateY' : 'translateX'
    this.generate()
    this.distance = this.getDistance(this.box, this.options.vertical)
    this.setPos()
    this.initImageLoader()
    this.initSwipeable()

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  generate() {
    addClass(this.classes.CONTAINER, this.element)

    if (this.options.vertical) {
      addClass(this.classes.VERTICAL, this.element)
    }

    this.box = this.createElement('box')
    this.cards = []

    for (let i = 0; i < 3; i++) {
      const card = this.createElement('card')

      this.cards.push(card)
      append(card, this.box)
    }

    this.element.innerHTML = ''
    append(this.box, this.element)

    if (this.options.arrows) {
      this.initArrows()
    }
  }

  initArrows() {
    this.arrows = Arrows.of(this.element, {})
  }

  initSwipeable() {
    const that = this

    this.swipeable = Swipeable.of(this.box, {
      onSnail() {
        if (that.is('disable')) {
          return
        }

        const offset = this.$info[that.options.vertical ? 'deltaY' : 'deltaX']
        const distance = that.distance * 0.6

        if (offset > distance) {
          that.prev()
        } else if (offset < -distance) {
          that.next()
        } else {
          this.back()
        }
      },
      onDecay() {
        if (that.is('disable')) {
          return
        }

        const offset = this.$info[this.options.vertical ? 'deltaY' : 'deltaX']
        that.decay(offset)
      }
    })
  }

  initImageLoader() {
    this.imageLoader = ImageLoader.of(this.element)

    this.imageLoader.onLoaded(img => {
      img.dataset.loaded = true
    })
  }

  decay(distance) {
    if (distance > 0) {
      this.prev()
    } else {
      this.next()
    }
  }

  createElement(type) {
    const template = this.options.templates[type]
    let html = ''

    html = templateEngine.render(template.call(this), {
      classes: this.classes
    })

    return parseHTML(html)
  }

  getDistance(target, vertical = false) {
    return vertical ? outerHeight(target) : outerWidth(target)
  }

  setPos() {
    const length = this.data.length

    const offset = parseInt(
      anime.getValue(this.cards[this.page], this.axis),
      10
    )

    for (let i = 0; i < 3; i++) {
      let index = null
      const opts = {
        targets: this.cards[i],
        easing: 'linear',
        duration: 0
      }

      switch (i) {
        case this.page + 1:
        case this.page - 2:
          index = this.current === length - 1 ? 0 : this.current + 1
          opts[this.axis] = `${offset + 100}%`
          removeClass(this.classes.ACTIVE, this.cards[i])
          break
        case this.page - 1:
        case this.page + 2:
          index = this.current === 0 ? length - 1 : this.current - 1
          opts[this.axis] = `${offset - 100}%`
          removeClass(this.classes.ACTIVE, this.cards[i])
          break
        default:
          index = this.current
          opts[this.axis] = `${offset}%`
          addClass(this.classes.ACTIVE, this.cards[i])
          break
      }

      const loaded = query(`.${this.classes.LOADED}`, this.cards[i])
      const item = this.createItem(this.data[index])

      item.dataset.index = index

      if (loaded) {
        if (index !== parseInt(loaded.dataset.index, 10)) {
          loaded.parentNode.replaceChild(item, loaded)
        }
      } else {
        append(item, this.cards[i])
      }

      anime(opts)
    }
  }

  createItem(data) {
    const template = this.options.templates[data.type]
    let html = ''

    html = templateEngine.render(template.call(this), {
      classes: this.classes,
      data
    })

    return parseHTML(html)
  }

  go(index, change = true) {
    const length = this.data.length
    const current = this.current
    this.direction = true

    if (
      index === null ||
      index === undefined ||
      index > length - 1 ||
      index < 0
    ) {
      return
    }

    if (
      (index < current && !(current === length - 1 && index === 0)) ||
      (current === 0 && index === length - 1)
    ) {
      this.direction = false
    }

    this.stash = this.direction ? this.stash + 1 : this.stash - 1

    const opts = {
      targets: this.box,
      easing: 'linear',
      duration: this.options.duration,
      complete: () => {
        if (this.direction) {
          this.page = this.page === 2 ? 0 : this.page + 1
        } else {
          this.page = this.page === 0 ? 2 : this.page - 1
        }
        this.setPos()
      }
    }

    opts[this.axis] = `${this.stash * -this.distance}px`

    anime(opts)

    this.current = index

    if (change) {
      this.trigger(EVENTS.CHANGE)
    }
  }

  prev() {
    if (this.is('disable')) {
      return
    }

    const index = this.current === 0 ? this.data.length - 1 : this.current - 1
    this.go(index)
    this.trigger(EVENTS.PREV)
  }

  next() {
    if (this.is('disable')) {
      return
    }

    const index = this.current === this.data.length - 1 ? 0 : this.current + 1
    this.go(index)
    this.trigger(EVENTS.NEXT)
  }

  bind() {
    if (!this.swipeable.is('bind')) {
      this.swipeable.bind()
    }

    if (!this.arrows.is('bind')) {
      this.arrows.bind()
    }

    compose(
      bindEvent({
        type: 'arrows:next',
        handler: () => {
          this.next()
        }
      }),
      bindEvent({
        type: 'arrows:prev',
        handler: () => {
          this.prev()
        }
      })
    )(this.arrows.element)
  }

  unbind() {
    this.arrows.unbind()
    this.swipeable.unbind()
    removeEvent('arrows:next', this.arrows.element)
    removeEvent('arrows:prev', this.arrows.element)
  }

  resize() {
    this.distance = this.getDistance(this.box, this.options.vertical)
    const opts = {
      targets: this.box,
      easing: 'linear',
      duration: 0
    }

    opts[this.axis] = `${this.stash * -this.distance}px`
    anime(opts)

    if (!this.is('disable')) {
      this.trigger(EVENTS.RESIZE)
    }
  }

  enable() {
    if (this.is('disable')) {
      removeClass(this.classes.DISABLED, this.element)
      this.swipeable.enable()
      this.element.disable = false
      this.leave('disable')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disable')) {
      addClass(this.classes.DISABLED, this.element)
      this.swipeable.disable()
      this.element.disable = true
      this.enter('disable')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.arrows.destroy()
      this.swipeable.destroy()

      if (this.options.vertical === true) {
        removeClass(this.classes.VERTICAL, this.element)
      }

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
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
}

export default Slider
