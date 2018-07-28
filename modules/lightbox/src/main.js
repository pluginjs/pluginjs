import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { append, parseHTML, query, queryAll } from '@pluginjs/dom'
import Pj from '@pluginjs/factory'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import ZOOM from './zoom'
import OVERLAY from './components/overlay'
import UTILS from './utils'
import FOOTER from './components/footer/footer'
import SLIDE from './components/slide/slide'
import ARROWS from './components/arrow'
import TOPBAR from './components/topBar'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(true)
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Lightbox extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.setupI18n()

    this.initStates()
    this.initialize()
  }

  initialize() {
    const eventHandler = event => {
      this.openClick(event)
    }

    const eventName = this.getClass('click.{namespace}')

    if (this.options.delegate) {
      this.elements = queryAll(this.options.delegate, this.element)

      bindEvent(
        {
          type: 'click',
          identity: {
            type: 'tagName',
            value: this.options.delegate
          },
          handler: eventHandler
        },
        this.element
      )
    } else {
      this.elements = this.element
      bindEvent(
        {
          type: 'click',
          handler: eventHandler
        },
        this.element
      )
    }

    if (this.options.effect === 'zoom') {
      ZOOM.init(this)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {}

  unbind() {}

  openClick(event) {
    if (event.type) {
      event.preventDefault()
    }

    if (this.options.delegate) {
      for (let i = 0; i < this.elements.length; i++) {
        const target = event.target
        const img = this.elements[i].querySelector('img')
        if (target === img) {
          this.activeIndex = i + 1
          break
        }
      }
    } else {
      this.activeIndex = 1
    }

    if (!this.activeIndex) {
      return
    }
    this.openIndex = this.activeIndex

    this.open()
  }

  open() {
    if (this.is('init')) {
      this.show()
      return
    }

    this.items = this.parseItems()
    this.wrap = this.getElement('wrap')
    this.wrap.setAttribute('tabindex', -1)
    if (this.options.theme === null || this.options.theme === 'white') {
      addClass(this.classes.WHITE, this.wrap)
    } else {
      addClass(this.classes.BLACK, this.wrap)
    }
    this.direction = 'next'
    this.overlay = new OVERLAY(this)
    if (this.options.thumbs) {
      this.footer = new FOOTER(this)
    }
    this.topBar = new TOPBAR(this)
    this.slide = new SLIDE(this)
    if (this.length > 1) {
      this.arrow = new ARROWS(this)
    }

    append(this.wrap, document.body)
    this.show()
    this.enter('init')
  }

  show() {
    if (this.is('show')) {
      return
    }

    this.hideScrollbar()
    this.wrap.style.display = ''

    this.overlay.show()
    if (this.options.thumbs) {
      this.footer.in()
    }
    this.topBar.in()
    if (this.length > 1) {
      this.arrow.in()
    }
    this.slide.show()

    this.trigger('show')
    this.enter('show')
  }

  close() {
    if (!this.is('show')) {
      return
    }

    this.overlay.fadeOut()
    this.slide.fadeOut()
    if (this.options.thumbs) {
      this.footer.out()
    }
    this.topBar.out()
    if (this.length > 1) {
      this.arrow.out()
    }
    setTimeout(() => {
      this.overlay.hide()
      this.wrap.style.display = 'none'
      this.slide.hide()
      this.reserveScrollbar()
    }, 300)

    this.trigger('close')
    this.leave('show')
  }

  next() {
    if (!this.is('enable')) {
      return
    }

    this.activeIndex++
    this.direction = 'next'
    if (this.activeIndex > this.length) {
      this.activeIndex = 1
    }
    // this.slide.goTo(this.activeIndex)
    this.topBar.updateCount()
    this.slide.next()
    if (this.options.thumbs) {
      this.footer.goTo(this.activeIndex)
    }
  }

  pre() {
    if (!this.is('enable')) {
      return
    }

    this.activeIndex--
    this.direction = 'pre'
    if (this.activeIndex < 1) {
      this.activeIndex = this.length
    }

    this.topBar.updateCount()
    this.slide.pre()
    if (this.options.thumbs) {
      this.footer.goTo(this.activeIndex)
    }
  }

  goTo(index) {
    if (index > this.activeIndex) {
      if (!this.is('enable')) {
        return
      }
      this.activeIndex = index

      this.topBar.updateCount()
      this.slide.next()
      if (this.options.thumbs) {
        this.footer.goTo(this.activeIndex)
      }
    } else if (index < this.activeIndex) {
      if (!this.is('enable')) {
        return
      }
      this.activeIndex = index

      this.topBar.updateCount()
      this.slide.pre()
      if (this.options.thumbs) {
        this.footer.goTo(this.activeIndex)
      }
    }
  }

  parseItems() {
    const items = {}
    let count = 1
    this.elements.forEach((el, index) => {
      const item = {}
      item.type = el.dataset.type || 'image'
      item.href = el.getAttribute('href')
      item.poster = el.dataset.poster
      item.sourse = el.dataset.sourse
      item.thumbHref = el.children[0].getAttribute('src')
      item.index = count
      item.element = el
      item.title = el.getAttribute('title') || ''
      item.content = el.getAttribute('content') || ''
      item.loaded = false
      item.loadError = false
      item.hasBind = false

      items[count] = item
      count++
    })
    this.length = count - 1
    return items
  }

  hideScrollbar() {
    const windowStyles = {}

    if (UTILS.hasScrollBar(window.document.documentElement.clientHeight)) {
      const s = UTILS.getScrollbarSize()
      if (s) {
        windowStyles.marginRight += s
      }
    }

    setStyle(windowStyles, query('html'))
    addClass(this.classes.OVERFLOWHIDE, query('html'))
  }

  reserveScrollbar() {
    const windowStyles = {}
    if (UTILS.hasScrollBar(window.document.documentElement.clientHeight)) {
      const s = UTILS.getScrollbarSize()
      if (s) {
        windowStyles.marginRight -= s
      }
    }
    setStyle(windowStyles, query('html'))
    removeClass(this.classes.OVERFLOWHIDE, query('html'))
  }

  getElement(type) {
    const template = this.options.templates[type]
    let html = ''
    if (template) {
      html = templateEngine.render(template.call(this), {
        classes: this.classes
      })
    }
    return parseHTML(html)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
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
}

export default Lightbox
