import { query } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { compose } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'

export default class Collapse {
  constructor(instance, element, options = {}) {
    this.instance = instance
    this.classes = this.instance.classes
    this.element = element
    this.options = options
    this.initialized = false
    this.isCollapsed = false

    this.$switch = query(`.${this.classes.PACKAGEHEADER}`, this.element)
    this.$content = query(`.${this.classes.PACKAGECONTENT}`, this.element)
    this.$contentinner = query(
      `.${this.classes.PACKAGECONTENTINNER}`,
      this.$content
    )

    this.bind()

    if (this.options.collapsed) {
      this._collapse()
    } else {
      this._expand()
    }

    this.initialized = true
  }

  bind() {
    compose(
      bindEvent(this.instance.eventName('click'), e => {
        if (this.instance.is('disabled')) {
          return
        }
        this.toggle()
        e.preventDefault()
      }),
      bindEvent(this.instance.eventName('touch'), e => {
        if (this.instance.is('disabled')) {
          return
        }
        this.toggle()
        e.preventDefault()
      })
    )(this.$switch)
  }

  unbind() {
    removeEvent(this.instance.eventName(), this.$switch)
  }

  toggle() {
    if (this.isCollapsed) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  collapse() {
    if (!this.initialized || this.isCollapsed || this.instance.is('disabled')) {
      return
    }

    this._collapse()
  }

  _collapse() {
    removeClass(this.classes.PACKAGEEXPANDED, this.element)
    addClass(this.classes.PACKAGECOLLAPSED, this.element)
    this.isCollapsed = true
  }

  expand() {
    if (
      !this.initialized ||
      !this.isCollapsed ||
      this.instance.is('disabled')
    ) {
      return
    }

    this._expand()
  }

  _expand() {
    removeClass(this.classes.PACKAGECOLLAPSED, this.element)
    addClass(this.classes.PACKAGEEXPANDED, this.element)
    this.isCollapsed = false
  }

  static of(...args) {
    return new this(...args)
  }
}
