import { deepMerge, camelize } from '@pluginjs/utils'
import { trigger } from '@pluginjs/events'

export default function eventable(events = {}) {
  return function(plugin) {
    plugin.events = events

    plugin.setEvents = function(options = {}) {
      plugin.events = deepMerge(plugin.events, options)
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
