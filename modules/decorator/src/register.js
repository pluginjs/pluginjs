import is from '@pluginjs/is'
import GlobalComponent from '@pluginjs/global-component'
import Pj from '@pluginjs/pluginjs'
import { deepMerge } from '@pluginjs/utils'

export default function register(name, obj = {}) {
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
