import Viewport from '@pluginjs/viewport'
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
import { parent, queryAll, getData, attr } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import { on, off } from '@pluginjs/events'

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
    this._isLoad = false

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
    const img = new Image()
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
    } else {
      setStyle('backgroundImage', `url(${this.src})`, this.element)
      img.src = this.src
    }
    this.trigger(EVENTS.LOAD)

    const step = () => {
      if (
        (this.element.complete && this.element.naturalWidth > 1) ||
        (img.complete && img.naturalWidth > 1)
      ) {
        this._isLoad = true
        removeClass(this.classes.LOADING, this.element)
        addClass(this.classes.LOADED, this.element)
        this.trigger(EVENTS.LOADED)
        this.destroy()
      } else {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }

  bind() {
    on(
      'viewport:enter',
      () => {
        this.load()
      },
      this.element
    )
  }

  unbind() {
    off('viewport:enter', this.element)
  }

  forceLoad() {
    this.load()
  }

  isLoad() {
    return this._isLoad
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
