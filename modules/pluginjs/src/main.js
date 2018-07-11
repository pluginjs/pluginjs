// import './polyfills'
import Emitter from '@pluginjs/emitter'
import GlobalComponent from '@pluginjs/global-plugin'
import I18N from '@pluginjs/i18n'
import is from '@pluginjs/is'
import { deepMerge, camelize, throttle } from '@pluginjs/utils'
import { trigger } from '@pluginjs/events'

const envParamters = {
  body: window.document.body,
  doc: window.document
}

if (!window.Pj) {
  window.Pj = {
    ...envParamters,
    emitter: new Emitter(),
    plugins: {},
    instances: {},
    get windowWidth() {
      return window.document.documentElement.clientWidth
    },
    get windowHeight() {
      return window.document.documentElement.clientHeight
    },
    get(name) {
      if (this.has(name)) {
        return this.plugins[name]
      }
      return null
    },
    has(name) {
      if (typeof this.plugins[name] !== 'undefined') {
        return true
      }
      return false
    }
  }
}

const Pj = window.Pj

function globalResizeHandle() {
  Pj.emitter.emit('resize')
}

function globalScrollHanle() {
  Pj.emitter.emit('scroll')
}

export function register(name, obj = {}) {
  return function(plugin) {
    const {
      defaults: options = {},
      methods = [],
      dependencies = {},
      ...others
    } = obj

    Pj.instances[name] = []

    Pj.plugins[name] = Object.assign(plugin, {
      setDefaults(options = {}) {
        plugin.defaults = deepMerge(plugin.defaults, options)
      },
      defaults: plugin.defaults ? deepMerge(plugin.defaults, options) : options,
      methods: plugin.methods ? deepMerge(plugin.methods, methods) : methods,
      dependencies: plugin.dependencies
        ? deepMerge(plugin.dependencies, dependencies)
        : dependencies,
      ...others
    })

    if (plugin.prototype.resize && is.undefined(plugin.resize)) {
      plugin.resize = function() {
        const instances = Pj.instances[name]

        for (let i = 0; i < instances.length; i++) {
          instances[i].resize(Pj.windowWidth, Pj.windowHeight)
        }
      }
    }

    if (is.function(plugin.resize)) {
      Pj.emitter.on('resize', plugin.resize)
    }

    if (plugin.prototype instanceof GlobalComponent) {
      Pj[name] = plugin
    } else {
      const elementParse = selector => {
        if (typeof selector === 'string') {
          return Array.from(document.querySelectorAll(selector))
        }
        if (
          selector instanceof NodeList ||
          selector instanceof HTMLCollection
        ) {
          return Array.from(selector)
        }
        if (selector instanceof Node) {
          return Array.of(selector)
        }
        return []
      }

      Pj[name] = (selector, options) => {
        const elements = elementParse(selector)
        if (!elements.length) {
          throw new Error('element is not exists:')
        }
        const instances = elements.map(el => plugin.of(el, options))
        if (instances.length === 1) {
          return instances[0]
        }
        return instances
      }
      Object.setPrototypeOf(Pj[name], plugin)
    }
    return plugin
  }
}

export function stateable() {
  return function(plugin) {
    plugin.prototype.initStates = function(states = {}) {
      this._states = states
    }

    // Checks whether the plugin is in a specific state or not.
    plugin.prototype.is = function(state) {
      if (this._states[state] && this._states[state] > 0) {
        return true
      }
      return false
    }

    // Enters a state.
    plugin.prototype.enter = function(state) {
      if (this._states[state] === undefined) {
        this._states[state] = 0
      }

      // this._states[state]++;
      this._states[state] = 1
    }

    // Leaves a state.
    plugin.prototype.leave = function(state) {
      if (this._states[state] === undefined) {
        this._states[state] = 0
      }

      // this._states[state]--;
      this._states[state] = 0
    }
  }
}

