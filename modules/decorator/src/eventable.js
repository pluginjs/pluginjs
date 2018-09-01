import { deepMerge, camelize } from '@pluginjs/utils'
import { trigger } from '@pluginjs/events'
import { isFunction, isUndefined, isArray } from '@pluginjs/is'

export default function eventable(events = {}) {
  return function(plugin) {
    plugin.events = events

    plugin.setEvents = function(options = {}) {
      plugin.events = deepMerge(plugin.events, options)
    }

    plugin.prototype.eventName = function(events) {
      if (isUndefined(events)) {
        return `.${this.plugin}`
      }
      if (!isArray(events)) {
        events = events.split(' ')
      }

      const length = events.length
      for (let i = 0; i < length; i++) {
        events[i] = `${events[i]}.${this.plugin}`
      }
      return events.join(' ')
    }

    plugin.prototype.eventNameWithId = function(events, instanceId) {
      instanceId = instanceId ? instanceId : this.instanceId

      if (isUndefined(events)) {
        return `.${this.plugin}-${instanceId}`
      }

      if (!isArray(events)) {
        events = events.split(' ')
      }

      const length = events.length
      for (let i = 0; i < length; i++) {
        events[i] = `${events[i]}.${this.plugin}-${instanceId}`
      }
      return events.join(' ')
    }

    plugin.prototype.trigger = function(eventType, ...params) {
      if (eventType instanceof Event) {
        trigger(eventType, this.element)
        eventType = eventType.type
      } else {
        trigger(this.selfEventName(eventType), this, ...params, this.element)
      }

      eventType = camelize(eventType)

      const onFunction = `on${eventType}`
      if (
        !isUndefined(this.options) &&
        !isUndefined(this.options[onFunction]) &&
        isFunction(this.options[onFunction])
      ) {
        this.options[onFunction].apply(this, params)
      }
    }

    plugin.prototype.selfEventName = function(events) {
      if (!isArray(events)) {
        events = events.split(' ')
      }

      const length = events.length
      for (let i = 0; i < length; i++) {
        events[i] = `${this.plugin}:${events[i]}`
      }

      return events.join(' ')
    }
  }
}
