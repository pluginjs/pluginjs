import { transition, transitionEndEvent } from '@pluginjs/feature'
import is from '@pluginjs/is'
import { bindEventOnce } from '@pluginjs/events'
import { dataset, attr, html, each } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import axios from 'axios'

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
    dataset({ wizardIndex: index }, this.$element)
    // this.$element.data('wizard-index', index)

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
    let selector = dataset('target', this.$element)
    // let selector = this.$element.data('target')

    if (!selector) {
      selector = attr('href', this.$element)
      // selector = this.$element.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
    }

    if (selector) {
      return selector
      // return $(selector)
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

    attr({ ariaExpanded: this.is('active') }, this.$element)
    attr({ ariaExpanded: this.is('active') }, this.pane)
    // this.$element.attr('aria-expanded', this.is('active'))
    // this.pane.attr('aria-expanded', this.is('active'))

    const classes = this.wizard.classes.PANE
    if (this.is('active')) {
      addClass(classes.ACTIVE, this.pane)
      // this.pane.addClass(classes.ACTIVE)
    } else {
      removeClass(classes.ACTIVE, this.pane)
      // this.pane.removeClass(classes.ACTIVE)
    }
  }

  show(callback) {
    if (this.is('activing') || this.is('active')) {
      return
    }

    this.trigger(EVENTS.BEFORESHOW)
    this.enter('activing')

    const classes = this.wizard.classes.PANE

    attr({ ariaExpanded: true }, this.$element)
    // this.$element.attr('aria-expanded', true)

    addClass(classes.ACTIVING, classes.ACTIVE, this.pane)
    attr({ ariaExpanded: true }, this.pane)
    // this.pane
    //   .addClass(classes.ACTIVING)
    //   .addClass(classes.ACTIVE)
    //   .attr('aria-expanded', true)

    const complete = function() {
      removeClass(classes.ACTIVING, this.pane)
      // this.pane.removeClass(classes.ACTIVING)

      this.leave('activing')
      this.enter('active')
      this.trigger(EVENTS.AFTERSHOW)

      if (is.function(callback)) {
        callback.call(this)
      }
      // if ($.isFunction(callback)) {
      //   callback.call(this)
      // }
    }

    if (!transition) {
      complete.call(this)
      return
    }

    bindEventOnce(
      {
        type: transitionEndEvent,
        handler: () => {
          complete.bind(this)
        }
      },
      this.pane
    )

    // this.pane
    //   .one(transitionEndEvent, $.proxy(complete, this))
    //   .asTransitionEnd(this.TRANSITION_DURATION)
  }

  hide(callback) {
    if (this.is('activing') || !this.is('active')) {
      return
    }

    this.trigger(EVENTS.BEFOREHIDE)
    this.enter('activing')

    const classes = this.wizard.classes.PANE

    attr({ ariaExpanded: false }, this.$element)
    // this.$element.attr('aria-expanded', false)

    addClass(classes.ACTIVING, this.pane)
    removeClass(classes.ACTIVE, this.pane)
    attr({ ariaExpanded: false }, this.pane)
    // this.pane
    //   .addClass(classes.ACTIVING)
    //   .removeClass(classes.ACTIVE)
    //   .attr('aria-expanded', false)

    const complete = function() {
      removeClass(classes.ACTIVING, this.pane)
      // this.pane.removeClass(classes.ACTIVING)

      this.leave('activing')
      this.leave('active')
      this.trigger(EVENTS.AFTERHIDE)

      if (is.function(callback)) {
        callback.call(this)
      }
      // if ($.isFunction(callback)) {
      //   callback.call(this)
      // }
    }

    if (!transition) {
      complete.call(this)
      return
    }

    bindEventOnce(
      {
        type: transitionEndEvent,
        handler: () => {
          complete.bind(this)
        }
      },
      this.pane
    )
    // this.pane
    //   .one(transitionEndEvent, $.proxy(complete, this))
    //   .asTransitionEnd(this.TRANSITION_DURATION)
  }

  empty() {
    this.pane.empty()
  }

  load(callback) {
    const that = this
    let loader = this.loader

    if (is.function(loader)) {
      loader = loader.call(this.wizard, this)
    }
    // if ($.isFunction(loader)) {
    //   loader = loader.call(this.wizard, this)
    // }

    if (this.wizard.options.cacheContent && this.loaded) {
      if (is.function(callback)) {
        callback.call(this)
      }
      // if ($.isFunction(callback)) {
      //   callback.call(this)
      // }
      return
    }

    this.trigger(EVENTS.BEFORELOAD)
    this.enter('loading')

    function setContent(content) {
      html(content, that.pane)
      // that.pane.html(content)

      that.leave('loading')
      that.loaded = true
      that.trigger(EVENTS.AFTERLOAD)

      if (is.function(callback)) {
        callback.call(that)
      }
      // if ($.isFunction(callback)) {
      //   callback.call(that)
      // }
    }

    if (is.string(loader)) {
      setContent(loader)
    } else if (is.object(loader) && {}.hasOwnProperty.call(loader, 'url')) {
      that.wizard.options.loading.show.call(that.wizard, that)

      axios(loader.url, loader.settings || {})
        .then(response => {
          setContent(response)
          that.wizard.options.loading.hide.call(that.wizard, that)
        })
        .catch(() => {
          that.wizard.options.loading.fail.call(that.wizard, that)
        })

      // $.ajax(loader.url, loader.settings || {})
      //   .done(data => {
      //     setContent(data)

      //     that.wizard.options.loading.hide.call(that.wizard, that)
      //   })
      //   .fail(() => {
      //     that.wizard.options.loading.fail.call(that.wizard, that)
      //   })
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
    addClass(classes[state.toUpperCase()], this.$element)
    // this.$element.addClass(classes[state.toUpperCase()])

    this.trigger(EVENTS.STATECHANGE, true, state)
  }

  leave(state) {
    if (this.states[state]) {
      this.states[state] = false

      const classes = this.wizard.classes.STEP
      removeClass(classes[state.toUpperCase()], this.$element)
      // this.$element.removeClass(classes[state.toUpperCase()])

      this.trigger(EVENTS.STATECHANGE, false, state)
    }
  }

  setValidatorFromData() {
    const validator = dataset('validator', this.pane)
    if (validator && is.function(window[validator])) {
      this.validator = window[validator]
    }

    // const validator = this.pane.data('validator')
    // if (validator && $.isFunction(window[validator])) {
    //   this.validator = window[validator]
    // }
  }

  setLoaderFromData() {
    const loader = dataset('loader', this.pane)
    // const loader = this.pane.data('loader')

    if (loader) {
      if (is.function(window[loader])) {
        this.loader = window[loader]
      }
      // if ($.isFunction(window[loader])) {
      //   this.loader = window[loader]
      // }
    } else {
      const url = dataset('loaderUrl', this.pane)
      // const url = this.pane.data('loader-url')
      if (url) {
        this.loader = {
          url,
          settings: dataset('settings', this.pane) || {}
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
    if (is.function(handler)) {
      if (is.array(this.events[event])) {
        this.events[event].push(handler)
      } else {
        this.events[event] = [handler]
      }
    }
    // if ($.isFunction(handler)) {
    //   if (is.array(this.events[event])) {
    //     this.events[event].push(handler)
    //   } else {
    //     this.events[event] = [handler]
    //   }
    // }

    return this
  }

  off(event, handler) {
    if (is.function(handler) && is.array(this.events[event])) {
      each(this.events[event], (i, f) => {
        /* eslint consistent-return: "off"*/
        if (f === handler) {
          delete this.events[event][i]
          return false
        }
      })
    }
    // if ($.isFunction(handler) && is.array(this.events[event])) {
    //   $.each(this.events[event], function(i, f) {
    //     /* eslint consistent-return: "off"*/
    //     if (f === handler) {
    //       delete this.events[event][i]
    //       return false
    //     }
    //   })
    // }

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
    if (is.function(validator)) {
      this.validator = validator
    }
    // if ($.isFunction(validator)) {
    //   this.validator = validator
    // }

    return this
  }

  validate() {
    return this.validator.call(this.pane.get(0), this)
  }
}

export default Step
