import anime from 'animejs'
import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { deepMerge } from '@pluginjs/utils'
import { setStyle, outerWidth, outerHeight } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, closest } from '@pluginjs/dom'
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Thumbnails extends Component {
  distances = []
  pos = 0
  current = null
  dif = null

  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    if (!this.options.data || this.options.data.length < 0) {
      // console.error('NO DATA EXIST')
      return
    }

    this.data =
      this.options.data === 'html' ? this.parseHtml() : this.options.data

    this.generate()
    this.items = this.inner.querySelectorAll(`.${this.classes.THUMB}`)
    this.setDistance(this.options.vertical)
    this.setItemsDistance(this.options.vertical)
    this.go(this.options.current || 0, false)
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  parseHtml() {
    const data = []
    const items = this.element.querySelectorAll(this.options.delegate)
    const regex = new RegExp('"([^"]*)"')

    items.forEach(item => {
      let info = {
        src:
          item.getAttribute('src') ||
          window.getComputedStyle(item)['background-image'].match(regex)[1]
      }

      const _data = Object.entries(item.dataset).reduce((result, [k, v]) => {
        try {
          const content = JSON.parse(`{"data": ${v.replace(/'/g, '"')}}`).data
          return {
            ...result,
            [k]: content
          }
        } catch (err) {
          return {
            ...result,
            [k]: v
          }
        }
      }, {})

      info = deepMerge(info, _data)

      data.push(info)
    })
    return data
  }

  generate() {
    addClass(this.classes.THUMBS, this.element)
    if (this.options.vertical) {
      addClass(this.classes.VERTICAL, this.element)
    }

    this.inner = this.getElement('inner')

    this.data.forEach((item, index) => {
      const thumb = this.getElement('thumb')

      if (item.type === 'video') {
        addClass(this.classes.VIDEO, thumb)
      }

      thumb.dataset.index = index
      setStyle(
        { backgroundImage: `url("${item.src}")` },
        thumb.querySelector(`.${this.classes.LOADED}`)
      )

      append(thumb, this.inner)
    })

    this.element.innerHTML = ''
    append(this.inner, this.element)
  }

  getElement(type) {
    const template = this.options.templates[type]
    let html = ''

    html = templateEngine.render(template.call(this), {
      classes: this.classes
    })

    return parseHTML(html)
  }

  getItems() {
    return this.items
  }

  setDistance(vertical) {
    this.wrapDistance = vertical
      ? outerHeight(this.element)
      : outerWidth(this.element)
    this.innerDistance = vertical
      ? this.inner.scrollHeight
      : this.inner.scrollWidth
  }

  setItemsDistance(vertical) {
    this.length = this.items.length
    this.gutter = parseInt(
      window.getComputedStyle(this.items[1])[
        vertical ? 'margin-top' : 'margin-left'
      ],
      10
    )

    this.items.forEach(item => {
      const diatance = vertical ? outerHeight(item) : outerWidth(item)
      this.distances.push(diatance)
    })
  }

  bind() {
    bindEvent(
      {
        type: this.eventName('click'),
        handler: event => {
          if (this.is('disable')) {
            return false
          }

          const target = closest(`.${this.classes.THUMB}`, event.target)
          if (!target) {
            return false
          }

          const index = Number(target.dataset.index)

          return this.go(index)
        }
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  getItemPos(index, center = false) {
    return (
      (center ? this.distances[index] / 2 : this.distances[index]) -
      this.distances.slice(0, index + 1).reduce((a, b) => a + b) -
      this.gutter * index
    )
  }

  setPos(index, vertical = false) {
    const mode = this.options.mode
    let pos = 0

    if (mode === 'full') {
      if (this.innerDistance > this.wrapDistance) {
        const dif = this.wrapDistance - this.innerDistance

        if (this.current === null) {
          const itemPos = this.getItemPos(index)

          pos = dif < itemPos ? itemPos : dif
        } else {
          const oldPos = this.pos

          if (index > this.current) {
            const newPos = oldPos - this.distances[this.current] - this.gutter

            pos = dif < newPos ? newPos : dif
          } else if (index < this.current) {
            const newPos = oldPos + this.distances[this.current] + this.gutter

            pos = newPos > 0 ? 0 : newPos
          }
        }
      }
    } else if (mode === 'center') {
      pos = this.wrapDistance / 2 + this.getItemPos(index, true)
    }

    const opts = {
      targets: this.inner,
      easing: 'linear',
      duration: 300
    }

    opts[vertical ? 'translateY' : 'translateX'] = pos

    anime(opts)

    this.pos = pos
  }

  resetPos(vertical = false) {
    const wrapDistance = this.wrapDistance

    this.setDistance(this.options.vertical)
    if (this.wrapDistance === wrapDistance) {
      return
    }
    this.setItemsDistance(this.options.vertical)

    if (this.innerDistance < this.wrapDistance) {
      return
    }

    const oldPos = this.pos
    const dif = this.wrapDistance - this.innerDistance
    let pos = 0

    if (this.dif === null) {
      this.dif = dif
    }

    if (this.options.mode === 'center') {
      pos = this.wrapDistance / 2 - this.getItemPos(this.current, true)
    } else {
      pos =
        this.current === this.length - 1 ? oldPos + (dif - this.dif) : oldPos

      if (pos > 0) {
        pos = 0
      }

      if (pos < dif) {
        pos = dif
      }
    }

    this.dif = dif

    const opts = {
      targets: this.inner,
      easing: 'linear',
      duration: 0
    }
    opts[vertical ? 'translateY' : 'translateX'] = pos

    anime(opts)

    this.pos = pos
  }

  go(index, change = true) {
    if (this.is('disable')) {
      return
    }
    if (index < 0 || index > this.length || index === this.current) {
      return
    }

    this.setPos(index, this.options.vertical)

    removeClass(this.classes.ACTIVE, this.items[this.current])
    addClass(this.classes.ACTIVE, this.items[index])

    this.current = index

    if (change) {
      this.trigger(EVENTS.CHANGE)
    }
  }

  next() {
    if (this.is('disable')) {
      return
    }

    this.go(this.current + 1)
    this.trigger(EVENTS.NEXT)
  }

  prev() {
    if (this.is('disable')) {
      return
    }

    this.go(this.current - 1)
    this.trigger(EVENTS.PREV)
  }

  resize() {
    this.resetPos(this.options.vertical)
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

export default Thumbnails
