import Anime from 'animejs'
import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { compose } from '@pluginjs/utils'
import { setStyle, outerWidth, outerHeight } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, children, append, parseHTML, data, attr } from '@pluginjs/dom'
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

import Arrows from '@pluginjs/arrows'
import Swipeable from '@pluginjs/swipeable'
import Card from './card'
import Breakpoints from '@pluginjs/breakpoints'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Slider extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)

    this.current = this.options.current || 0

    this.page = 0
    this.stash = 0
    this.direction = true
    this._interval = {
      createTimer: time =>
        window.setInterval(() => {
          this.next(false)
        }, time),
      removeTimer: () => {
        window.clearInterval(this.timer())
      }
    }

    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (typeof NodeList.prototype.forEach !== 'function') {
      NodeList.prototype.forEach = Array.prototype.forEach
    }

    if (!this.options.data || this.options.data.length < 0) {
      this.data = this.parseHtml()
    } else {
      this.data = this.options.data
    }

    this.length = this.data.length

    if (this.length < 1) {
      return
    }

    this.newData = [...this.data]

    if (this.length === 2) {
      this.newData[2] = this.data[0]
      this.newData[3] = this.data[1]
    }

    this.newLength = this.newData.length

    if (this.newLength <= this.current) {
      this.current = this.newLength - 1
    }

    if (this.options.breakpoint) {
      this.initBreakpoints()
    }

    this.modules = []
    this.axis = this.options.vertical ? 'translateY' : 'translateX'
    this.generate()

    this.width = outerWidth(this.box)
    this.height = outerHeight(this.box)
    this.distance = this.getDistance(this.box, this.options.vertical)

    this.setPos()
    this.initSwipeable()

    this.bind()

    if (this.options.autoplay) {
      this.autoPlay()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  parseHtml() {
    const dataArr = []

    children(this.element).forEach(element => {
      switch (element.tagName.toLowerCase()) {
        case 'img':
          dataArr.push({
            type: 'image',
            src: attr('src', element)
          })
          break
        case 'video':
          dataArr.push({
            type: 'video',
            videoType: data('videoType', element),
            src: data('src', element),
            href: attr('href', element),
            id: data('id', element)
          })
          break
        default:
          if (data('type', element) === 'inline') {
            dataArr.push({
              type: 'inline',
              html: element.innerHTML
            })
          } else {
            dataArr.push({
              type: data('type', element),
              src: data('src', element)
            })
          }
      }
    })

    return dataArr
  }

  initBreakpoints() {
    Breakpoints.init()
    if (Breakpoints.all().includes(this.options.breakpoint)) {
      const breakpoint = this.options.breakpoint
      const that = this
      if (Breakpoints.is(`${breakpoint}-`)) {
        addClass(this.classes.RESPONSIVE, this.element)
      }
      Breakpoints.to(breakpoint, {
        enter() {
          addClass(that.classes.RESPONSIVE, that.element)
        },
        leave() {
          removeClass(that.classes.RESPONSIVE, that.element)
        }
      })
    }
  }

  generate() {
    addClass(this.classes.CONTAINER, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    if (this.options.vertical) {
      addClass(this.classes.VERTICAL, this.element)
    }

    if (this.options.height) {
      setStyle('paddingBottom', `${this.options.height}%`, this.element)
    }

    this.box = this.createElement('box')
    this.cards = []

    for (let i = 0; i < 3; i++) {
      const card = new Card(this)

      card.appendTo(this.box)
      this.cards.push(card)
    }

    this.element.innerHTML = ''
    append(this.box, this.element)

    if (this.options.arrows) {
      this.initArrows()
    }
  }

  initArrows() {
    if (this.length > 1) {
      this.arrows = Arrows.of(this.element, this.options.arrows)
    }
  }

  initSwipeable() {
    const that = this

    this.swipeable = Swipeable.of(this.box, {
      axis: that.options.vertical ? 'y' : 'x',
      onStart() {
        that.leave('pause')
      },
      onSnail() {
        if (that.is('disable')) {
          return
        }

        if (that.is('decaying')) {
          const test = this.position[this.axis] / that.distance + that.stash

          if (test > 0.5) {
            that.prev()
          } else if (test < -0.5) {
            that.next()
          } else {
            this.back(that.stash * -that.distance)
          }
        } else {
          const offset = this.info[that.options.vertical ? 'deltaY' : 'deltaX']
          const distance = that.distance * 0.5

          if (offset > distance) {
            that.prev()
          } else if (offset < -distance) {
            that.next()
          } else {
            this.back(that.stash * -that.distance)
          }
        }
      },
      onThrow() {
        if (that.is('disable')) {
          return
        }

        const offset = this.info[that.options.vertical ? 'deltaY' : 'deltaX']
        that.decay(offset)
      }
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

  setPos(reset = false) {
    const offset = reset ? 0 : this.stash * 100

    for (let i = 0; i < 3; i++) {
      let index = null
      let pos = 0

      switch (i) {
        case this.page + 1:
        case this.page - 2:
          index = this.current === this.newLength - 1 ? 0 : this.current + 1
          pos = `${offset + 100}%`
          this.cards[i].inactive()
          break
        case this.page - 1:
        case this.page + 2:
          index = this.current === 0 ? this.newLength - 1 : this.current - 1
          pos = `${offset - 100}%`
          this.cards[i].inactive()
          break
        default:
          index = this.current
          pos = `${offset}%`
          this.cards[i].active()
          break
      }

      const card = this.cards[i].element
      const content = query(`.${this.classes.CONTENT}`, card)

      if (content) {
        const oldIndex = parseInt(data('index', content), 10)

        if (index !== oldIndex) {
          const module = this.modules[oldIndex]

          if (module.type === 'video' && module.isload) {
            this.modules[oldIndex].video.destroy()
          }

          this.cards[i].createModule(this.newData[index], index)
          this.cards[i].module.setData({ index }).replace(content)
        }
      } else {
        this.cards[i].createModule(this.newData[index], index)
        this.cards[i].module.setData({ index }).appendTo(card)
      }

      setStyle(
        {
          transform: `${this.axis}(${pos})`
        },
        this.cards[i].element
      )
    }
  }

  go(index, change = true, retime = true) {
    const current = this.current
    this.direction = true

    if (
      index === null ||
      typeof index === 'undefined' ||
      index > this.newLength - 1 ||
      index < 0
    ) {
      return
    }

    if (
      (index < current && !(current === this.newLength - 1 && index === 0)) ||
      (current === 0 && index === this.newLength - 1)
    ) {
      this.direction = false
    }

    this.stash = this.direction ? this.stash + 1 : this.stash - 1

    const opts = {
      targets: this.box,
      easing: 'linear',
      duration: this.options.duration,
      begin: () => {
        if (this.direction) {
          this.page = this.page === 2 ? 0 : this.page + 1
        } else {
          this.page = this.page === 0 ? 2 : this.page - 1
        }
        this.setPos()

        this.enter('decaying')
      },
      complete: () => {
        this.leave('decaying')
      }
    }

    opts[this.axis] = `${this.stash * -100}%`

    this.animate = Anime(opts)

    this.current = index

    if (change) {
      if (this.is('video')) {
        this.video.pause()
        this.leave('video')
      }
      this.trigger(EVENTS.CHANGE)
    }

    if (retime && this.is('play')) {
      this.autoPlay()
    }
  }

  prev(retime) {
    if (this.is('disable')) {
      return
    }

    if (this.current === 0 && !this.options.loop) {
      return
    }

    const index = this.current === 0 ? this.newLength - 1 : this.current - 1
    this.go(index, true, retime)

    this.trigger(EVENTS.PREV)
  }

  next(retime) {
    if (this.is('disable')) {
      return
    }

    if (this.current === this.newLength - 1 && !this.options.loop) {
      return
    }

    const index = this.current === this.newLength - 1 ? 0 : this.current + 1
    this.go(index, true, retime)
    this.trigger(EVENTS.NEXT)
  }

  autoPlay() {
    this.intervalToggle(true)
  }

  timer() {
    return this._interval.timer
  }

  setIntervalTime(time) {
    if (this._interval.timer) {
      this._interval.removeTimer()
    }

    const timer = this._interval.createTimer(time)
    this._interval.timer = timer
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

  bind() {
    if (!this.swipeable.is('bind')) {
      this.swipeable.bind()
    }

    if (this.arrows && !this.arrows.is('bind')) {
      this.arrows.bind()
    }

    compose(
      bindEvent(this.eventName('mousedown'), () => {
        if (!this.is('decaying')) {
          return
        }
        this.enter('pause')
        this.animate.pause()
      }),
      bindEvent(this.eventName('mouseup'), () => {
        if (!this.is('pause')) {
          return
        }
        this.animate.play()
        this.leave('pause')
      })
    )(this.box)

    if (this.arrows) {
      compose(
        bindEvent('arrows:next', () => {
          this.next()
        }),
        bindEvent('arrows:prev', () => {
          this.prev()
        })
      )(this.arrows.element)
    }
  }

  unbind() {
    if (this.arrows) {
      this.arrows.unbind()
    }

    this.swipeable.unbind()

    removeEvent(this.eventName('mousedown'), this.box)
    removeEvent(this.eventName('mouseup'), this.box)
    if (this.arrows) {
      removeEvent('arrows:next', this.arrows.element)
      removeEvent('arrows:prev', this.arrows.element)
    }
  }

  reset(index) {
    this.current = index
    this.stash = 0
    this.setPos(true)

    // setStyle(
    //   {
    //     transform: `${this.axis}(${this.stash * -this.distance}%)`
    //   },
    //   this.box
    // )
  }

  resize() {
    if (this.newLength === 0) {
      return
    }

    this.width = outerWidth(this.box)
    this.height = outerHeight(this.box)
    this.distance = this.getDistance(this.box, this.options.vertical)

    // setStyle(
    //   {
    //     transform: `${this.axis}(${this.stash * -this.distance}%)`
    //   },
    //   this.box
    // )

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
      if (this.arrows) {
        this.arrows.destroy()
      }

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
