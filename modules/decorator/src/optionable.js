import { deepMerge, parseDataOptions } from '@pluginjs/utils'

export default function optionable(defaults = {}, enableDataOption = false) {
  return function(plugin) {
    plugin.defaults = defaults
    plugin.setDefaults = function(options = {}) {
      plugin.defaults = deepMerge(plugin.defaults, options)
    }

    if (enableDataOption) {
      plugin.prototype.setupOptions = function(...options) {
        this.options = deepMerge(
          plugin.defaults,
          ...options,
          this.getDataOptions()
        )
      }

      plugin.prototype.getDataOptions = function() {
        if (!this.element) {
          return {}
        }

        return parseDataOptions(this.element.dataset)
      }
    } else {
      plugin.prototype.setupOptions = function(options = {}) {
        this.options = deepMerge(plugin.defaults, options)
      }
    }
  }
}
