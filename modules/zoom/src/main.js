import Component from '@pluginjs/component'
import { deepMerge, camelize } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/pluginjs'
import LOADING from './loading'
import WINDOW from './type/window'
import INNER from './type/inner'
import LENS from './type/lens'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

const TYPES = {}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS
})
class Zoom extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.events = EVENTS
    this.initClasses(CLASSES)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$element)
    }

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.imageSrc = this.$element.dataset[camelize('zoom-image', false)]
      ? this.$element.dataset[camelize('zoom-image', false)]
      : this.$element.src

    this.loading = new LOADING(this)
    // this.loaded = false
    this.refresh()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {}

  refresh() {
    const newImg = document.createElement('img')
    // todo  loading show()
    this.loading.show()
    newImg.onload = () => {
      // this.loaded = true
      // todo  loading hide()
      this.loading.hide()
      this.largeWidth = newImg.width
      this.largeHeight = newImg.height
      this.startZoom()
      this.currentImage = this.imageSrc
    }

    newImg.onerror = () => {
      // todo  loading error()
      this.loading.error()
    }

    newImg.src = this.imageSrc
  }

  startZoom() {
    const type = this.options.type.toUpperCase()
    if (typeof TYPES[type] !== 'undefined') {
      this.modal = new TYPES[type](this)
    }
  }

  unbind() {
    return this.modal && this.modal.unbind()
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$element)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  changePosition(p) {
    this.modal.changePosition(p)
  }

  static registerType(type, API) {
    TYPES[type] = API
  }
}

Zoom.registerType('WINDOW', WINDOW)
Zoom.registerType('INNER', INNER)
Zoom.registerType('LENS', LENS)

export default Zoom
