/*eslint-disable */
;(function() {
  if (!('includes' in Array.prototype)) {
    Array.prototype.includes = function includes(
      searchElement /*, fromIndex*/
    ) {
      'use strict'
      var O = Object(this)
      var len = parseInt(O.length) || 0
      if (len === 0) {
        return false
      }
      var n = parseInt(arguments[1]) || 0
      var k
      if (n >= 0) {
        k = n
      } else {
        k = len + n
        if (k < 0) {
          k = 0
        }
      }
      var currentElement
      while (k < len) {
        currentElement = O[k]
        if (
          searchElement === currentElement ||
          (searchElement !== searchElement && currentElement !== currentElement)
        ) {
          return true
        }
        k++
      }
      return false
    }
  }

  if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function filter(callback) {
      if (this === undefined || this === null) {
        throw new TypeError(this + ' is not an object')
      }

      if (!(callback instanceof Function)) {
        throw new TypeError(callback + ' is not a function')
      }

      var object = Object(this),
        scope = arguments[1],
        arraylike = object instanceof String ? object.split('') : object,
        length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
        index = -1,
        result = [],
        element

      while (++index < length) {
        element = arraylike[index]

        if (
          index in arraylike &&
          callback.call(scope, element, index, object)
        ) {
          result.push(element)
        }
      }

      return result
    }
  }

  if (!('find' in Array.prototype)) {
    Object.defineProperty(Array.prototype, 'find', {
      configurable: true,
      value: function find(callback) {
        if (this === undefined || this === null) {
          throw new TypeError(this + ' is not an object')
        }

        if (!(callback instanceof Function)) {
          throw new TypeError(callback + ' is not a function')
        }

        var object = Object(this),
          scope = arguments[1],
          arraylike = object instanceof String ? object.split('') : object,
          length =
            Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
          index = -1,
          element

        while (++index < length) {
          if (index in arraylike) {
            element = arraylike[index]

            if (callback.call(scope, element, index, object)) {
              return element
            }
          }
        }
      },
      writable: true
    })
  }

  if (
    !(
      'from' in Array &&
      (function() {
        try {
          Array.from({ length: -Infinity })

          return true
        } catch (e) {
          return false
        }
      })()
    )
  ) {
    // Wrapped in IIFE to prevent leaking to global scope.
    ;(function() {
      function parseIterable(arraylike) {
        var done = false
        var iterableResponse
        var tempArray = []

        // if the iterable doesn't have next;
        // it is an iterable if 'next' is a function but it has not been defined on
        // the object itself.
        if (typeof arraylike.next === 'function') {
          while (!done) {
            iterableResponse = arraylike.next()
            if (
              Object.prototype.hasOwnProperty.call(iterableResponse, 'value') &&
              Object.prototype.hasOwnProperty.call(iterableResponse, 'done')
            ) {
              if (iterableResponse.done === true) {
                done = true
                break

                // handle the case where the done value is not Boolean
              } else if (iterableResponse.done !== false) {
                break
              }

              tempArray.push(iterableResponse.value)
            } else {
              // it does not conform to the iterable pattern
              break
            }
          }
        }

        if (done) {
          return tempArray
        } else {
          // something went wrong return false;
          return false
        }
      }

      Object.defineProperty(Array, 'from', {
        configurable: true,
        value: function from(source) {
          // handle non-objects
          if (source === undefined || source === null) {
            throw new TypeError(source + ' is not an object')
          }

          // handle maps that are not functions
          if (1 in arguments && !(arguments[1] instanceof Function)) {
            throw new TypeError(arguments[1] + ' is not a function')
          }

          var arraylike =
            typeof source === 'string' ? source.split('') : Object(source)
          var map = arguments[1]
          var scope = arguments[2]
          var array = []
          var index = -1
          var length = Math.min(
            Math.max(Number(arraylike.length) || 0, 0),
            9007199254740991
          )
          var value

          // variables for rebuilding array from iterator
          var arrayFromIterable

          // if it is an iterable treat like one
          arrayFromIterable = parseIterable(arraylike)

          //if it is a Map or a Set then handle them appropriately
          if (
            typeof arraylike.entries === 'function' &&
            typeof arraylike.values === 'function'
          ) {
            if (
              arraylike.constructor.name === 'Set' &&
              'values' in Set.prototype
            ) {
              arrayFromIterable = parseIterable(arraylike.values())
            }
            if (
              arraylike.constructor.name === 'Map' &&
              'entries' in Map.prototype
            ) {
              arrayFromIterable = parseIterable(arraylike.entries())
            }
          }

          if (arrayFromIterable) {
            arraylike = arrayFromIterable
            length = arrayFromIterable.length
          }

          while (++index < length) {
            value = arraylike[index]

            array[index] = map ? map.call(scope, value, index) : value
          }

          array.length = length

          return array
        },
        writable: true
      })
    })()
  }

  if (
    !('Date' in this && 'now' in this.Date && 'getTime' in this.Date.prototype)
  ) {
    Date.now = function now() {
      return new Date().getTime()
    }
  }

  if (!('includes' in String.prototype)) {
    String.prototype.includes = function(string, index) {
      if (typeof string === 'object' && string instanceof RegExp)
        throw new TypeError(
          'First argument to String.prototype.includes must not be a regular expression'
        )
      return this.indexOf(string, index) !== -1
    }
  }

  if (!('assign' in Object)) {
    Object.assign = function assign(target, source) {
      // eslint-disable-line no-unused-vars
      for (var index = 1, key, src; index < arguments.length; ++index) {
        src = arguments[index]

        for (key in src) {
          if (Object.prototype.hasOwnProperty.call(src, key)) {
            target[key] = src[key]
          }
        }
      }

      return target
    }
  }

  if (!('keys' in Object)) {
    Object.keys = (function() {
      'use strict'
      var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length

      return function(obj) {
        if (
          typeof obj !== 'object' &&
          (typeof obj !== 'function' || obj === null)
        ) {
          throw new TypeError('Object.keys called on non-object')
        }

        var result = [],
          prop,
          i

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop)
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i])
            }
          }
        }
        return result
      }
    })()
  }

  if (!('values' in Object)) {
    ;(function() {
      Object.defineProperty(Object, 'values', {
        configurable: true,
        enumerable: false,
        value: function(object) {
          return Object.keys(object).map(function(key) {
            return object[key]
          })
        },
        writable: true
      })
    })()
  }

  if (!('entries' in Object)) {
    Object.entries = function entries(object) {
      var keys = Object.keys(object)

      return keys.reduce(function(entries, key) {
        var entry =
          typeof key === 'string' && object.propertyIsEnumerable(key)
            ? [[key, object[key]]]
            : []
        return entries.concat(entry)
      }, [])
    }
  }

  if (
    !(
      'getOwnPropertyDescriptor' in Object &&
      typeof Object.getOwnPropertyDescriptor === 'function' &&
      (function() {
        try {
          var object = {}
          object.test = 0
          return Object.getOwnPropertyDescriptor(object, 'test').value === 0
        } catch (exception) {
          return false
        }
      })()
    )
  ) {
    ;(function() {
      var call = Function.prototype.call
      var prototypeOfObject = Object.prototype
      var owns = call.bind(prototypeOfObject.hasOwnProperty)

      var lookupGetter
      var lookupSetter
      var supportsAccessors
      if ((supportsAccessors = owns(prototypeOfObject, '__defineGetter__'))) {
        lookupGetter = call.bind(prototypeOfObject.__lookupGetter__)
        lookupSetter = call.bind(prototypeOfObject.__lookupSetter__)
      }
      function doesGetOwnPropertyDescriptorWork(object) {
        try {
          object.sentinel = 0
          return Object.getOwnPropertyDescriptor(object, 'sentinel').value === 0
        } catch (exception) {
          // returns falsy
        }
      }
      // check whether getOwnPropertyDescriptor works if it's given. Otherwise,
      // shim partially.
      if (Object.defineProperty) {
        var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork(
          {}
        )
        var getOwnPropertyDescriptorWorksOnDom =
          typeof document == 'undefined' ||
          doesGetOwnPropertyDescriptorWork(document.createElement('div'))
        if (
          !getOwnPropertyDescriptorWorksOnDom ||
          !getOwnPropertyDescriptorWorksOnObject
        ) {
          var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor
        }
      }

      if (
        !Object.getOwnPropertyDescriptor ||
        getOwnPropertyDescriptorFallback
      ) {
        var ERR_NON_OBJECT =
          'Object.getOwnPropertyDescriptor called on a non-object: '

        Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(
          object,
          property
        ) {
          if (
            (typeof object != 'object' && typeof object != 'function') ||
            object === null
          ) {
            throw new TypeError(ERR_NON_OBJECT + object)
          }

          // make a valiant attempt to use the real getOwnPropertyDescriptor
          // for I8's DOM elements.
          if (getOwnPropertyDescriptorFallback) {
            try {
              return getOwnPropertyDescriptorFallback.call(
                Object,
                object,
                property
              )
            } catch (exception) {
              // try the shim if the real one doesn't work
            }
          }

          // If object does not owns property return undefined immediately.
          if (!owns(object, property)) {
            return
          }

          // If object has a property then it's for sure both `enumerable` and
          // `configurable`.
          var descriptor = { enumerable: true, configurable: true }

          // If JS engine supports accessor properties then property may be a
          // getter or setter.
          if (supportsAccessors) {
            // Unfortunately `__lookupGetter__` will return a getter even
            // if object has own non getter property along with a same named
            // inherited getter. To avoid misbehavior we temporary remove
            // `__proto__` so that `__lookupGetter__` will return getter only
            // if it's owned by an object.
            var prototype = object.__proto__
            object.__proto__ = prototypeOfObject

            var getter = lookupGetter(object, property)
            var setter = lookupSetter(object, property)

            // Once we have getter and setter we can put values back.
            object.__proto__ = prototype

            if (getter || setter) {
              if (getter) {
                descriptor.get = getter
              }
              if (setter) {
                descriptor.set = setter
              }
              // If it was accessor property we're done and return here
              // in order to avoid adding `value` to the descriptor.
              return descriptor
            }
          }

          // If we got this far we know that object has an own property that is
          // not an accessor so we set it as a value and return descriptor.
          descriptor.value = object[property]
          descriptor.writable = true
          return descriptor
        }
      }
    })()
  }

  if (!('performance' in this && 'now' in this.performance)) {
    ;(function(global) {
      var startTime = Date.now()

      if (!global.performance) {
        global.performance = {}
      }

      global.performance.now = function() {
        return Date.now() - startTime
      }
    })(this)
  }

  if (!('matchMedia' in this)) {
    ;(function(global) {
      function evalQuery(query) {
        /* jshint evil: true */
        query = (query || 'true')
          .replace(/^only\s+/, '')
          .replace(/(device)-([\w.]+)/g, '$1.$2')
          .replace(/([\w.]+)\s*:/g, 'media.$1 ===')
          .replace(/min-([\w.]+)\s*===/g, '$1 >=')
          .replace(/max-([\w.]+)\s*===/g, '$1 <=')
          .replace(/all|screen/g, '1')
          .replace(/print/g, '0')
          .replace(/,/g, '||')
          .replace(/\band\b/g, '&&')
          .replace(/dpi/g, '')
          .replace(/(\d+)(cm|em|in|dppx|mm|pc|pt|px|rem)/g, function(
            $0,
            $1,
            $2
          ) {
            return (
              $1 *
              ($2 === 'cm'
                ? 0.3937 * 96
                : $2 === 'em' || $2 === 'rem'
                  ? 16
                  : $2 === 'in' || $2 === 'dppx'
                    ? 96
                    : $2 === 'mm'
                      ? 0.3937 * 96 / 10
                      : $2 === 'pc'
                        ? 12 * 96 / 72
                        : $2 === 'pt'
                          ? 96 / 72
                          : 1)
            )
          })
        return new Function(
          'media',
          'try{ return !!(%s) }catch(e){ return false }'.replace('%s', query)
        )({
          width: global.innerWidth,
          height: global.innerHeight,
          orientation: global.orientation || 'landscape',
          device: {
            width: global.screen.width,
            height: global.screen.height,
            orientation:
              global.screen.orientation || global.orientation || 'landscape'
          }
        })
      }

      function MediaQueryList() {
        this.matches = false
        this.media = 'invalid'
      }

      MediaQueryList.prototype.addListener = function addListener(listener) {
        var listenerIndex = this.addListener.listeners.indexOf(listener)

        if (listenerIndex === -1) {
          this.addListener.listeners.push(listener)
        }
      }

      MediaQueryList.prototype.removeListener = function removeListener(
        listener
      ) {
        var listenerIndex = this.addListener.listeners.indexOf(listener)

        if (listenerIndex >= 0) {
          this.addListener.listeners.splice(listenerIndex, 1)
        }
      }

      global.MediaQueryList = MediaQueryList

      // <Global>.matchMedia
      global.matchMedia = function matchMedia(query) {
        var list = new MediaQueryList()

        if (0 === arguments.length) {
          throw new TypeError('Not enough arguments to matchMedia')
        }

        list.media = String(query)
        list.matches = evalQuery(list.media)
        list.addListener.listeners = []

        global.addEventListener('resize', function() {
          var listeners = [].concat(list.addListener.listeners),
            matches = evalQuery(list.media)

          if (matches != list.matches) {
            list.matches = matches
            for (
              var index = 0, length = listeners.length;
              index < length;
              ++index
            ) {
              listeners[index].call(global, list)
            }
          }
        })

        return list
      }
    })(this)
  }

  if (!('requestAnimationFrame' in this)) {
    ;(function(global) {
      var rafPrefix

      if ('mozRequestAnimationFrame' in global) {
        rafPrefix = 'moz'
      } else if ('webkitRequestAnimationFrame' in global) {
        rafPrefix = 'webkit'
      }

      if (rafPrefix) {
        global.requestAnimationFrame = function(callback) {
          return global[rafPrefix + 'RequestAnimationFrame'](function() {
            callback(performance.now())
          })
        }
        global.cancelAnimationFrame = global[rafPrefix + 'CancelAnimationFrame']
      } else {
        var lastTime = Date.now()

        global.requestAnimationFrame = function(callback) {
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function')
          }

          var currentTime = Date.now(),
            delay = 16 + lastTime - currentTime

          if (delay < 0) {
            delay = 0
          }

          lastTime = currentTime

          return setTimeout(function() {
            lastTime = Date.now()

            callback(performance.now())
          }, delay)
        }

        global.cancelAnimationFrame = function(id) {
          clearTimeout(id)
        }
      }
    })(this)
  }

  if (!('IntersectionObserver' in this)) {
    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    ;(function(window, document) {
      'use strict'

      // Exits early if all IntersectionObserver and IntersectionObserverEntry
      // features are natively supported.
      if (
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      ) {
        return
      }

      // Use :root element of the document for .contains() calls because older IEs
      // support Node.prototype.contains only on Element nodes.
      var docElement = document.documentElement

      /**
       * An IntersectionObserver registry. This registry exists to hold a strong
       * reference to IntersectionObserver instances currently observering a target
       * element. Without this registry, instances without another reference may be
       * garbage collected.
       */
      var registry = []

      /**
       * Creates the global IntersectionObserverEntry constructor.
       * https://wicg.github.io/IntersectionObserver/#intersection-observer-entry
       * @param {Object} entry A dictionary of instance properties.
       * @constructor
       */
      function IntersectionObserverEntry(entry) {
        this.time = entry.time
        this.target = entry.target
        this.rootBounds = entry.rootBounds
        this.boundingClientRect = entry.boundingClientRect
        this.intersectionRect = entry.intersectionRect || getEmptyRect()
        this.isIntersecting = !!entry.intersectionRect

        // Calculates the intersection ratio. Sets it to 0 if the target area is 0.
        var targetRect = this.boundingClientRect
        var targetArea = targetRect.width * targetRect.height
        var intersectionRect = this.intersectionRect
        var intersectionArea = intersectionRect.width * intersectionRect.height
        this.intersectionRatio = targetArea ? intersectionArea / targetArea : 0
      }

      /**
       * Creates the global IntersectionObserver constructor.
       * https://wicg.github.io/IntersectionObserver/#intersection-observer-interface
       * @param {Function} callback The function to be invoked after intersection
       *     changes have queued. The function is not invoked if the queue has
       *     been emptied by calling the `takeRecords` method.
       * @param {Object=} opt_options Optional configuration options.
       * @constructor
       */
      function IntersectionObserver(callback, opt_options) {
        var options = opt_options || {}

        if (typeof callback != 'function') {
          throw new Error('callback must be a function')
        }

        if (options.root && options.root.nodeType != 1) {
          throw new Error('root must be an Element')
        }

        // Binds and throttles `this._checkForIntersections`.
        this._checkForIntersections = throttle(
          this._checkForIntersections.bind(this),
          this.THROTTLE_TIMEOUT
        )

        // Private properties.
        this._callback = callback
        this._observationTargets = []
        this._queuedEntries = []
        this._rootMarginValues = this._parseRootMargin(options.rootMargin)

        // Public properties.
        this.thresholds = this._initThresholds(options.threshold)
        this.root = options.root || null
        this.rootMargin = this._rootMarginValues
          .map(function(margin) {
            return margin.value + margin.unit
          })
          .join(' ')
      }

      /**
       * The minimum interval within which the document will be checked for
       * intersection changes.
       */
      IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100

      /**
       * The frequency in which the polyfill polls for intersection changes.
       * this can be updated on a per instance basis and must be set prior to
       * calling `observe` on the first target.
       */
      IntersectionObserver.prototype.POLL_INTERVAL = null

      /**
       * Starts observing a target element for intersection changes based on
       * the thresholds values.
       * @param {Element} target The DOM element to observe.
       */
      IntersectionObserver.prototype.observe = function(target) {
        // If the target is already being observed, do nothing.
        if (
          this._observationTargets.some(function(item) {
            return item.element == target
          })
        ) {
          return
        }

        if (!(target && target.nodeType == 1)) {
          throw new Error('target must be an Element')
        }

        this._registerInstance()
        this._observationTargets.push({ element: target, entry: null })
        this._monitorIntersections()
      }

      /**
       * Stops observing a target element for intersection changes.
       * @param {Element} target The DOM element to observe.
       */
      IntersectionObserver.prototype.unobserve = function(target) {
        this._observationTargets = this._observationTargets.filter(function(
          item
        ) {
          return item.element != target
        })
        if (!this._observationTargets.length) {
          this._unmonitorIntersections()
          this._unregisterInstance()
        }
      }

      /**
       * Stops observing all target elements for intersection changes.
       */
      IntersectionObserver.prototype.disconnect = function() {
        this._observationTargets = []
        this._unmonitorIntersections()
        this._unregisterInstance()
      }

      /**
       * Returns any queue entries that have not yet been reported to the
       * callback and clears the queue. This can be used in conjunction with the
       * callback to obtain the absolute most up-to-date intersection information.
       * @return {Array} The currently queued entries.
       */
      IntersectionObserver.prototype.takeRecords = function() {
        var records = this._queuedEntries.slice()
        this._queuedEntries = []
        return records
      }

      /**
       * Accepts the threshold value from the user configuration object and
       * returns a sorted array of unique threshold values. If a value is not
       * between 0 and 1 and error is thrown.
       * @private
       * @param {Array|number=} opt_threshold An optional threshold value or
       *     a list of threshold values, defaulting to [0].
       * @return {Array} A sorted list of unique and valid threshold values.
       */
      IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
        var threshold = opt_threshold || [0]
        if (!Array.isArray(threshold)) threshold = [threshold]

        return threshold.sort().filter(function(t, i, a) {
          if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
            throw new Error(
              'threshold must be a number between 0 and 1 inclusively'
            )
          }
          return t !== a[i - 1]
        })
      }

      /**
       * Accepts the rootMargin value from the user configuration object
       * and returns an array of the four margin values as an object containing
       * the value and unit properties. If any of the values are not properly
       * formatted or use a unit other than px or %, and error is thrown.
       * @private
       * @param {string=} opt_rootMargin An optional rootMargin value,
       *     defaulting to '0px'.
       * @return {Array<Object>} An array of margin objects with the keys
       *     value and unit.
       */
      IntersectionObserver.prototype._parseRootMargin = function(
        opt_rootMargin
      ) {
        var marginString = opt_rootMargin || '0px'
        var margins = marginString.split(/\s+/).map(function(margin) {
          var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin)
          if (!parts) {
            throw new Error('rootMargin must be specified in pixels or percent')
          }
          return { value: parseFloat(parts[1]), unit: parts[2] }
        })

        // Handles shorthand.
        margins[1] = margins[1] || margins[0]
        margins[2] = margins[2] || margins[0]
        margins[3] = margins[3] || margins[1]

        return margins
      }

      /**
       * Starts polling for intersection changes if the polling is not already
       * happening, and if the page's visibilty state is visible.
       * @private
       */
      IntersectionObserver.prototype._monitorIntersections = function() {
        if (!this._monitoringIntersections) {
          this._monitoringIntersections = true

          this._checkForIntersections()

          // If a poll interval is set, use polling instead of listening to
          // resize and scroll events or DOM mutations.
          if (this.POLL_INTERVAL) {
            this._monitoringInterval = setInterval(
              this._checkForIntersections,
              this.POLL_INTERVAL
            )
          } else {
            addEvent(window, 'resize', this._checkForIntersections, true)
            addEvent(document, 'scroll', this._checkForIntersections, true)

            if ('MutationObserver' in window) {
              this._domObserver = new MutationObserver(
                this._checkForIntersections
              )
              this._domObserver.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
              })
            }
          }
        }
      }

      /**
       * Stops polling for intersection changes.
       * @private
       */
      IntersectionObserver.prototype._unmonitorIntersections = function() {
        if (this._monitoringIntersections) {
          this._monitoringIntersections = false

          clearInterval(this._monitoringInterval)
          this._monitoringInterval = null

          removeEvent(window, 'resize', this._checkForIntersections, true)
          removeEvent(document, 'scroll', this._checkForIntersections, true)

          if (this._domObserver) {
            this._domObserver.disconnect()
            this._domObserver = null
          }
        }
      }

      /**
       * Scans each observation target for intersection changes and adds them
       * to the internal entries queue. If new entries are found, it
       * schedules the callback to be invoked.
       * @private
       */
      IntersectionObserver.prototype._checkForIntersections = function() {
        var rootIsInDom = this._rootIsInDom()
        var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect()

        this._observationTargets.forEach(function(item) {
          var target = item.element
          var targetRect = getBoundingClientRect(target)
          var rootContainsTarget = this._rootContainsTarget(target)
          var oldEntry = item.entry
          var intersectionRect =
            rootIsInDom &&
            rootContainsTarget &&
            this._computeTargetAndRootIntersection(target, rootRect)

          var newEntry = (item.entry = new IntersectionObserverEntry({
            time: now(),
            target: target,
            boundingClientRect: targetRect,
            rootBounds: rootRect,
            intersectionRect: intersectionRect
          }))

          if (rootIsInDom && rootContainsTarget) {
            // If the new entry intersection ratio has crossed any of the
            // thresholds, add a new entry.
            if (this._hasCrossedThreshold(oldEntry, newEntry)) {
              this._queuedEntries.push(newEntry)
            }
          } else {
            // If the root is not in the DOM or target is not contained within
            // root but the previous entry for this target had an intersection,
            // add a new record indicating removal.
            if (oldEntry && oldEntry.isIntersecting) {
              this._queuedEntries.push(newEntry)
            }
          }
        }, this)

        if (this._queuedEntries.length) {
          this._callback(this.takeRecords(), this)
        }
      }

      /**
       * Accepts a target and root rect computes the intersection between then
       * following the algorithm in the spec.
       * TODO(philipwalton): at this time clip-path is not considered.
       * https://wicg.github.io/IntersectionObserver/#calculate-intersection-rect-algo
       * @param {Element} target The target DOM element
       * @param {Object} rootRect The bounding rect of the root after being
       *     expanded by the rootMargin value.
       * @return {?Object} The final intersection rect object or undefined if no
       *     intersection is found.
       * @private
       */
      IntersectionObserver.prototype._computeTargetAndRootIntersection = function(
        target,
        rootRect
      ) {
        // If the element isn't displayed, an intersection can't happen.
        if (window.getComputedStyle(target).display == 'none') return

        var targetRect = getBoundingClientRect(target)
        var intersectionRect = targetRect
        var parent = target.parentNode
        var atRoot = false

        while (!atRoot) {
          var parentRect = null

          // If we're at the root element, set parentRect to the already
          // calculated rootRect.
          if (parent == this.root || parent.nodeType != 1) {
            atRoot = true
            parentRect = rootRect
          } else {
            // Otherwise check to see if the parent element hides overflow,
            // and if so update parentRect.
            if (window.getComputedStyle(parent).overflow != 'visible') {
              parentRect = getBoundingClientRect(parent)
            }
          }
          // If either of the above conditionals set a new parentRect,
          // calculate new intersection data.
          if (parentRect) {
            intersectionRect = computeRectIntersection(
              parentRect,
              intersectionRect
            )

            if (!intersectionRect) break
          }
          parent = parent.parentNode
        }
        return intersectionRect
      }

      /**
       * Returns the root rect after being expanded by the rootMargin value.
       * @return {Object} The expanded root rect.
       * @private
       */
      IntersectionObserver.prototype._getRootRect = function() {
        var rootRect
        if (this.root) {
          rootRect = getBoundingClientRect(this.root)
        } else {
          // Use <html>/<body> instead of window since scroll bars affect size.
          var html = document.documentElement
          var body = document.body
          rootRect = {
            top: 0,
            left: 0,
            right: html.clientWidth || body.clientWidth,
            width: html.clientWidth || body.clientWidth,
            bottom: html.clientHeight || body.clientHeight,
            height: html.clientHeight || body.clientHeight
          }
        }
        return this._expandRectByRootMargin(rootRect)
      }

      /**
       * Accepts a rect and expands it by the rootMargin value.
       * @param {Object} rect The rect object to expand.
       * @return {Object} The expanded rect.
       * @private
       */
      IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
        var margins = this._rootMarginValues.map(function(margin, i) {
          return margin.unit == 'px'
            ? margin.value
            : margin.value * (i % 2 ? rect.width : rect.height) / 100
        })
        var newRect = {
          top: rect.top - margins[0],
          right: rect.right + margins[1],
          bottom: rect.bottom + margins[2],
          left: rect.left - margins[3]
        }
        newRect.width = newRect.right - newRect.left
        newRect.height = newRect.bottom - newRect.top

        return newRect
      }

      /**
       * Accepts an old and new entry and returns true if at least one of the
       * threshold values has been crossed.
       * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
       *    particular target element or null if no previous entry exists.
       * @param {IntersectionObserverEntry} newEntry The current entry for a
       *    particular target element.
       * @return {boolean} Returns true if a any threshold has been crossed.
       * @private
       */
      IntersectionObserver.prototype._hasCrossedThreshold = function(
        oldEntry,
        newEntry
      ) {
        // To make comparing easier, an entry that has a ratio of 0
        // but does not actually intersect is given a value of -1
        var oldRatio =
          oldEntry && oldEntry.isIntersecting
            ? oldEntry.intersectionRatio || 0
            : -1
        var newRatio = newEntry.isIntersecting
          ? newEntry.intersectionRatio || 0
          : -1

        // Ignore unchanged ratios
        if (oldRatio === newRatio) return

        for (var i = 0; i < this.thresholds.length; i++) {
          var threshold = this.thresholds[i]

          // Return true if an entry matches a threshold or if the new ratio
          // and the old ratio are on the opposite sides of a threshold.
          if (
            threshold == oldRatio ||
            threshold == newRatio ||
            threshold < oldRatio !== threshold < newRatio
          ) {
            return true
          }
        }
      }

      /**
       * Returns whether or not the root element is an element and is in the DOM.
       * @return {boolean} True if the root element is an element and is in the DOM.
       * @private
       */
      IntersectionObserver.prototype._rootIsInDom = function() {
        return !this.root || docElement.contains(this.root)
      }

      /**
       * Returns whether or not the target element is a child of root.
       * @param {Element} target The target element to check.
       * @return {boolean} True if the target element is a child of root.
       * @private
       */
      IntersectionObserver.prototype._rootContainsTarget = function(target) {
        return (this.root || docElement).contains(target)
      }

      /**
       * Adds the instance to the global IntersectionObserver registry if it isn't
       * already present.
       * @private
       */
      IntersectionObserver.prototype._registerInstance = function() {
        if (registry.indexOf(this) < 0) {
          registry.push(this)
        }
      }

      /**
       * Removes the instance from the global IntersectionObserver registry.
       * @private
       */
      IntersectionObserver.prototype._unregisterInstance = function() {
        var index = registry.indexOf(this)
        if (index != -1) registry.splice(index, 1)
      }

      /**
       * Returns the result of the performance.now() method or null in browsers
       * that don't support the API.
       * @return {number} The elapsed time since the page was requested.
       */
      function now() {
        return window.performance && performance.now && performance.now()
      }

      /**
       * Throttles a function and delays its executiong, so it's only called at most
       * once within a given time period.
       * @param {Function} fn The function to throttle.
       * @param {number} timeout The amount of time that must pass before the
       *     function can be called again.
       * @return {Function} The throttled function.
       */
      function throttle(fn, timeout) {
        var timer = null
        return function() {
          if (!timer) {
            timer = setTimeout(function() {
              fn()
              timer = null
            }, timeout)
          }
        }
      }

      /**
       * Adds an event handler to a DOM node ensuring cross-browser compatibility.
       * @param {Node} node The DOM node to add the event handler to.
       * @param {string} event The event name.
       * @param {Function} fn The event handler to add.
       * @param {boolean} opt_useCapture Optionally adds the even to the capture
       *     phase. Note: this only works in modern browsers.
       */
      function addEvent(node, event, fn, opt_useCapture) {
        if (typeof node.addEventListener == 'function') {
          node.addEventListener(event, fn, opt_useCapture || false)
        } else if (typeof node.attachEvent == 'function') {
          node.attachEvent('on' + event, fn)
        }
      }

      /**
       * Removes a previously added event handler from a DOM node.
       * @param {Node} node The DOM node to remove the event handler from.
       * @param {string} event The event name.
       * @param {Function} fn The event handler to remove.
       * @param {boolean} opt_useCapture If the event handler was added with this
       *     flag set to true, it should be set to true here in order to remove it.
       */
      function removeEvent(node, event, fn, opt_useCapture) {
        if (typeof node.removeEventListener == 'function') {
          node.removeEventListener(event, fn, opt_useCapture || false)
        } else if (typeof node.detatchEvent == 'function') {
          node.detatchEvent('on' + event, fn)
        }
      }

      /**
       * Returns the intersection between two rect objects.
       * @param {Object} rect1 The first rect.
       * @param {Object} rect2 The second rect.
       * @return {?Object} The intersection rect or undefined if no intersection
       *     is found.
       */
      function computeRectIntersection(rect1, rect2) {
        var top = Math.max(rect1.top, rect2.top)
        var bottom = Math.min(rect1.bottom, rect2.bottom)
        var left = Math.max(rect1.left, rect2.left)
        var right = Math.min(rect1.right, rect2.right)
        var width = right - left
        var height = bottom - top

        return (
          width >= 0 &&
          height >= 0 && {
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            width: width,
            height: height
          }
        )
      }

      /**
       * Shims the native getBoundingClientRect for compatibility with older IE.
       * @param {Element} el The element whose bounding rect to get.
       * @return {Object} The (possibly shimmed) rect of the element.
       */
      function getBoundingClientRect(el) {
        var rect = el.getBoundingClientRect()
        if (!rect) return

        // Older IE
        if (!rect.width || !rect.height) {
          rect = {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
          }
        }
        return rect
      }

      /**
       * Returns an empty rect object. An empty rect is returned when an element
       * is not in the DOM.
       * @return {Object} The empty rect.
       */
      function getEmptyRect() {
        return {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        }
      }

      // Exposes the constructors globally.
      window.IntersectionObserver = IntersectionObserver
      window.IntersectionObserverEntry = IntersectionObserverEntry
    })(window, document)
  }
}.call(window))
