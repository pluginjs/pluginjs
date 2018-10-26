import Component from '@pluginjs/component'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import { addClass, removeClass } from '@pluginjs/classes'
import Breakpoints from '@pluginjs/breakpoints'
import { isString } from '@pluginjs/is'
import { getWidth, setStyle } from '@pluginjs/styled'
import { query, queryAll } from '@pluginjs/dom'
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Timeline extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    addClass(this.classes.HORIZONTAL, this.element)
    this.$list = query(`.${this.classes.LIST}`, this.element)
    this.$item = query(`.${this.classes.ITEM}`, this.element)
    this.$itemAll = queryAll(`.${this.classes.ITEM}`, this.element)

    this.width = getWidth(this.element)
    // console.log(this.width / 4 * 6)
    setStyle(
      'width',
      `${(this.width / this.$itemAll.length) *
        Number(this.options.visibleItems)}px`,
      this.$list
    )
    // this.listItem = this.listWidth / 6
    // setStyle('width', `${this.listWidth}px`, this.$list)
    // this.$itemAll.forEach(item => {
    //   setStyle('width', `${this.width / 6}px`, item)
    // })

    if (this.options.breakpoint) {
      this.initBreakpoints()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initBreakpoints() {
    Breakpoints.init()
    if (isString(this.options.breakpoint) && this.ensureBreakpoint()) {
      const breakpoint = this.options.breakpoint
      const that = this
      if (Breakpoints.is(`${breakpoint}-`)) {
        removeClass(this.classes.HORIZONTAL, this.element)
      }
      Breakpoints.to(breakpoint, {
        enter() {
          removeClass(that.classes.HORIZONTAL, that.element)
        },
        leave() {
          addClass(that.classes.HORIZONTAL, that.element)
        }
      })
    }
  }

  ensureBreakpoint() {
    if (Breakpoints.all().includes(this.options.breakpoint)) {
      return true
    }

    return false
  }

  resize() {
    if (
      this.element.classList.contains(`${this.classes.HORIZONTAL}`) &&
      !this.is('disabled')
    ) {
      this.getValueStyles()
    }
  }

  getValueStyles() {
    // this.itemWidth = getWidth(this.$item)
    // console.log(this.itemWidth)
    // setStyle('width', `${this.itemWidth * 4}px`, this.element)
    // setStyle('width', `${this.listWidth}px`, this.$list)
    // this.$itemAll.forEach(item => {
    //   setStyle('width', `${this.listItem}px`, item)
    // })
    this.width = getWidth(this.element)
    console.log(this.width)
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

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Timeline
