import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, offset } from '@pluginjs/styled'
import { sticky as canSticky } from '@pluginjs/feature'
import { parent, wrap, append, closest } from '@pluginjs/dom'
import Pj from '@pluginjs/factory'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Sticky extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.NAMESPACE, this.element)
    this.canSticky = null
    this.initWrap()
    this.$parent = parent(this.$wrap)

    this.spacing = this.options.spacing
    this.clone = document.createElement('div')

    this.resetCloneStyle()
    this.resetStickyStyle()

    append(this.clone, this.$wrap)
    addClass(this.classes.PARENT, this.$parent)
    addClass(this.getClass('{namespace}-hidden'), this.clone)

    this.hideClone()

    this.initState()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initWrap() {
    this.$wrap = closest(this.options.wrapSelector, this.element)
    if (!this.$wrap || this.$wrap !== parent(this.element)) {
      this.$wrap = wrap(
        template.render(this.options.templates.wrap.call(this), {
          classes: this.classes
        }),
        this.element
      )
    }
  }

  resetCloneStyle() {
    const elementOffset = this.element.getBoundingClientRect()
    const nodeComputedStyle = getComputedStyle(this.element)
    setStyle(
      {
        width: `${elementOffset.right - elementOffset.left}px`,
        height: `${elementOffset.bottom - elementOffset.top}px`,
        marginTop: `${nodeComputedStyle.marginTop}px`,
        marginBottom: `${nodeComputedStyle.marginBottom}px`,
        marginLeft: `${nodeComputedStyle.marginLeft}px`,
        marginRight: `${nodeComputedStyle.marginRight}px`,
        cssFloat: nodeComputedStyle.cssFloat,
        padding: 0,
        border: 0,
        borderSpacing: 0,
        position: 'static'
      },
      this.clone
    )
  }

  resetStickyStyle() {
    setStyle(
      {
        width: `${this.$wrap.clientWidth}px`
      },
      this.element
    )
  }

  initState() {
    this.triggerStyle = {
      top: {
        def: this.element.style.top || 'auto',
        now: this.spacing
      },
      bottom: {
        def: this.element.style.bottom || 'auto',
        now: 0
      }
    }

    this.stateSet = [
      {
        status: 'sticky',
        className: this.classes.STICKY,
        styles: ['top']
      },
      {
        status: 'stuck',
        className: this.classes.STUCK,
        styles: ['bottom']
      },
      {
        status: 'default',
        spacing: false
      }
    ]
  }

  scrollHandle() {
    this.scroll = this.scrollTop()
    const parentBottom = offset(this.$parent).top + this.$parent.clientHeight
    this.isSticky = offset(this.$wrap).top - this.options.spacing
    this.isStuck = parentBottom - this.$wrap.clientHeight - this.options.spacing
    if (this.scroll > this.isSticky && this.scroll < this.isStuck) {
      this.stickyEle()
    } else if (this.scroll > this.isStuck && this.scroll < parentBottom) {
      this.stuckEle()
    } else {
      this.defaultEle()
    }
  }

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  stickyEle() {
    if (this.is('sticky')) {
      return
    }
    this.showClone()

    this.changeStatus('sticky')

    this.trigger(EVENTS.STICKY)
  }

  stuckEle() {
    if (this.is('stuck')) {
      return
    }
    this.showClone()

    this.changeStatus('stuck')

    this.trigger(EVENTS.STUCK)
  }

  defaultEle() {
    if (this.is('default')) {
      return
    }
    this.hideClone()

    this.changeStatus('default')

    this.trigger(EVENTS.UNSTICKY)
  }

  changeStatus(newStatus) {
    this.stateSet.forEach(s => {
      if (s.status === newStatus) {
        this.enter(s.status)
        if (s.className) {
          addClass(s.className, this.element)
        }
        if (s.styles) {
          s.styles.forEach(type => {
            const val = `${parseInt(this.triggerStyle[type].now, 0)}px`
            this.element.style[type] = val
          })
        }
      } else {
        this.leave(s.status)
        if (s.className) {
          removeClass(s.className, this.element)
        }
        if (s.styles) {
          s.styles.forEach(type => {
            const val = this.triggerStyle[type].def
            this.element.style[type] = val
          })
        }
      }
    })
  }

  setSticky() {
    setStyle('position', 'sticky', this.element)
    const { spacing } = this.options
    setStyle('top', `${parseInt(spacing, 10)}px`, this.element)
  }

  resizeHandle() {
    this.resetCloneStyle()
    this.resetStickyStyle()
  }

  bind() {
    Pj.emitter.on('scroll', () => {
      this.scrollHandle()
    })

    Pj.emitter.on('resize', () => {
      this.resizeHandle()
    })
  }

  showClone() {
    this.clone.style.display = ''
  }

  hideClone() {
    this.clone.style.display = 'none'
  }

  offset(el) {
    const box = el.getBoundingClientRect()

    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
  }

  canSticky() {
    if (!this.canSticky) {
      this.canSticky = canSticky()
    }

    return this.canSticky
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
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Sticky
