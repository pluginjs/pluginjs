import Viewport from '@pluginjs/viewport'
import ImageLoader from '@pluginjs/image-loader'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable
} from '@pluginjs/decorator'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  classes as CLASSES,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import { addClass, removeClass } from '@pluginjs/classes'
import { parent, query, queryAll, getData, attr } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Lazyload extends Viewport {
  constructor(element, options = {}) {
    super(element, options)

    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.NAMESPACE, this.element)

    const config = ['src', 'srcset']

    config
      .filter(key => Boolean(this.options[key]))
      .map(key => (this[key] = this.options[key]))

    this.viewport = Viewport.of(this.element)
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  load() {
    addClass(this.classes.LOADING, this.element)
    const loader = ImageLoader.of(this.element, false).on('loaded', () => {
      this.enter('load')
      removeClass(this.classes.LOADING, this.element)
      addClass(this.classes.LOADED, this.element)
      this.trigger(EVENTS.LOADED)
      this.destroy()
    })

    if (this.element.tagName === 'IMG') {
      if (parent(this.element).tagName === 'PICTURE') {
        queryAll('source', parent(this.element)).forEach(source => {
          const src = getData('src', source)
          const srcset = getData('srcset', source)
          attr('src', src, source)
          attr('srcset', srcset, source)
        })
      }

      attr('src', this.src, this.element)
      attr('srcset', this.srcset, this.element)
    } else if (this.element.tagName === 'PICTURE') {
      queryAll('source', this.element).forEach(source => {
        const src = getData('src', source)
        const srcset = getData('srcset', source)
        attr('src', src, source)
        attr('srcset', srcset, source)
      })
      const img = query('img', this.element)
      const src = getData('src', img)
      const srcset = getData('srcset', img)

      attr('src', src, img)
      attr('srcset', srcset, img)
    } else {
      setStyle('backgroundImage', `url(${this.src})`, this.element)
    }

    this.trigger(EVENTS.LOAD)
    loader.load()
  }

  bind() {
    bindEvent(
      'viewport:enter',
      () => {
        this.load()
      },
      this.element
    )
  }

  unbind() {
    removeEvent('viewport:enter', this.element)
  }

  forceLoad() {
    this.load()
  }

  isLoad() {
    return this.is('load')
  }

  enable() {
    if (this.is('disabled')) {
      this.bind()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.unbind()
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Lazyload
