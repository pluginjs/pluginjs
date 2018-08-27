import { isFunction } from '@pluginjs/is'
import GlobalComponent from '@pluginjs/global-component'
import Pj from '@pluginjs/factory'
import { deepMerge, getUID } from '@pluginjs/utils'
import { setData, removeData } from '@pluginjs/dom'

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
        setData(instance.plugin, instance, instance.element)
      }

      instance.instanceId = getUID(instance.plugin)
      instances.push(instance)
    }

    plugin.removeInstance = instance => {
      if (!(plugin.prototype instanceof GlobalComponent)) {
        removeData(instance.plugin, instance.element)
      }

      instances = instances.filter(i => i !== instance)
    }

    plugin.findInstanceByElement = el =>
      instances.find(plugin => plugin.element === el)

    if (plugin.prototype.resize && typeof plugin.resize === 'undefined') {
      plugin.resize = function() {
        for (let i = 0; i < instances.length; i++) {
          instances[i].resize(
            window.document.documentElement.clientWidth,
            window.document.documentElement.clientHeight
          )
        }
      }
    }

    if (isFunction(plugin.resize)) {
      Pj.emitter.on('resize', plugin.resize.bind(plugin))
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
          throw new Error('element is not exists.')
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
