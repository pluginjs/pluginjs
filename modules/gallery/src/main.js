import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { addClass } from '@pluginjs/classes'
import { append, parseHTML } from '@pluginjs/dom'
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

import Slider from '@pluginjs/slider'
import Thumbnails from '@pluginjs/thumbnails'

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
    super(element)

    this.setupOptions(options)
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

    if (this.length < 2) {
      return
    }

    this.generate()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  generate() {
    const that = this

    addClass(this.classes.CONTAINER, this.element)

    if (this.options.vertical) {
      addClass(this.classes.VERTICAL, this.element)
    }

    const sections = {
      slider: this.getElement('slider'),
      thumbs: this.getElement('thumbs')
    }

    this.options.order.forEach(item => {
      append(sections[item], this.element)
    })

    if (this.length === 2) {
      this.options.current = this.current % 2
    }

    this.slider = Slider.of(
      sections.slider,
      deepMerge(this.options, this.options.slider, {
        data: this.processData(this.data, 'orig'),
        onChange() {
          if (this.length === 2) {
            this.current %= 2
          }
          that.thumbs.go(this.current, false)
        }
      })
    )

    this.thumbs = Thumbnails.of(
      sections.thumbs,
      deepMerge(this.options, this.options.thumb, {
        data: this.processData(this.data, 'thumb'),
        onChange() {
          that.slider.go(this.current, false)
        }
      })
    )
  }

  getElement(type) {
    const template = this.options.templates[type]
    let html = ''

    html = templateEngine.render(template.call(this), {
      classes: this.classes
    })

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
    items.forEach(item => {
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
      item.remove()
    })

    return data
  }

  bind() {
    this.slider.bind()
    this.thumbs.bind()
  }

  unbind() {
    this.slider.unbind()
    this.thumbs.unbind()
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

export default Gallery
