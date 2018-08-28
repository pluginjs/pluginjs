import { isString, isObject } from '@pluginjs/is'
import { deepMerge } from '@pluginjs/utils'

export default function styleable(classes = {}) {
  return function(plugin) {
    plugin.classes = classes
    plugin.setClasses = function(options = {}) {
      plugin.classes = deepMerge(plugin.classes, options)
    }

    plugin.prototype.getClass = function(classname, arg, value) {
      if (typeof arg !== 'undefined') {
        return this.getClass(classname.replace(`{${arg}}`, value))
      }
      return classname.replace('{namespace}', this.classes.NAMESPACE || '')
    }

    plugin.prototype.getClasses = function(classname, arg, value) {
      if (
        isString(value) &&
        typeof classname !== 'undefined' &&
        typeof arg !== 'undefined'
      ) {
        value = value.split(' ')

        for (let i = 0; i < value.length; i++) {
          value[i] = this.getClass(classname, arg, value[i])
        }

        return value.join(' ')
      }

      return ''
    }

    plugin.prototype.setupClasses = function(overrides) {
      let classes = {}
      if (
        typeof this.options !== 'undefined' &&
        isObject(this.options.classes)
      ) {
        classes = this.options.classes
      }

      function conventKeyToUpperCase(obj) {
        const upperObj = {}
        for (const name in obj) {
          if (Object.hasOwnProperty.call(obj, name)) {
            if (isString(obj[name])) {
              upperObj[name.toUpperCase()] = obj[name]
            } else if (isObject(obj[name])) {
              upperObj[name.toUpperCase()] = conventKeyToUpperCase(obj[name])
            }
          }
        }
        return upperObj
      }

      this.classes = deepMerge(
        {},
        plugin.classes,
        overrides,
        conventKeyToUpperCase(classes)
      )

      if (typeof this.classes.NAMESPACE !== 'undefined') {
        const injectNamespace = obj => {
          for (const name in obj) {
            if (Object.hasOwnProperty.call(obj, name)) {
              if (isString(obj[name])) {
                obj[name] = this.getClass(obj[name])
              } else if (isObject(obj[name])) {
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
