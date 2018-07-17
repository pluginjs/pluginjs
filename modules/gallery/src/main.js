import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { deepMerge } from '@pluginjs/utils'
import { addClass } from '@pluginjs/classes'
import { append, parseHTML } from '@pluginjs/dom'
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

import Slider from '@pluginjs/slider'
import Thumbnails from '@pluginjs/thumbnails'

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
class Gallery extends Component {
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

    console.log(this.data)
    this.generate()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  generate() {
    const that = this

    addClass(this.classes.CONTAINER, this.element)
    const sections = {
      slider: this.getElement('slider'),
      thumbs: this.getElement('thumbs')
    }

    this.slider = Slider.of(
      sections.slider,
      deepMerge(this.options, {
        data: this.getData(this.data, 'orig'),
        onChange() {
          that.thumbs.go(this.current, false)
        }
      })
    )

    this.thumbs = Thumbnails.of(
      sections.thumbs,
      deepMerge(this.options, {
        data: this.getData(this.data, 'thumb'),
        onChange() {
          that.slider.go(this.current, false)
        }
      })
    )

    this.options.order.forEach(item => {
      append(sections[item], this.element)
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

  getData(data, key) {
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
    })

    return data
  }

  // bind() {}

  // unbind() {}

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
