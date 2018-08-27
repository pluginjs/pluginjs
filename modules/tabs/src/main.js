import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  append,
  parseHTML,
  query,
  insertAfter,
  children,
  closest,
  getData
} from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import Effect from './effect'
import Hammer from 'hammerjs'
import History from './history'
import Keyboard from './keyboard'
import Responsive from './responsive'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
// import axios from 'axios'
// import fetch from 'fetch'
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Tabs extends Component {
  constructor(element, options = {}) {
    super(element)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    this.initStates()
    this.initialize()
  }

  initialize() {
    if (this.is('initialized')) {
      return
    }

    this.initPointer()
    this.initStatus()
    this.processHtml()

    if (this.vertical) {
      // the min height of panel
      this.panelMinHeight = this.getPanelMinHeight()
    }

    this.bind()

    this.EFFECT = new Effect(this)
    this.KEYBOARD = new Keyboard(this)
    this.HISTORY = new History(this)

    this.initActive()

    this.RESPONSIVE = new Responsive(this)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initPointer() {
    if (this.options.navSelector) {
      this.$nav = children(this.element)[0]
    } else {
      this.$nav = children(this.element)[0]
    }

    if (this.options.contentSelector === '+') {
      this.$content = this.$nav.nextElementSibling
    } else {
      this.$content = query(this.options.contentSelector, this.element)
    }
    this.$tabs = children(this.$nav)
    this.panes = this.$content ? children(this.$content) : null

    this.size = this.$tabs.length
    this.$loading = parseHTML(`<span class=${this.classes.LOADING}"></span>`)
  }

  initStatus() {
    this.vertical = false
    this.previous = null
    this.current = 0

    if (this.options.ajax === true) {
      this.ajax = []
      this.$tabs.forEach(n => {
        this.ajax.push({ href: getData('href', n) })
      })
    }
  }

  processHtml() {
    addClass(this.classes.ELEMENT, this.element)
    addClass(this.classes.NAV, this.$nav)
    addClass(this.classes.CONTENT, this.$content)

    // theme : excuting after all elements are generated
    if (this.options.theme) {
      // add theme to wrap

      addClass(this.getThemeClass(), this.element)
    }

    this.navPosition()
  }

  initActive() {
    const activeItem = query(`.${this.classes.ACTIVE}`, this.$nav)

    if (activeItem) {
      const index = this.$tabs.indexOf(activeItem)
      this.active(index, false)
    } else if (this.options.initialIndex >= 0) {
      this.active(this.options.initialIndex, false)

      if (this.options.ajax === true) {
        this.ajaxLoad(this.options.initialIndex)
      }
    }
  }

  navPosition() {
    let position = 'topleft'
    const positions = [
      'left',
      'right',
      'topleft',
      'topright',
      'topcenter',
      'topjustify',
      'bottomleft',
      'bottomright',
      'bottomcenter',
      'bottomjustify'
    ]

    if (positions.includes(this.options.navPosition)) {
      position = this.options.navPosition

      if (position === 'left' || position === 'right') {
        this.vertical = true

        addClass(`${this.classes.NAMESPACE}-vertical`, this.element)
      }
    }

    addClass(`${this.classes.NAMESPACE}-${position}`, this.element)
  }

  resize() {
    this.resetHeight()
    this.RESPONSIVE.resize()
    this.trigger(EVENTS.RESIZE)
  }

  getPanelMinHeight() {
    let tempHeight = 0

    Array.from(this.$nav.children).forEach(tab => {
      tempHeight += tab.clientHeight
    })

    return tempHeight
  }

  bind() {
    // nav event
    this.navEvent = new Hammer(this.$nav)

    this.navEvent.on('tap', e => {
      if (this.is('disabled')) {
        return
      }

      const li = e.target.closest('li')
      const index = this.$tabs.indexOf(li)

      this.active(index)
    })

    bindEvent(
      this.eventNameWithId('click'),
      e => {
        const target = e.target

        if (!closest(`.${this.classes.NAMESPACE}`, target)) {
          removeClass(this.classes.DROPOPEN, this.element)
        }
      },
      window.document
    )
  }

  unbind() {
    this.navEvent.destroy()
    removeEvent(this.eventNameWithId('click'), window.document)
  }

  resetHeight() {
    this.previousHeight = this.panes[this.current].clientHeight

    if (this.vertical) {
      this.previousHeight = Math.max(this.previousHeight, this.panelMinHeight)
    }

    this.EFFECT.active()
  }

  active(index, update = true) {
    if (index === -1 || (update && this.current === index)) {
      return
    }

    this.previousHeight = this.panes[this.current].clientHeight

    if (this.vertical) {
      this.previousHeight = Math.max(this.previousHeight, this.panelMinHeight)
    }

    this.previous = this.current
    this.current = index

    removeClass(this.classes.ACTIVE, this.$tabs[this.previous])
    addClass(this.classes.ACTIVE, this.$tabs[index])

    if (this.options.effect !== false) {
      this.EFFECT.animation(this.previous, index)
    } else {
      removeClass(this.classes.ACTIVE, this.panes[this.previous])
      addClass(this.classes.ACTIVE, this.panes[index])
    }

    if (this.options.ajax === true) {
      this.ajaxLoad(index)
    }

    if (this.is('built')) {
      if (this.options.responsiveMode === 'drop') {
        this.RESPONSIVE.dropActive(index)
      }
    }

    if (update !== false) {
      if (!this.options.effect) {
        this.EFFECT.active()
      }

      this.trigger(EVENTS.ACTIVE, index)

      this.HISTORY.update()
      this.trigger(EVENTS.UPDATE)
    }
  }

  // ajaxLoad(index) {
  //   this.showLoading()

  //   if (!(this.options.cached === true && this.ajax[index].cached === true)) {
  //     axios(this.ajax[index].href)
  //       .then(response => {
  //         this.ajax[index].cached = true
  //         this.hideLoading()
  //         this.panes[index].html(response.data)
  //       })
  //       .catch(() => {
  //         this.hideLoading()
  //         this.panes[index].html('Not Found')
  //       })
  //       .then(() => {
  //         this.trigger(EVENTS.LOADED, index)
  //       })
  //   }
  // }
  ajaxLoad(index) {
    this.showLoading()

    if (!(this.options.cached === true && this.ajax[index].cached === true)) {
      fetch(this.ajax[index].href)
        .then(response => {
          this.ajax[index].cached = true
          this.hideLoading()
          // this.panes[index].html(response.json())
          response.json().then(data => this.panes[index].html(data))
        })
        .catch(() => {
          this.hideLoading()
          this.panes[index].html('Not Found')
        })
        .then(() => {
          this.trigger(EVENTS.LOADED, index)
        })
    }
  }

  showLoading() {
    append(this.$loading, this.$content)
  }

  hideLoading() {
    this.$loading.remove()
  }

  update(options) {
    if (this.is('disabled')) {
      return
    }

    if (typeof options !== 'undefined') {
      for (const m in options) {
        if (Object.prototype.hasOwnProperty.call(options, m)) {
          this.options[m] = options[m]
        }
      }
    }

    this.trigger(EVENTS.UPDATE)
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }

    removeClass(this.classes.DISABLED, this.element)
    this.trigger(EVENTS.ENABLE)
  }

  disabled() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    addClass(this.classes.DISABLED, this.element)
    this.trigger(EVENTS.DISABLED)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.RESPONSIVE.destroy()

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  getTabs() {
    return this.$tabs
  }

  getPanes() {
    return this.panes
  }

  getCurrentPane() {
    return this.panes[this.current]
  }

  getCurrentTab() {
    return this.$tabs[this.current]
  }

  getIndex() {
    return this.current
  }

  getSize() {
    return this.size
  }

  next() {
    const current = this.current < this.size - 1 ? this.current + 1 : 0
    this.active(current)

    return this
  }

  prev() {
    const current =
      this.current === 0 ? Math.abs(1 - this.size) : this.current - 1
    this.active(current)

    return this
  }

  add(label, content, index) {
    const newPane = this.panes[0].cloneNode(true)
    removeClass(this.classes.ACTIVE, newPane)
    newPane.style = ''
    newPane.innerHTML = content

    const newTab = this.$tabs[0].cloneNode(true)
    removeClass(this.classes.ACTIVE, newTab)
    newTab.style = ''
    newTab.innerHTML = label

    index = index < 0 ? 0 : index
    index = index > this.size + 1 ? this.size + 1 : index

    if (index === 0) {
      append(newTab, this.$nav)
      append(newPane, this.$content)
      this.current++
    } else {
      insertAfter(newTab, this.$tabs[index - 1])
      insertAfter(newPane, this.panes[index - 1])
    }

    this.initPointer()

    if (this.vertical) {
      this.panelMinHeight = this.getPanelMinHeight()

      this.EFFECT.active()
    }

    return this
  }

  append(label, content) {
    return this.add(label, content, this.size)
  }

  remove(index) {
    if (index > this.size || index < 0 || this.size === 0) {
      return this
    }

    this.$tabs[index].remove()
    this.panes[index].remove()

    this.initPointer()

    if (this.vertical) {
      this.panelMinHeight = this.getPanelMinHeight()
    }

    if (index < this.current) {
      this.current--
    }

    if (index < this.previous) {
      this.previous--
    }

    if (this.current === index) {
      if (index > this.size) {
        index = 0
      }

      this.active(index, true)
    }

    return this
  }

  revert(update) {
    let index = 0
    if (this.options.initialIndex) {
      index = this.options.initialIndex
    }

    this.active(index, update)

    return this
  }
}

export default Tabs
