import { isFunction, isString, isArray } from '@pluginjs/is'
import GlobalComponent from '@pluginjs/global-component'
import Pj from '@pluginjs/factory'
import { deepMerge, getUID } from '@pluginjs/utils'
import { getData, setData, removeData } from '@pluginjs/dom'

export default function register(name, obj = {}) {
  return function(plugin) {
    const { methods = [], dependencies = {}, ...others } = obj

    Pj.register(
      name,
      Object.assign(plugin, {
        methods: plugin.methods ? deepMerge(plugin.methods, methods) : methods,
        dependencies: plugin.dependencies
          ? deepMerge(plugin.dependencies, dependencies)
          : dependencies,
        ...others
      })
    )

    let instances = []

    plugin.prototype.plugin = name
    plugin.getInstances = () => {
      return instances
    }

    plugin.addInstance = instance => {
      if (!(plugin.prototype instanceof GlobalComponent)) {
        setData(name, instance, instance.element)
      }

      instance.instanceId = getUID(instance.plugin)
      instances.push(instance)
    }

    plugin.removeInstance = instance => {
      if (!(plugin.prototype instanceof GlobalComponent)) {
        removeData(name, instance.element)
      }

      instances = instances.filter(i => i !== instance)
    }

    plugin.findInstanceByElement = el =>
      instances.find(plugin => plugin.element === el)

    if (plugin.prototype.resize && typeof plugin.resize === 'undefined') {
      plugin.resize = function(documentWidth, documentHeight) {
        for (let i = 0; i < instances.length; i++) {
          instances[i].resize(documentWidth, documentHeight)
        }
      }
    }

    if (isFunction(plugin.resize)) {
      Pj.emitter.on('resize', (e, documentWidth, documentHeight) => {
        plugin.resize(documentWidth, documentHeight)
      })
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
        if (isArray(selector)) {
          return selector
        }
        return []
      }

      Pj[name] = (selector, options, ...args) => {
        const elements = elementParse(selector)
        if (!elements.length) {
          throw new Error('Element is not exists.')
        }
        let results = []
        if (isString(options)) {
          if (!plugin.methods.includes(options)) {
            throw new Error(`Method "${options}" is not exists on "${name}".`)
          }
          results = elements.map(el => {
            const instance = getData(name, el)
            if (instance instanceof plugin) {
              return instance[options](...args)
            }
            return null
          })
        } else {
          results = elements.map(el => plugin.of(el, options))
        }

        if (results.length === 1) {
          return results[0]
        }
        return results
      }
      Object.setPrototypeOf(Pj[name], plugin)
    }
    return plugin
  }
}
