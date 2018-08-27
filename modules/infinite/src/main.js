import ScrollEnd from '@pluginjs/scroll-end'
import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
import { append, query } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'

import LOADER from './loader'

@translateable(TRANSLATIONS)
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Infinite extends Component {
  constructor(element, options = {}) {
    super(element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.setupI18n()
    this.$container = this.element

    this.initStates()
    this.initialize()
  }

  initialize() {
    if (this.is('initialized')) {
      return
    }
    this.hasMoreDate = true
    this.loadErr = false
    this.loader = new LOADER(this)

    this.stick = this.getContainerOfset()
    this.currentScrollOffset = this.getScrollDown()

    this.bind()

    if (this.stick <= this.currentScrollOffset) {
      this.next()
    }
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    if (this.is('bind')) {
      return
    }

    this.scrollEndHandler = () => {
      this.stick = this.getContainerOfset()
      this.currentScrollOffset = this.getScrollDown()

      if (this.stick <= this.currentScrollOffset) {
        this.next()
      }
    }
    ScrollEnd.on(this.scrollEndHandler)

    this.enter('bind')
  }

  unbind() {
    ScrollEnd.off(this.scrollEndHandler)

    this.leave('bind')
  }

  getContainerOfset() {
    const o = this.offset(this.$container)
    return o.bottom - this.options.threshold
  }

  next() {
    if (this.hasMoreDate && !this.loadErr) {
      this.loader.appendLoad()
      this.trigger(EVENTS.LOADING)
      this.options.loadMore.call(this, this)
    }
  }

  throwException() {
    this.loadErr = true
    this.loader.appendErr()

    this.trigger(EVENTS.EXCEPTEERROR)
  }

  noMoreDate() {
    this.hasMoreDate = false
    this.loader.appendEnd()

    this.trigger(EVENTS.NOMOREDATA)
  }

  appendDate(data, selector) {
    if (selector) {
      this.loader.hide()
      if (typeof selector === 'string') {
        append(data, query(selector))
      } else {
        append(data, selector)
      }
    } else {
      this.loader.hide()
      append(data, this.$container)
    }

    this.appendEnd()
  }

  appendEnd() {
    if (!this.hasMoreDate) {
      this.loader.appendEnd()
    }
  }

  offset(el) {
    const rect = el.getBoundingClientRect()
    const windowTop = document.body.scrollTop || window.pageYOffset

    return {
      bottom: rect.bottom + windowTop,
      left: rect.left + document.body.scrollLeft
    }
  }

  hideLoader() {
    this.loader.hide()
  }

  getScrollDown() {
    const scrollTop = document.body.scrollTop || window.pageYOffset
    return scrollTop + window.innerHeight
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    removeClass(this.classes.DISABLED, this.element)
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }
    addClass(this.classes.DISABLED, this.element)
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

  static open(options = {}) {
    const instance = new Infinite(options)
    return instance
  }
}

export default Infinite
