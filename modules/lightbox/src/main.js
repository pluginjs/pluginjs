import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { append, parseHTML } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Gallery extends Component {
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

    this.length = this.data.length

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
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

  open() {
    this.build()
    this.show()
  }

  show() {
    addClass(this.classes.SHOW, this.container)
    this.enter('show')
  }

  hide() {
    removeClass(this.classes.SHOW, this.container)
    this.leave('show')
  }

  build() {
    if (this.is('build')) {
      this.slider.plugin.reset(this.active)

      this.topbar.setCounter(this.active)

      if (this.options.caption) {
        this.caption.setInfo(this.data[this.active])
      }

      if (this.options.thumbs) {
        this.thumbs.plugin.go(this.active, false, false)
      }
      return
    }

    this.container = this.getElement('container')
    this.footer = this.getElement('footer')

    this.overlay = new Overlay(this)
    this.topbar = new Topbar(this)
    this.slider = new Slider(this)
    append(this.footer, this.container)
    this.caption = new Caption(this)
    this.thumbs = new Thumbs(this)
    append(this.container, document.body)

    this.enter('build')
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

  // bind() {
  //   this.slider.bind()
  //   this.thumbs.bind()
  // }

  // unbind() {
  //   this.slider.unbind()
  //   this.thumbs.unbind()
  // }

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

export default Gallery
