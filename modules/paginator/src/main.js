import Component from '@pluginjs/component'
import { isString, isFunction } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { deepMerge } from '@pluginjs/utils'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import List from './components/list'
import Total from './components/total'
import Next from './components/next'
import Prev from './components/prev'
import Jumper from './components/jumper'

const COMPONENTS = {}

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Paginator extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)

    this.currentPage = this.options.currentPage || 1
    this.itemsPerPage = this.options.itemsPerPage
    this.totalItems = this.options.totalItems
    this.totalPages = this.getTotalPages()

    if (this.isOutOfBounds()) {
      this.currentPage = this.totalPages
    }

    this.initClasses(CLASSES)

    addClass(this.classes.ELEMENT, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.setupI18n()
    this.initStates()
    this.initialize()
  }

  initialize() {
    const components = this.options.layout.split(',')
    this.components = []

    const that = this
    let component

    components.forEach(name => {
      name = name.trim()

      if (typeof COMPONENTS[name] !== 'undefined') {
        component = new COMPONENTS[name](that)
        that.components.push(component)
      }
    })

    this.createHtml()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  createHtml() {
    let html = ''
    this.components.forEach(component => {
      html += component.generate()
    })

    this.element.innerHTML = html
  }

  bind() {
    this.components.forEach(component => {
      if (isFunction(component.bind)) {
        component.bind()
      }
    })
  }

  unbind() {
    this.components.forEach(component => {
      if (isFunction(component.unbind)) {
        component.unbind()
      }
    })
  }

  resize() {
    const that = this
    that.trigger(EVENTS.RESIZE)

    this.components.forEach(component => {
      if (isFunction(component.resize)) {
        component.resize()
      }
    })
  }

  goTo(page) {
    page = Math.max(1, Math.min(page, this.totalPages))

    if (page === this.currentPage && this.is('initialized')) {
      return false
    }
    this.currentPage = page

    if (this.is('initialized')) {
      this.trigger(EVENTS.CHANGE, page)
    }
    return undefined
  }

  prev() {
    if (this.hasPreviousPage()) {
      this.goTo(this.getPreviousPage())
      return true
    }

    return false
  }

  next() {
    if (this.hasNextPage()) {
      this.goTo(this.getNextPage())
      return true
    }

    return false
  }

  first() {
    return this.goTo(1)
  }

  last() {
    return this.goTo(this.totalPages)
  }

  // update({totalItems: 10, itemsPerPage: 5, currentPage:3});
  // update('totalPage', 10);
  update(data, value) {
    this.unbind()
    const changes = isString(data) ? [[data, value]] : Object.entries(data)
    const that = this
    changes.map(([k, v]) => (this[k] = v))
    this.totalPages = this.getTotalPages()
    this.components = this.options.layout
      .split(',')
      .map(key => new COMPONENTS[(key.trim())](that))

    this.createHtml()
    this.bind()
  }

  isOutOfBounds() {
    return this.currentPage > this.totalPages
  }

  getItemsPerPage() {
    return this.itemsPerPage
  }

  getTotalItems() {
    return this.totalItems
  }

  getTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
    this.lastPage = this.totalPages
    return this.totalPages
  }

  getCurrentPage() {
    return this.currentPage
  }

  hasPreviousPage() {
    return this.currentPage > 1
  }

  getPreviousPage() {
    if (this.hasPreviousPage()) {
      return this.currentPage - 1
    }
    return false
  }

  hasNextPage() {
    return this.currentPage < this.totalPages
  }

  getNextPage() {
    if (this.hasNextPage()) {
      return this.currentPage + 1
    }
    return false
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
      removeClass(this.classes.DISABLED, this.element)
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
      addClass(this.classes.DISABLED, this.element)
      this.unbind()
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.DISABLED, this.element)
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static registerComponent(name, defination) {
    COMPONENTS[name] = defination
    if (defination.translations) {
      Object.entries(deepMerge(TRANSLATIONS, defination.translations)).forEach(
        ([key, value]) => {
          TRANSLATIONS[key] = value
        }
      )
    }

    if (defination.classes) {
      Object.assign(CLASSES, defination.classes)
    }
  }
}

Paginator.registerComponent('total', Total)
Paginator.registerComponent('next', Next)
Paginator.registerComponent('prev', Prev)
Paginator.registerComponent('list', List)
Paginator.registerComponent('jumper', Jumper)
// Paginator.registerComponent('list', List)

export default Paginator
