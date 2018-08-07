import { deepMerge } from '@pluginjs/utils'

export default function optionable(defaults = {}, enableDataOption = false) {
  return function(plugin) {
    plugin.defaults = defaults
    plugin.setDefaults = function(options = {}) {
      plugin.defaults = deepMerge(plugin.defaults, options)
    }

    if (enableDataOption) {
      plugin.prototype.initOptions = function(defaults = {}, options = {}) {
        this.options = deepMerge({}, defaults, options, this.getDataOptions())
      }

      plugin.prototype.getDataOptions = function() {
        if (!this.element) {
          return {}
        }
        const options = Object.entries(this.element.dataset).reduce(
          (result, [k, v]) => {
            try {
              const content = JSON.parse(`{"data": ${v.replace(/'/g, '"')}}`)
                .data
              return {
                ...result,
                [k]: content
              }
            } catch (err) {
              return {
                ...result,
                [k]: v
              }
            }
          },
          {}
        )
        return options
      }
    } else {
      plugin.prototype.initOptions = function(defaults = {}, options = {}) {
        this.options = deepMerge({}, defaults, options)
      }
    }
  }
}