export function eventable(events = {}) {
  return function(plugin) {
    plugin.events = events

    plugin.setEvents = function(options = {}) {
      deepMerge(plugin.events, options)
    }

    plugin.prototype.eventName = function(events) {
      if (typeof events !== 'string' || events === '') {
        return `.${this.plugin}`
      }
      events = events.split(' ')

      const length = events.length
      for (let i = 0; i < length; i++) {
        events[i] = `${events[i]}.${this.plugin}`
      }
      return events.join(' ')
    }

    plugin.prototype.eventNameWithId = function(events, instanceId) {
      instanceId = instanceId ? instanceId : this.instanceId

      if (typeof events !== 'string' || events === '') {
        return `.${this.plugin}-${instanceId}`
      }

      events = events.split(' ')

      const length = events.length
      for (let i = 0; i < length; i++) {
        events[i] = `${events[i]}.${this.plugin}-${instanceId}`
      }
      return events.join(' ')
    }

    plugin.prototype.trigger = function(eventType, ...params) {
      if (eventType instanceof Event) {
        trigger(eventType, this.element)
        const type = camelize(eventType.type)
        const onFunction = `on${type}`

        if (typeof this.options[onFunction] === 'function') {
          this.options[onFunction].apply(this, params)
        }
      } else {
        trigger(
          {
            type: `${this.plugin}:${eventType}`,
            data: { instance: this, data: params }
          },
          this.element
        )
        eventType = camelize(eventType)
        const onFunction = `on${eventType}`
        if (typeof this.options[onFunction] === 'function') {
          this.options[onFunction].apply(this, [...params, this])
        }
      }
    }

    plugin.prototype.selfEventName = function(eventType) {
      return `${this.plugin}:${eventType}`
    }
  }
}

export function themeable() {
  return function(plugin) {
    plugin.prototype.getThemeClass = function(themes, THEME) {
      if (is.undefined(themes) && this.options.theme) {
        return this.getThemeClass(this.options.theme)
      }
      if (is.string(themes)) {
        if (is.undefined(THEME)) {
          THEME = this.classes.THEME
        }
        themes = themes.split(' ')

        if (THEME) {
          for (let i = 0; i < themes.length; i++) {
            themes[i] = THEME.replace('{theme}', themes[i])
          }
        } else {
          for (let i = 0; i < themes.length; i++) {
            themes[i] = this.getClass(themes[i])
          }
        }
        return themes.join(' ')
      }

      return ''
    }
  }
}

export function styleable(classes = {}) {
  return function(plugin) {
    plugin.classes = classes
    plugin.setClasses = function(options = {}) {
      deepMerge(plugin.classes, options)
    }

    plugin.prototype.getClass = function(classname, arg, value) {
      if (!is.undefined(arg)) {
        return this.getClass(classname.replace(`{${arg}}`, value))
      }
      return classname.replace('{namespace}', this.classes.NAMESPACE || '')
    }

    plugin.prototype.getClasses = function(value, classname, arg) {
      if (is.string(value) && !is.undefined(classname) && !is.undefined(arg)) {
        value = value.split(' ')

        for (let i = 0; i < value.length; i++) {
          value[i] = this.getClass(classname, arg, value[i])
        }

        return value.join(' ')
      }

      return ''
    }

    plugin.prototype.initClasses = function(defaults, options) {
      if (is.undefined(options) && is.object(this.options.classes)) {
        options = this.options.classes
      }

      function conventKeyToUpperCase(obj) {
        const upperObj = {}
        for (const name in obj) {
          if (Object.hasOwnProperty.call(obj, name)) {
            if (is.string(obj[name])) {
              upperObj[name.toUpperCase()] = obj[name]
            } else if (is.object(obj[name])) {
              upperObj[name.toUpperCase()] = conventKeyToUpperCase(obj[name])
            }
          }
        }
        return upperObj
      }

      this.classes = deepMerge(
        {},
        defaults,
        conventKeyToUpperCase(options || {})
      )

      if (!is.undefined(this.classes.NAMESPACE)) {
        const injectNamespace = obj => {
          for (const name in obj) {
            if (Object.hasOwnProperty.call(obj, name)) {
              if (is.string(obj[name])) {
                obj[name] = this.getClass(obj[name])
              } else if (is.object(obj[name])) {
                obj[name] = injectNamespace(obj[name])
              }
            }
          }
          return obj
        }

        this.classes = injectNamespace(this.classes)
      }
    }
  }
}

export function translateable(translations) {
  return function(plugin) {
    window.deepMerge = deepMerge
    plugin.I18N = new I18N(
      {
        locale: plugin.defaults.locale,
        fallbacks: plugin.defaults.localeFallbacks
      },
      translations
    )
    Object.assign(plugin.prototype, {
      setupI18n() {
        this.i18n = plugin.I18N.instance({
          locale: this.options.locale,
          fallbacks: this.options.localeFallbacks
        })
      },
      translate(key, args) {
        return this.i18n.translate(key, args)
      },
      setLocale(locale) {
        return this.i18n.setLocale(locale)
      },
      getLocale() {
        return this.i18n.getLocale()
      }
    })
  }
}

window.addEventListener('orientationchange', globalResizeHandle)
window.addEventListener('resize', throttle(globalResizeHandle))
window.addEventListener('scroll', throttle(globalScrollHanle))

export default Pj
