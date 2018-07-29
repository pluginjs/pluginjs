import is from '@pluginjs/is'
import { deepMerge } from '@pluginjs/utils'

export default function styleable(classes = {}) {
  return function(plugin) {
    plugin.classes = classes
    plugin.setClasses = function(options = {}) {
      plugin.classes = deepMerge(plugin.classes, options)
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
