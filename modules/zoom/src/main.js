import Component from '@pluginjs/component'
// import { camelize } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import { getData } from '@pluginjs/dom'
import LOADING from './loading'
import WINDOW from './mode/window'
import INNER from './mode/inner'
import LENS from './mode/lens'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

const MODES = {}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Zoom extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.imageSrc = getData('zoom-image', this.element)
      ? getData('zoom-image', this.element)
      : this.element.src
    // this.imageSrc = this.element.dataset[camelize('zoom-image', false)]
    //   ? this.element.dataset[camelize('zoom-image', false)]
    //   : this.element.src
    this.loading = new LOADING(this)
    // this.loaded = false
    this.refresh()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {} /* eslint-disable-line */
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
    const mode = this.options.mode.toUpperCase()
    if (typeof MODES[mode] !== 'undefined') {
      this.mode = new MODES[mode](this)
    }
  }

  unbind() {
    return this.mode && this.mode.unbind()
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLE, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLE, this.element)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  changePosition(p) {
    this.mode.changePosition(p)
  }

  static registerMode(mode, API) {
    MODES[mode] = API
  }
}

Zoom.registerMode('WINDOW', WINDOW)
Zoom.registerMode('INNER', INNER)
Zoom.registerMode('LENS', LENS)

export default Zoom
