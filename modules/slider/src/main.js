import anime from 'animejs'
import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { deepMerge, compose } from '@pluginjs/utils'
import { outerWidth } from '@pluginjs/styled'
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
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

import Arrows from '@pluginjs/arrows'
import Swipeable from '@pluginjs/swipeable'

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
  page = 0

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
    this.stash = 0
    this.generate()
    this.setPos()

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  generate() {
    addClass(this.classes.CONTAINER, this.element)

    if (this.options.vertical) {
      addClass(this.classes.VERTICAL, this.element)
    }

    this.box = this.getElement('box')
    this.cards = []

    for (let i = 0; i < 3; i++) {
      const card = this.getElement('card')

      this.cards.push(card)
      append(card, this.box)
    }

    this.element.innerHTML = ''
    append(this.box, this.element)

    if (this.options.arrows) {
      this.arrows = Arrows.of(this.element, {
        classes: {
          NAMESPACE: this.classes.NAMESPACE
        }
      })
    }

    Swipeable.of(this.box, {
      decay: true,
      rebound: true,
      reboundPos: 100
    })
  }

  getElement(type) {
    const template = this.options.templates[type]
    let html = ''

    html = templateEngine.render(template.call(this), {
      classes: this.classes
    })

    return parseHTML(html)
  }

  setPos() {
    const length = this.data.length

    const distance = parseInt(
      anime.getValue(this.cards[this.page], 'translateX'),
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
          opts.translateX = `${distance + 100}%`
          break
        case this.page - 1:
        case this.page + 2:
          index = this.current === 0 ? length - 1 : this.current - 1
          opts.translateX = `${distance - 100}%`
          break
        default:
          index = this.current
          opts.translateX = `${distance}%`
          break
      }

      const loaded = query(`.${this.classes.LOADED}`, this.cards[i])
      if (loaded) {
        loaded.parentNode.replaceChild(
          this.createItem(this.data[index]),
          loaded
        )
      } else {
        append(this.createItem(this.data[index]), this.cards[i])
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

  go(index) {
    const length = this.data.length
    const current = this.current
    let direction = true

    if (
      index === null ||
      index === undefined ||
      index > length - 1 ||
      index < 0
    ) {
      return
    }

    const distance = outerWidth(this.box)

    if (
      (index < current && !(current === length - 1 && index === 0)) ||
      (current === 0 && index === length - 1)
    ) {
      direction = false
    }

    this.stash = direction ? this.stash + 1 : this.stash - 1

    const opts = {
      targets: this.box,
      easing: 'linear',
      duration: this.options.duration,
      complete: () => {
        if (direction) {
          this.page = this.page === 2 ? 0 : this.page + 1
        } else {
          this.page = this.page === 0 ? 2 : this.page - 1
        }
        this.setPos()
      }
    }

    opts.translateX = `${this.stash * -distance}px`

    anime(opts)

    this.current = index
  }

  prev() {
    const index = this.current === 0 ? this.data.length - 1 : this.current - 1
    this.go(index)
  }

  next() {
    const index = this.current === this.data.length - 1 ? 0 : this.current + 1
    this.go(index)
  }

  bind() {
    // bindEvent(
    //   {
    //     type: this.eventName('click'),
    //     handler: event => {
    //       if (this.is('disable')) {
    //         return false
    //       }

    //       const target = closest(`.${this.classes.ITEM}`, event.target)
    //       if (!target) {
    //         return false
    //       }

    //       const index = Number(target.dataset.index)

    //       return this.go(index)
    //     }
    //   },
    //   this.element
    // )

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
    removeEvent(this.eventName(), this.element)
  }

  enable() {
    if (this.is('disable')) {
      removeClass(this.classes.DISABLED, this.element)
      this.element.disable = false
      this.leave('disable')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disable')) {
      addClass(this.classes.DISABLED, this.element)
      this.element.disable = true
      this.enter('disable')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

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
