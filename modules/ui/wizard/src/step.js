import { transition, transitionEndEvent } from '@pluginjs/feature'
import is from '@pluginjs/is'

import Pj from '@pluginjs/pluginjs'

const EVENTS = {
  BEFORESHOW: 'beforeShow',
  BEFOREHIDE: 'beforeHide',
  BEFORELOAD: 'beforeLoad',
  AFTERSHOW: 'afterShow',
  AFTERHIDE: 'afterHide',
  AFTERLOAD: 'afterLoad',
  STATECHANGE: 'stateChange'
}

class Step {
  constructor(element, wizard, index) {
    this.TRANSITION_DURATION = 200

    this.initialize(element, wizard, index)
  }

  initialize(element, wizard, index) {
    this.$element = $(element)
    this.wizard = wizard

    this.events = {}
    this.loader = null
    this.loaded = false

    this.validator = this.wizard.options.validator

    this.states = {
      done: false,
      error: false,
      active: false,
      disabled: false,
      activing: false
    }

    this.index = index
    this.$element.data('wizard-index', index)

    this.$pane = this.getPaneFromTarget()

    if (!this.$pane) {
      this.$pane = this.wizard.options.getPane.call(
        this.wizard,
        index,
        element,
        this.wizard.classes.PANE
      )
    }

    this.setValidatorFromData()
    this.setLoaderFromData()
  }

  getPaneFromTarget() {
    let selector = this.$element.data('target')

    if (!selector) {
      selector = this.$element.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
    }

    if (selector) {
      return $(selector)
    }
    return null
  }

  setup() {
    const current = this.wizard.currentIndex()
    if (this.index === current) {
      this.enter('active')

      if (this.loader) {
        this.load()
      }
    } else if (this.index > current) {
      this.enter('disabled')
    }

    this.$element.attr('aria-expanded', this.is('active'))
    this.$pane.attr('aria-expanded', this.is('active'))

    const classes = this.wizard.classes.PANE
    if (this.is('active')) {
      this.$pane.addClass(classes.ACTIVE)
    } else {
      this.$pane.removeClass(classes.ACTIVE)
    }
  }

  show(callback) {
    if (this.is('activing') || this.is('active')) {
      return
    }

    this.trigger(EVENTS.BEFORESHOW)
    this.enter('activing')

    const classes = this.wizard.classes.PANE

    this.$element.attr('aria-expanded', true)

    this.$pane
      .addClass(classes.ACTIVING)
      .addClass(classes.ACTIVE)
      .attr('aria-expanded', true)

    const complete = function() {
      this.$pane.removeClass(classes.ACTIVING)

      this.leave('activing')
      this.enter('active')
      this.trigger(EVENTS.AFTERSHOW)

      if ($.isFunction(callback)) {
        callback.call(this)
      }
    }

    if (!transition) {
      complete.call(this)
      return
    }

    this.$pane
      .one(transitionEndEvent, $.proxy(complete, this))
      .asTransitionEnd(this.TRANSITION_DURATION)
  }

  hide(callback) {
    if (this.is('activing') || !this.is('active')) {
      return
    }

    this.trigger(EVENTS.BEFOREHIDE)
    this.enter('activing')

    const classes = this.wizard.classes.PANE

    this.$element.attr('aria-expanded', false)

    this.$pane
      .addClass(classes.ACTIVING)
      .removeClass(classes.ACTIVE)
      .attr('aria-expanded', false)

    const complete = function() {
      this.$pane.removeClass(classes.ACTIVING)

      this.leave('activing')
      this.leave('active')
      this.trigger(EVENTS.AFTERHIDE)

      if ($.isFunction(callback)) {
        callback.call(this)
      }
    }

    if (!transition) {
      complete.call(this)
      return
    }

    this.$pane
      .one(transitionEndEvent, $.proxy(complete, this))
      .asTransitionEnd(this.TRANSITION_DURATION)
  }

  empty() {
    this.$pane.empty()
  }

  load(callback) {
    const that = this
    let loader = this.loader

    if ($.isFunction(loader)) {
      loader = loader.call(this.wizard, this)
    }

    if (this.wizard.options.cacheContent && this.loaded) {
      if ($.isFunction(callback)) {
        callback.call(this)
      }
      return
    }

    this.trigger(EVENTS.BEFORELOAD)
    this.enter('loading')

    function setContent(content) {
      that.$pane.html(content)

      that.leave('loading')
      that.loaded = true
      that.trigger(EVENTS.AFTERLOAD)

      if ($.isFunction(callback)) {
        callback.call(that)
      }
    }

    if (is.string(loader)) {
      setContent(loader)
    } else if (is.object(loader) && loader.hasOwnProperty('url')) {
      that.wizard.options.loading.show.call(that.wizard, that)

      $.ajax(loader.url, loader.settings || {})
        .done(data => {
          setContent(data)

          that.wizard.options.loading.hide.call(that.wizard, that)
        })
        .fail(() => {
          that.wizard.options.loading.fail.call(that.wizard, that)
        })
    } else {
      setContent('')
    }
  }

  trigger(event, ...args) {
    if (is.array(this.events[event])) {
      for (const i in this.events[event]) {
        if ({}.hasOwnProperty.call(this.events[event], i)) {
          this.events[event][i](...args)
        }
      }
    }

    this.wizard.trigger(...[event, this].concat(args))
  }

  enter(state) {
    this.states[state] = true

    const classes = this.wizard.classes.STEP
    this.$element.addClass(classes[state.toUpperCase()])

    this.trigger(EVENTS.STATECHANGE, true, state)
  }

  leave(state) {
    if (this.states[state]) {
      this.states[state] = false

      const classes = this.wizard.classes.STEP
      this.$element.removeClass(classes[state.toUpperCase()])

      this.trigger(EVENTS.STATECHANGE, false, state)
    }
  }

  setValidatorFromData() {
    const validator = this.$pane.data('validator')
    if (validator && $.isFunction(window[validator])) {
      this.validator = window[validator]
    }
  }

  setLoaderFromData() {
    const loader = this.$pane.data('loader')

    if (loader) {
      if ($.isFunction(window[loader])) {
        this.loader = window[loader]
      }
    } else {
      const url = this.$pane.data('loader-url')
      if (url) {
        this.loader = {
          url,
          settings: this.$pane.data('settings') || {}
        }
      }
    }
  }

  /*
   * Public methods below
   */
  active() {
    return this.wizard.goTo(this.index)
  }

  on(event, handler) {
    if ($.isFunction(handler)) {
      if (is.array(this.events[event])) {
        this.events[event].push(handler)
      } else {
        this.events[event] = [handler]
      }
    }

    return this
  }

  off(event, handler) {
    if ($.isFunction(handler) && is.array(this.events[event])) {
      $.each(this.events[event], function(i, f) {
        /* eslint consistent-return: "off"*/
        if (f === handler) {
          delete this.events[event][i]
          return false
        }
      })
    }

    return this
  }

  is(state) {
    return this.states[state] && this.states[state] === true
  }

  reset() {
    for (const state in this.states) {
      if ({}.hasOwnProperty.call(this.states, state)) {
        this.leave(state)
      }
    }
    this.setup()

    return this
  }

  setLoader(loader) {
    this.loader = loader

    if (this.is('active')) {
      this.load()
    }

    return this
  }

  setValidator(validator) {
    if ($.isFunction(validator)) {
      this.validator = validator
    }

    return this
  }

  validate() {
    return this.validator.call(this.$pane.get(0), this)
  }
}

export default Step
