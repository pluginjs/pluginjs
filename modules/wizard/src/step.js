import { transition, transitionEndEvent } from '@pluginjs/feature'
import { isString, isArray, isObject, isFunction } from '@pluginjs/is'
import { bindEventOnce, trigger } from '@pluginjs/events'
import { data, attr, html, each, setData, getData, query } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
// import axios from 'axios'
// import fetch from 'fetch'
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
    this.$element = element
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
    setData('wizard-index', index, this.$element)

    this.pane = this.getPaneFromTarget()
    if (!this.pane) {
      this.pane = this.wizard.options.getPane.call(
        this.wizard,
        index,
        this.wizard.element,
        this.wizard.classes.PANE
      )
    }

    this.setValidatorFromData()
    this.setLoaderFromData()
  }

  getPaneFromTarget() {
    let selector = getData('target', this.$element)

    if (!selector) {
      selector = attr('href', this.$element)
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
    }

    if (selector) {
      return query(selector, this.wizard.element)
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
    this.$element.setAttribute('aria-expanded', this.is('active'))
    this.pane.setAttribute('aria-expanded', this.is('active'))

    const classes = this.wizard.classes.PANE
    if (this.is('active')) {
      addClass(classes.ACTIVE, this.pane)
    } else {
      removeClass(classes.ACTIVE, this.pane)
    }
  }

  show(callback) {
    if (this.is('activing') || this.is('active')) {
      return
    }

    this.trigger(EVENTS.BEFORESHOW)
    this.enter('activing')

    const classes = this.wizard.classes.PANE
    this.$element.setAttribute('aria-expanded', true)

    addClass(classes.ACTIVING, classes.ACTIVE, this.pane)
    this.pane.setAttribute('aria-expanded', true)

    const complete = function() {
      removeClass(classes.ACTIVING, this.pane)

      this.leave('activing')
      this.leave('disabled')
      this.enter('active')
      this.trigger(EVENTS.AFTERSHOW)

      if (isFunction(callback)) {
        callback.call(this)
      }
    }

    if (!transition) {
      complete.call(this)
      return
    }

    bindEventOnce(
      transitionEndEvent(),
      () => {
        complete.bind(this)()
      },
      this.pane
    )
    this.emulateTransitionEnd(this.pane, this.TRANSITION_DURATION)
  }

  hide(callback) {
    if (this.is('activing') || !this.is('active')) {
      return
    }

    this.trigger(EVENTS.BEFOREHIDE)
    this.enter('activing')

    const classes = this.wizard.classes.PANE

    this.$element.setAttribute('aria-expanded', false)

    addClass(classes.ACTIVING, this.pane)
    removeClass(classes.ACTIVE, this.pane)
    this.pane.setAttribute('aria-expanded', false)

    const complete = function() {
      removeClass(classes.ACTIVING, this.pane)

      this.leave('activing')
      this.leave('active')
      this.trigger(EVENTS.AFTERHIDE)

      if (isFunction(callback)) {
        callback.call(this)
      }
    }

    if (!transition) {
      complete.call(this)
      return
    }
    bindEventOnce(
      transitionEndEvent(),
      () => {
        complete.bind(this)()
      },
      this.pane
    )
    this.emulateTransitionEnd(this.pane, this.TRANSITION_DURATION)
  }

  emulateTransitionEnd(el, duration) {
    let called = false

    bindEventOnce(
      transitionEndEvent(),
      () => {
        called = true
      },
      el
    )

    const callback = () => {
      if (!called) {
        trigger(transitionEndEvent(), el)
      }
    }
    setTimeout(callback, duration)
  }

  empty() {
    this.pane.empty()
  }

  load(callback) {
    const that = this
    let loader = this.loader
    if (isFunction(loader)) {
      loader = loader.call(this.wizard, this)
    }

    if (this.wizard.options.cacheContent && this.loaded) {
      if (isFunction(callback)) {
        callback.call(this)
      }
      return
    }

    this.trigger(EVENTS.BEFORELOAD)
    this.enter('loading')

    function setContent(content) {
      html(content, that.pane)

      that.leave('loading')
      that.loaded = true
      that.trigger(EVENTS.AFTERLOAD)

      if (isFunction(callback)) {
        callback.call(that)
      }
    }
    if (isString(loader)) {
      setContent(loader)
    } else if (isObject(loader) && {}.hasOwnProperty.call(loader, 'url')) {
      that.wizard.options.loading.show.call(that.wizard, that)

      // axios(loader.url, loader.settings || {})
      //   .then(response => {
      //     setContent(response)
      //     that.wizard.options.loading.hide.call(that.wizard, that)
      //   })
      //   .catch(() => {
      //     that.wizard.options.loading.fail.call(that.wizard, that)
      //   })
      fetch(loader.url, loader.settings || {})
        .then(response => {
          // setContent(response.json())
          response.json().then(data => setContent(data))
          that.wizard.options.loading.hide.call(that.wizard, that)
        })
        .catch(() => {
          that.wizard.options.loading.fail.call(that.wizard, that)
        })
    } else {
      setContent('')
    }
  }

  trigger(event, ...args) {
    if (isArray(this.events[event])) {
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
    addClass(classes[state.toUpperCase()], this.pane)
    addClass(classes[state.toUpperCase()], this.$element)

    this.trigger(EVENTS.STATECHANGE, true, state)
  }

  leave(state) {
    if (this.states[state]) {
      this.states[state] = false

      const classes = this.wizard.classes.STEP
      removeClass(classes[state.toUpperCase()], this.pane)
      removeClass(classes[state.toUpperCase()], this.$element)

      this.trigger(EVENTS.STATECHANGE, false, state)
    }
  }

  setValidatorFromData() {
    const validator = data('validator', this.pane)
    if (validator && isFunction(window[validator])) {
      this.validator = window[validator]
    }
  }

  setLoaderFromData() {
    const loader = getData('loader', this.pane)
    // const loader = this.pane.data('loader')

    if (loader) {
      if (isFunction(window[loader])) {
        this.loader = window[loader]
      }
    } else {
      const url = getData('loader-url', this.pane)
      // const url = this.pane.data('loader-url')
      if (url) {
        this.loader = {
          url,
          settings: data('settings', this.pane) || {}
          // settings: this.pane.data('settings') || {}
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
    if (isFunction(handler)) {
      if (isArray(this.events[event])) {
        this.events[event].push(handler)
      } else {
        this.events[event] = [handler]
      }
    }

    return this
  }

  off(event, handler) {
    if (isFunction(handler) && isArray(this.events[event])) {
      each(this.events[event], (i, f) => {
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
    if (isFunction(validator)) {
      this.validator = validator
    }

    return this
  }

  validate() {
    return this.validator.call(this.pane, this)
    // return this.validator.call(this.pane.get(0), this)
  }
}

export default Step
