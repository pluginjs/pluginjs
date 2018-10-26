/* eslint-disable no-undefined */
import Component from '@pluginjs/component'
import '@pluginjs/polyfills/IntersectionObserver'
import { addClass, removeClass } from '@pluginjs/classes'
import { attr, queryAll, query } from '@pluginjs/dom'
import Pj from '@pluginjs/factory'
import { eventable, register, stateable, optionable } from '@pluginjs/decorator'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class ScrollSpy extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.assignValues()
    this.cacheItems()
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.intersectionHandler(entry)
          }
        })
      },
      {
        rootMargin: `-${this.menuHeight}px 0px -${this.scrollItems[0]
          .offsetHeight - this.menuHeight}px 0px`
      }
    )
    this.observe()
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  assignValues() {
    this.lastId = ''
    if (this.options.reference !== 'top') {
      this.menuHeight = -this.options.threshold
    } else {
      this.menuHeight = this.element.offsetHeight + this.options.threshold
    }
    this.menuItems = queryAll(this.options.selector, this.element)
  }

  cacheItems() {
    this.scrollItems = this.menuItems.map(element => {
      const selector = attr(this.options.hrefFrom, element)
      const item = query(selector)
      if (item) {
        return item
      }
      return undefined
    })

    this.scrollItems = this.scrollItems.filter(Boolean)
  }

  intersectionHandler(entry) {
    const id = entry.target.id
    const activeClass = this.options.activeClass
    this.lastId = id

    this.menuItems.forEach(item => {
      let activeElement
      if (this.options.cloestActive) {
        activeElement = item.closest(this.options.cloestActive)
      } else {
        activeElement = item.parentNode
      }

      removeClass(activeClass, activeElement)

      if (attr(this.options.hrefFrom, item) === `#${id}`) {
        addClass(activeClass, activeElement)
        this.trigger(EVENTS.CHANGE, `#${id}`)
      }
    })
  }

  observe() {
    this.scrollItems.forEach(scrollItem => {
      this.observer.observe(scrollItem)
    })
  }

  bind() {
    Pj.emitter.on(this.eventNameWithId('resize'), () => {
      this.observer.disconnect()
      this.cacheItems()
      this.observe()
    })
  }

  unbind() {
    Pj.emitter.off(this.eventNameWithId('resize'))
  }

  getCurrHref() {
    return this.lastId
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.observer.disconnect()
      this.unbind()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default ScrollSpy
