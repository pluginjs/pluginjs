import '@pluginjs/polyfills/IntersectionObserver'
import Component from '@pluginjs/component'
import Loader from '@pluginjs/loader'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable,
  translateable
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
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { query, append, insertBefore, detach, parseHTML } from '@pluginjs/dom'
import { isNumber, isString, isFunction } from '@pluginjs/is'
import { getStyle, setStyle } from '@pluginjs/styled'
import 'whatwg-fetch'

@translateable(TRANSLATIONS)
@themeable()
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

    this.setupOptions(options)
    this.setupI18n()
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    if (this.options.horizontal) {
      addClass(this.classes.HORIZONTAL, this.element)
    }

    addClass(this.classes.CONTAINER, this.element)

    this.count = 1
    this.$context = document

    if (this.options.trigger === 'button') {
      this.createButton()
    } else {
      this.createSentinels()
      this.createObserver()
    }

    this.bind()
    this.checkEnd()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  createObserver() {
    this.observer = new IntersectionObserver(
      changes => {
        changes.forEach(change => {
          if (change.isIntersecting) {
            this.load()
          }
        })
      },
      {
        threshold: [0],
        rootMargin: this.getOffset(this.options.offset)
      }
    )
  }

  getOffset(offset) {
    if (isNumber(offset)) {
      return `${offset}px`
    }

    if (isString(offset) && offset.indexOf('px') !== -1) {
      return offset
    }

    return '0px'
  }

  createButton() {
    this.$button = parseHTML(
      template.compile(this.options.templates.button())({
        classes: this.classes,
        buttonText: this.translate('buttonText')
      })
    )
    append(this.$button, this.element)

    this.$last = this.$button
  }

  getItemStyle() {
    const $item = query(this.options.item, this.element)

    const styles = getStyle(['display', 'float', 'flex'], $item)

    if (styles.display === 'none') {
      delete styles.display
    }

    return styles
  }

  createSentinels() {
    this.$sentinels = document.createElement('div')
    addClass(this.classes.SENTINELS, this.$sentinels)

    if (this.options.item && this.options.horizontal) {
      setStyle(this.getItemStyle(), this.$sentinels)
    }

    append(this.$sentinels, this.element)

    this.$last = this.$sentinels
  }

  load() {
    if (this.is('loading') || this.is('end') || this.is('error')) {
      return
    }

    this.enter('loading')
    this.showLoader()
    addClass(this.classes.LOADING, this.element)
    this.trigger(EVENTS.LOAD, this.count)
    this.options.load.call(
      this,
      this.count,
      this.resolveContent.bind(this),
      this.throwError.bind(this)
    )
  }

  resolveContent(content) {
    this.trigger(EVENTS.LOADED, content)
    this.resolveLoading()
    this.render(content)

    this.count++

    this.checkEnd()
  }

  resolveEnd() {
    this.$end = parseHTML(
      template.compile(this.options.templates.end())({
        classes: this.classes,
        endText: this.translate('endText')
      })
    )
    insertBefore(this.$end, this.$last)
    if (this.options.trigger === 'button') {
      this.$button.remove()
    }
    this.trigger(EVENTS.END)
    this.enter('end')
  }

  checkEnd() {
    if (this.options.checkEnd.call(this, this.count)) {
      this.resolveEnd()
    }
  }

  throwError(error) {
    this.resolveLoading()

    if (!this.$error) {
      this.$error = parseHTML(
        template.compile(this.options.templates.error(error))({
          classes: this.classes,
          errorText: this.translate('errorText')
        })
      )
    }

    insertBefore(this.$error, this.$last)

    if (this.options.trigger === 'button') {
      this.$button.remove()
    }

    this.trigger(EVENTS.ERROR, error)
    this.enter('error')
  }

  resolveLoading() {
    removeClass(this.classes.LOADING, this.element)
    this.hideLoader()
    this.leave('loading')
  }

  getNextUrl(count) {
    if (isFunction(this.options.url)) {
      return this.options.url.call(this, count)
    } else if (isString(this.options.url)) {
      return this.getNextUrlFromSelector()
    }
    return null
  }

  getNextUrlFromSelector() {
    const $next = query(this.options.url, this.$context)

    if ($next) {
      addClass(this.classes.NEXT, $next)
      return $next.getAttribute('href')
    }
    return null
  }

  loadFromUrl(count, resolve, reject) {
    const url = this.getNextUrl(count)

    if (url) {
      fetch(url, this.options.fetchOptions)
        .then(response => {
          response
            .text()
            .then(text => {
              this.$context = new DOMParser().parseFromString(text, 'text/html')
              const $items = this.$context.querySelectorAll(this.options.item)

              resolve($items)
            })
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    }
  }

  render(content) {
    this.options.render.call(this, content)
    this.trigger(EVENTS.RENDER, content)
  }

  showLoader() {
    if (!this.options.loader) {
      return
    }
    if (!this.$loader) {
      this.$loader = document.createElement('div')
      addClass(this.classes.LOADER, this.$loader)
      this.LOADER = Loader.of(this.$loader, this.options.loader)

      if (this.options.item && this.options.horizontal) {
        setStyle(this.getItemStyle(), this.$loader)
      }
    }
    insertBefore(this.$loader, this.$last)
    this.LOADER.show()
  }

  hideLoader() {
    if (this.$loader) {
      detach(this.$loader)
      this.LOADER.hide()
    }
  }

  observe() {
    this.observer.observe(this.$sentinels)
  }

  unobserve() {
    this.observer.unobserve(this.$sentinels)
  }

  bind() {
    if (this.options.trigger === 'button') {
      bindEvent(
        this.eventName('click'),
        () => {
          this.load()
        },
        this.$button
      )
    } else {
      this.observe()
    }
  }

  unbind() {
    if (this.options.trigger === 'button') {
      removeEvent(this.eventName('click'), this.$button)
    } else {
      this.unobserve()
    }
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
      this.observe()
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
      this.unobserve()
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      if (this.options.horizontal) {
        removeClass(this.classes.HORIZONTAL, this.element)
      }

      if (this.$next) {
        removeClass(this.classes.NEXT, this.$next)
      }

      if (this.$error) {
        this.$error.remove()
      }

      if (this.$end) {
        this.$end.remove()
      }

      if (this.is('loading')) {
        this.resolveLoading()
      }

      this.$sentinels.remove()
      this.observer.disconnect()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Infinite
