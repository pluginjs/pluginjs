import Pj from '@pluginjs/factory'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { parent, wrap, append } from '@pluginjs/dom'

class Base {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.element = instance.element
    this.getClass = instance.getClass

    this.initBase()
  }

  initBase() {
    this.$parent = parent(this.element)

    this.$wrap = wrap(
      template.render(this.options.templates.wrap.call(this), {
        classes: this.classes
      }),
      this.element
    )

    this.clone = document.createElement('div')

    this.resetCloneStyle()
    append(this.clone, this.$wrap)

    this.setStyle()

    this.spacing = this.options.spacing
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

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  bind() {
    Pj.emitter.on('scroll', () => {
      this.scrollHandle()
    })

    Pj.emitter.on('resize', () => {
      this.resizeHandle()
    })
  }

  resizeHandle() {
    this.resetCloneStyle()
  }

  defaultEle() {
    if (this.instance.is('default')) {
      return
    }
    this.hideClone()

    this.changeStatus('default')

    this.instance.trigger(this.instance.EVENTS.UNSTICKY)
  }

  stickyEle() {
    if (this.instance.is('sticky')) {
      return
    }
    this.showClone()

    this.changeStatus('sticky')

    this.instance.trigger(this.instance.EVENTS.STICKY)
  }

  stuckEle() {
    if (this.instance.is('stuck')) {
      return
    }
    this.showClone()

    this.changeStatus('stuck')

    this.instance.trigger(this.instance.EVENTS.STUCK)
  }

  // todo  if not relative
  setStyle() {
    addClass(this.classes.PARENT, this.$parent)

    addClass(this.getClass('{namespace}-hidden'), this.clone)
    this.hideClone()
  }

  changeStatus(newStatus) {
    this.stateSet.forEach(s => {
      if (s.status === newStatus) {
        this.instance.enter(s.status)
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
        this.instance.leave(s.status)
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

  showClone() {
    this.clone.style.display = ''
  }

  hideClone() {
    this.clone.style.display = 'none'
  }
}

export default Base
