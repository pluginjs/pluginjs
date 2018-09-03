import Hammer from 'hammerjs'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { parseHTML, query, insertBefore, wrap, unwrap } from '@pluginjs/dom'
import Breakpoints from '@pluginjs/breakpoints'

class Responsive {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    const options = this.instance.options

    if (options.breakpoint === false || options.breakpoint === null) {
      return
    }

    this.initBreakpoints()

    // init status
    this.mode = this.instance.options.responsiveMode
    this.modeClass = this.instance.getClass(
      this.instance.classes.RESPONSIVE,
      'responsiveMode',
      this.mode
    )

    this.rely = window

    if (options.resizeReference === 'self') {
      this.rely = this.instance.element
    } else if (
      options.resizeReference !== 'window' &&
      query(options.resizeReference)
    ) {
      this.rely = query(options.resizeReference)
    }

    if (Breakpoints.is(`${this.breakpoint}-`)) {
      this.toggle(true)
    }
  }

  initBreakpoints() {
    Breakpoints()
    this.breakpoint = this.instance.options.breakpoint
    const that = this
    Breakpoints.to(that.breakpoint, {
      enter() {
        that.instance.enter('responsive')
        that.toggle(true)
      },
      leave() {
        that.instance.leave('responsive')
        that.toggle(false)
      }
    })
  }

  resize() {
    if (!this.instance.is('built')) {
      return
    }

    if (this.instance.options.responsiveMode !== 'scroll') {
      return
    }

    if (this.instance.is('responsive')) {
      this.scrollInit()
    }
  }

  toggle(isOpen) {
    if (isOpen) {
      this.build()
    } else {
      this.destroy()
    }
  }

  build() {
    if (
      this.instance.is('built') ||
      (this.mode === 'scroll' && this.instance.vertical)
    ) {
      return
    }

    const options = this.instance.options

    if (this.mode === 'drop') {
      if (options.navLabelSelector) {
        this.instance.navLabel = query(
          options.navLabelSelector,
          this.instance.element
        )
      } else {
        this.instance.navLabel = parseHTML(options.navLabelTpl)
        addClass(this.instance.classes.NAVLABEL, this.instance.navLabel)
        insertBefore(this.instance.navLabel, this.instance.$nav)
      }

      this.dropToggle(true)
    } else if (this.mode === 'scroll') {
      if (options.navWrapSelector) {
        this.instance.navWrap = query(
          options.navWrapSelector,
          this.instance.element
        )
      } else {
        const navWrap = parseHTML(options.navWrapTpl)
        addClass(this.instance.classes.NAVWRAP, navWrap)
        wrap(navWrap, this.instance.$nav)

        this.instance.navWrap = query(
          `.${this.instance.classes.NAVWRAP}`,
          this.instance.element
        )
      }

      this.scrollToggle(true)
    }

    addClass(this.modeClass, this.instance.element)

    this.instance.enter('built')
  }

  destroy() {
    if (
      !this.instance.is('built') ||
      (this.mode === 'scroll' && this.instance.vertical)
    ) {
      return
    }

    if (this.mode === 'drop') {
      this.instance.navLabel.remove()

      this.dropToggle(false)
    } else if (this.mode === 'scroll') {
      unwrap(this.instance.$nav)
      this.scrollToggle(false)
    }

    removeClass(this.modeClass, this.instance.element)

    this.instance.leave('built')
  }

  dropToggle(isOpen) {
    if (isOpen) {
      this.instance.navLabel.innerHTML = this.instance.$tabs[
        this.instance.current
      ].innerHTML

      this.navLabel = new Hammer(this.instance.navLabel)
      this.navLabel.on('tap', () => {
        if (this.instance.is('disabled')) {
          return
        }
        if (hasClass(this.instance.classes.DROPOPEN, this.instance.element)) {
          removeClass(this.instance.classes.DROPOPEN, this.instance.element)
        } else {
          addClass(this.instance.classes.DROPOPEN, this.instance.element)
        }
      })
    } else {
      this.navLabel.destroy()
    }
  }

  dropActive(index) {
    removeClass(this.instance.classes.DROPOPEN, this.instance.element)
    this.instance.navLabel.innerHTML = this.instance.$tabs[index].innerHTML
  }

  scrollToggle(isOpen) {
    if (isOpen) {
      this.scrollInit()

      if (!this.instance.is('built')) {
        this.navWrap = new Hammer(this.instance.navWrap)
        this.navWrap.on('panleft panright panup pandown panend', e => {
          if (this.instance.is('disabled')) {
            return
          }

          this.scrollEvents(e)
        })
      }
    } else {
      setStyle('transform', 'none', this.instance.$nav)
      this.navWrap.destroy()
    }
  }

  scrollInit() {
    this.wrapMax =
      this.instance.vertical === true
        ? this.instance.navWrap.clientHeight
        : this.instance.navWrap.clientWidth
    this.innerMax =
      this.instance.vertical === true
        ? this.instance.$nav.scrollHeight
        : this.instance.$nav.scrollWidth

    if (typeof this.delta === 'undefined') {
      this.delta = 0
    }
  }

  scrollEvents(e) {
    let newDelta
    const scrollMax = this.wrapMax - this.innerMax
    const vertical = this.instance.vertical

    const eventDelta = vertical ? e.deltaY : e.deltaX
    newDelta = this.delta + eventDelta

    if (newDelta > 0) {
      newDelta = Math.round(newDelta / 5)
    } else if (newDelta < scrollMax) {
      newDelta = Math.round(scrollMax + (newDelta - scrollMax) / 5)
    }

    switch (e.type) {
      case 'panleft':
      case 'panright':
        if (vertical) {
          return
        }
        break
      case 'panup':
      case 'pandown':
        if (!vertical) {
          return
        }
        break
      case 'panend':
        if (newDelta > 0) {
          newDelta = 0
        } else if (newDelta < scrollMax) {
          newDelta = scrollMax
        }

        this.delta = newDelta
        break
      default:
        break
    }

    const deltaX = vertical ? 0 : newDelta
    const deltaY = vertical ? newDelta : 0

    setStyle(
      { transform: `translate(${deltaX}px, ${deltaY}px)` },
      this.instance.$nav
    )
  }
}
export default Responsive
