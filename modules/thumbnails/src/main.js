import anime from 'animejs'
import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { setStyle, outerWidth, outerHeight } from '@pluginjs/styled'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { closest, append, parseHTML } from '@pluginjs/dom'
import { deepMerge } from '@pluginjs/utils'
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
import ImageLoader from '@pluginjs/image-loader'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Thumbnails extends Component {
  distance = 0
  pos = 0
  current = null
  dif = null

  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    if (!this.options.data || this.options.data.length < 0) {
      return
    }

    this.data =
      this.options.data === 'html' ? this.parseHtml() : this.options.data

    this.generate()
    this.items = this.inner.querySelectorAll(`.${this.classes.THUMB}`)
    this.setDistance(this.options.vertical)
    this.setItemDistance(this.options.vertical)
    this.go(this.options.current || 0, false)
    this.initImageLoader()
    this.initSwipeable()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  parseHtml() {
    const data = []
    const items = this.element.querySelectorAll(this.options.delegate)
    const regex = new RegExp(/\((.+?)\)/)

    items.forEach(item => {
      const thumb = closest(`.${this.classes.THUMB}`, item)

      let info = {
        src:
          item.getAttribute('src') ||
          window
            .getComputedStyle(item)
            ['background-image'].match(regex)[1]
            .replace(/'/g, '')
            .replace(/"/g, '')
      }

      if (thumb) {
        info.type = hasClass(this.classes.VIDEO, thumb) ? 'video' : 'image'
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
      thumb
        .querySelector(`.${this.classes.IMAGE}`)
        .setAttribute('src', item.src)

      append(thumb, this.inner)
    })

    this.element.innerHTML = ''
    append(this.inner, this.element)
  }

  initImageLoader() {
    const that = this

    this.imageLoader = ImageLoader.of(this.inner)

    this.imageLoader.onLoaded(img => {
      const thumb = closest(`.${this.classes.THUMB}`, img)
      const loader = thumb.querySelector(`.${that.classes.LOADER}`)

      addClass(that.classes.LOADED, thumb)
      setStyle('visibility', 'hidden', loader)
    })
  }

  initSwipeable() {
    const serPos = () => {
      this.pos = this.swipeable.position[this.options.vertical ? 'y' : 'x']
    }

    this.swipeable = Swipeable.of(this.inner, {
      rebound: true,
      decay: true,
      axis: this.options.vertical ? 'y' : 'x',
      reboundPos: this.options.mode === 'center' ? 50 : 100,
      offset: this.options.mode === 'center' ? this.distance / 2 : 0,
      onDecayend() {
        serPos()
      },
      onReboundend() {
        serPos()
      },
      onEnd() {
        serPos()
      }
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

  setDistance(vertical) {
    this.wrapDistance = vertical
      ? outerHeight(this.element)
      : outerWidth(this.element)
    this.innerDistance = vertical
      ? this.inner.scrollHeight
      : this.inner.scrollWidth
  }

  setItemDistance(vertical) {
    this.length = this.items.length
    this.gutter = parseInt(
      window.getComputedStyle(this.items[1])[
        vertical ? 'margin-top' : 'margin-left'
      ],
      10
    )

    this.distance = vertical
      ? outerHeight(this.items[0])
      : outerWidth(this.items[0])
  }

  bind() {
    bindEvent(
      {
        type: this.eventName('click'),
        handler: event => {
          if (this.is('disable') || this.swipeable.is('paning')) {
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
      (center ? this.distance / 2 : this.distance) -
      this.distance * (index + 1) -
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
        } else if (this.current === this.length - 1 && index === 0) {
          pos = 0
        } else if (this.current === 0 && index === this.length - 1) {
          pos = dif
        } else {
          const oldPos = this.pos

          if (index > this.current) {
            const newPos = oldPos - this.distance - this.gutter

            pos = dif < newPos ? newPos : dif
          } else if (index < this.current) {
            const newPos = oldPos + this.distance + this.gutter

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
    this.setItemDistance(this.options.vertical)

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
      pos = this.wrapDistance / 2 + this.getItemPos(this.current, true)
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

    setStyle(
      {
        transform: `${vertical ? 'translateY' : 'translateX'}(${pos}px)`
      },
      this.inner
    )

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
