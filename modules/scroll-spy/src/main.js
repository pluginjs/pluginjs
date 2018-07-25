import Component from '@pluginjs/component'
import { debounce } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { offset } from '@pluginjs/styled'
import { attr, queryAll, query } from '@pluginjs/dom'
import Pj from '@pluginjs/pluginjs'
import { eventable, register, stateable, optionable } from '@pluginjs/decorator'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@eventable(EVENTS)
@stateable()
@optionable(true)
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS
})
class ScrollSpy extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.assignValues()
    this.cacheItems()
    this.scrollFn()

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    Pj.emitter.on('resize', this.resizeHandle.bind(this))
    Pj.emitter.on('scroll', this.scrollHandle.bind(this))
  }

  unbind() {
    Pj.emitter.off('resize', this.resizeHandle)
    Pj.emitter.off('scroll', this.scrollHandle)
  }

  resizeHandle() {
    if (this.is('disable')) {
      return
    }
    this.assignValues()
    this.cacheItems()
    this.scrollFn()
  }

  scrollHandle() {
    if (this.is('disable')) {
      return
    }
    this.scrollFn()
  }

  assignValues() {
    this.currScrollTop = 0
    this.lastId = ''
    if (this.options.reference !== 'top') {
      this.menuHeight = -this.options.threshold
    } else {
      this.menuHeight = this.element.offsetHeight + this.options.threshold
    }
    this.menuItems = queryAll(this.options.itemSelector, this.element)
  }

  cacheItems() {
    this.scrollItems = this.menuItems.map(element => {
      const selector = attr(this.options.hrefFrom, element)
      const item = query(selector)
      if (item) {
        const _offset = offset(item).top
        return {
          item,
          offset: _offset
        }
      }
      return undefined
    })

    this.scrollItems = this.scrollItems.filter(Boolean)
  }

  scrollFn() {
    const st = this.scrollTop()

    if (this.currScrollTop !== st || !this.is('initialized')) {
      this.currScrollTop = st
      this.tick()
    }
  }

  tick() {
    const fromTop = this.currScrollTop + this.menuHeight
    const inViewElements = this.scrollItems
      .filter(item => item.offset < fromTop)
      .map(item => item.item)

    this.activateItem(inViewElements.pop())
  }

  activateItem(inViewElement) {
    const id = inViewElement ? inViewElement.id : ''
    const activeClass = this.options.activeClass

    if (this.lastId !== id) {
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
          if (activeClass) {
            addClass(activeClass, activeElement)
          }
          this.trigger(EVENTS.CHANGE, `#${this.lastId}`)

          if (this.options.changeHash) {
            this.debouncedHashFn()()
          }
        }
      })
    }
  }

  debouncedHashFn() {
    return debounce(() => {
      if (history.replaceState) {
        history.replaceState(null, null, `#${this.lastId}`)
      } else {
        const st = this.scrollTop()
        window.location.hash = this.lastId
        window.scrollTo(0, st)
      }
    }, this.options.hashTimeout)
  }

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
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
      this.unbind()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default ScrollSpy
