import { curry } from '@pluginjs/utils'
import EVENTSTORAGE from './eventStorage'

export const trigger = curry((options, el) => {
  const { type = options, data } = options
  const eventName = type

  const eventStorage = EVENTSTORAGE.getEventStorage(el)
  if (eventStorage && eventStorage.hasListeners(eventName)) {
    eventStorage.trigger(eventName, data)
  }

  return el
})
/**
 * bindEvent ({
 *   type: 'example:CustomEvent',
 *   handler: event => {
 *     let { instance } = event.detail
 *   }
 * }, elemment)
 *
 * trigger({
 *   type: 'example:CustomEvent',
 *   data: {instance: this}
 * }, elemment)
 */

export const bindEvent = curry((options, element) => {
  EVENTSTORAGE.of(options, element)
  return element
})
/**
 * bindEvent ({
 *   type: eventName,
 *   handler
 * }, el)
 * bindEvent ({
 *   type: eventName,
 *   identity: '.className',
 *   handler
 * }, el)
 * bindEvent ({
 *   type,
 *   identity: {
 *     type: '[selector |class | id | attr | dataset]',
 *     value
 *   },
 *   handler
 * }, el)
 * example:
 * <li><a href="#" data-test="example">test</a></li>
 * bindEvent ({
 *   type,
 *   identity: {
 *     type: 'dataset',
 *     value: {test: 'example'}
 *   },
 *   handler
 * }, el)
 */
export const removeEvent = curry((options, element) => {
  EVENTSTORAGE.delete(options, element)
  return element
})
/**
 * removeEvent (this.eventName(), el)
 * removeEvent (eventName, el)
 * removeEvent ({
 *   type: [this.eventName() || eventName],
 *   handler
 * }, el)
 */
export const bindEventOnce = curry((options, element) => {
  EVENTSTORAGE.once(options, element)
  return element
})

export const getEventStorage = element => EVENTSTORAGE.getEventStorage(element)
