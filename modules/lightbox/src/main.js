import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { append, parseHTML } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
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

import Overlay from './sections/overlay'
import Topbar from './sections/topbar'
import Caption from './sections/caption'
import Slider from './sections/slider'
import Thumbs from './sections/thumbs'
import Keyboard from '@pluginjs/keyboard'
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
class Lightbox extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (!this.options.data || this.options.data.length < 0) {
      return
    }

    addClass(this.classes.NAMESPACE, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.data =
      this.options.data === 'html' ? this.parseHtml() : this.options.data

    this.length = this.data.length

    this.bind()

    if (this.options.breakpoint) {
      this.initBreakpoints()
    }

    if (this.options.keyboard) {
      this.keyboard = Keyboard()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
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

  bind() {
    const that = this

    bindEvent(
      this.eventName('click'),
      this.options.delegate,
      function(event) {
        event.preventDefault()
        that.active = Number(this.dataset.index)
        that.open()
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName('click'), this.element)
  }

  bindConatiner() {
    bindEvent(
      this.eventName('click'),
      event => {
        event.preventDefault()
        event.stopPropagation()

        const target = event.target

        if (
          hasClass(this.slider.plugin.classes.CARD, target) ||
          hasClass(this.classes.TOPBAR, target)
        ) {
          this.hide()
        }
      },
      this.container
    )

    if (this.keyboard) {
      this.keyboard.on('down', 'esc', () => {
        this.hide()
      })

      this.keyboard.on('down', 'left', () => {
        this.slider.plugin.prev()
      })

      this.keyboard.on('down', 'right', () => {
        this.slider.plugin.next()
      })
    }
  }

  unbindConatiner() {
    removeEvent(this.eventName('click'), this.container)
    if (this.keyboard) {
      this.keyboard.off('down', 'esc,left, right')
    }
  }

  open() {
    if (this.is('generate')) {
      this.initShow(this.active)
    } else {
      this.generate()
    }

    this.show()
  }

  show() {
    addClass(this.classes.SHOW, this.container)
    this.bindConatiner()
    this.enter('show')
  }

  hide() {
    removeClass(this.classes.SHOW, this.container)
    this.unbindConatiner()
    this.topbar.mini()
    this.leave('show')
  }

  initShow(index) {
    this.slider.plugin.reset(index)
    this.topbar.setCounter(index)
    this.caption.setInfo(this.data[index])

    if (this.options.hasThumbs) {
      this.thumbs.plugin.go(index, false, false)
    }
  }

  generate() {
    this.container = this.getElement('container')
    this.footer = this.getElement('footer')

    this.overlay = new Overlay(this)
    this.topbar = new Topbar(this)
    this.slider = new Slider(this)
    append(this.footer, this.container)
    this.caption = new Caption(this)
    this.thumbs = new Thumbs(this)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.container)
    }

    append(this.container, document.body)

    this.enter('generate')
  }

  getElement(type, ...args) {
    const template = this.options.templates[type]
    let html = ''

    html = templateEngine.render(
      template.call(this),
      deepMerge(
        {
          classes: this.classes
        },
        ...args
      )
    )

    return parseHTML(html)
  }

  processData(data, key) {
    const _data = []
    data.forEach(item => {
      let info = {
        src: item[key]
      }
      info = deepMerge(info, item)
      _data.push(info)
    })

    return _data
  }

  parseHtml() {
    const data = []
    const items = this.element.querySelectorAll(this.options.delegate)

    items.forEach((item, index) => {
      item.dataset.index = index

      let info = {
        orig: item.getAttribute('href'),
        thumb: item.children[0].getAttribute('src')
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

  enable() {
    this.slider.enable()
    this.thumbs.enable()
  }

  disable() {
    this.slider.disable()
    this.thumbs.disable()
  }

  destroy() {
    this.slider.destroy()
    this.thumbs.destroy()
  }
}

export default Lightbox
