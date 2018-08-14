import { on, trigger, off, once, getEventEmitter } from '../src/main.js'

describe('Events', () => {
  test('should have on events', () => {
    expect(on).toBeFunction()
  })

  test('should have once events', () => {
    expect(once).toBeFunction()
  })

  test('should have off events', () => {
    expect(off).toBeFunction()
  })

  test('should have trigger events', () => {
    expect(trigger).toBeFunction()
  })

  const injectHTML = () => {
    document.body.innerHTML = `
    <div id='event-test'>
      <ul>
        <li class='green'>hello</li>
        <li class='green'>world</li>
        <li class='red'>again</li>
      </ul>
    </div>
    `
  }

  const uninjectHTML = () => {
    const el = document.querySelector('#event-test')
    el.parentNode.removeChild(el)
  }

  beforeEach(() => {
    injectHTML()
  })

  afterEach(() => {
    uninjectHTML()
  })

  describe('on()', () => {
    test('on should invoke callback when event trigger', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test', callback, el)

      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)

      trigger('test', el)
      expect(result).toEqual(1)
    })

    test('on should invoke callback when event trigger twice', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test', callback, el)

      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)

      trigger('test', el)
      trigger('test', el)
      expect(result).toEqual(2)
    })

    test('on should invoke two callback when event trigger', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callbackA = () => {
        result++
      }
      const callbackB = () => {
        result += 2
      }

      on('test', callbackA, el)
      on('test', callbackB, el)

      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(2)

      trigger('test', el)
      expect(result).toEqual(3)
    })

    test('on more events', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test.A test.B test.C', callback, el)
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(3)

      trigger('test.A', el)
      expect(result).toEqual(1)
      trigger('test', el)
      expect(result).toEqual(4)
    })

    test('preventDefault', () => {
      const parent = document.querySelector('#event-test ul')
      const children = document.querySelector('li.red')

      let isDefaultPrevented = null
      const callbackA = e => {
        e.preventDefault()
      }
      const callbackB = e => {
        isDefaultPrevented = e.defaultPrevented
      }

      on('click', callbackA, children)
      on('click', callbackB, parent)

      trigger('click', children)
      expect(isDefaultPrevented).toBeTrue()
    })

    test('stopImmediatePropagation', () => {
      const parent = document.querySelector('#event-test ul')
      const children = document.querySelector('li.red')

      let result = ''
      const callbackA = () => {
        result += '1'
      }
      const callbackB = e => {
        result += '2'
        e.stopImmediatePropagation()
      }
      const callbackC = () => {
        result += '3'
      }
      on('click', callbackA, children)
      on('click', callbackB, children)
      on('click', callbackC, parent)

      trigger('click', children)
      expect(result).toEqual('12')
    })
  })

  describe('once()', () => {
    test('should works as bindEventOnce()', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      once('test', callback, el)

      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)

      trigger('test', el)
      trigger('test', el)

      expect(getEventEmitter(el).hasListeners('test')).toBeFalse()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(0)

      expect(result).toEqual(1)
    })
  })

  describe('off()', () => {
    test('should works as removeListener() if third arg is filled', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test', callback, el)

      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)

      trigger('test', el)
      expect(result).toEqual(1)

      off('test', callback, el)

      expect(getEventEmitter(el).hasListeners('test')).toBeFalse()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(0)
    })

    test('should works as removeAllListeners() if callback arg is undefined', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test', callback, el)
      on('test', callback, el)

      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(2)

      trigger('test', el)
      expect(result).toEqual(2)

      off('test', el)

      expect(getEventEmitter(el).hasListeners('test')).toBeFalse()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(0)
    })
  })

  describe('trigger()', () => {
    test('should trigger handler with detached node', () => {
      const el = document.querySelector('#event-test ul')
      let called = false
      const callback = () => {
        called = true
      }

      on('click', callback, el)

      trigger('click', el)
      expect(called).toBeTrue()
    })

    test('handler arguments arity', () => {
      const el = document.querySelector('#event-test ul')
      let count = 0
      const callback = (...args) => {
        count = args.length
      }
      on('click', callback, el)

      trigger('click', el)
      expect(count).toBe(1)

      trigger('click', 'foo', el)
      expect(count).toBe(2)

      trigger('click', 'foo', 'bar', el)
      expect(count).toBe(3)
    })
  })

  describe('namespace', () => {
    test('on event with namespace', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test.foo', callback, el)

      expect(getEventEmitter(el).hasListeners('test.foo')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test.foo')).toHaveLength(1)

      trigger('test.foo', el)
      expect(result).toEqual(1)
    })

    test('on event with more namespace', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test.foo', callback, el)
      on('test.bar', callback, el)

      expect(getEventEmitter(el).hasListeners('test.foo')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test.foo')).toHaveLength(1)

      expect(getEventEmitter(el).hasListeners('test.bar')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test.bar')).toHaveLength(1)

      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(2)

      trigger('test.foo', el)
      expect(result).toEqual(1)
      trigger('test.bar', el)
      expect(result).toEqual(2)
      trigger('test', el)
      expect(result).toEqual(4)
    })

    test('off event with eventname and namespace', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test.foo', callback, el)

      expect(getEventEmitter(el).hasListeners('test.foo')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test.foo')).toHaveLength(1)

      trigger('test.foo', el)
      expect(result).toEqual(1)

      off('test.foo', el)

      expect(getEventEmitter(el).hasListeners('test.foo')).toBeFalse()
      expect(getEventEmitter(el).getListeners('test.foo')).toHaveLength(0)
    })

    test('off event with eventname', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test.foo', callback, el)

      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)

      trigger('test.foo', el)
      expect(result).toEqual(1)

      off('test', el)

      expect(getEventEmitter(el).hasListeners('test.foo')).toBeFalse()
      expect(getEventEmitter(el).getListeners('test.foo')).toHaveLength(0)
    })

    test('off event with namespace', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test.foo', callback, el)

      expect(getEventEmitter(el).hasListeners('.foo')).toBeTrue()
      expect(getEventEmitter(el).getListeners('.foo')).toHaveLength(1)

      trigger('test.foo', el)
      expect(result).toEqual(1)

      off('.foo', el)

      expect(getEventEmitter(el).hasListeners('test.foo')).toBeFalse()
      expect(getEventEmitter(el).getListeners('test.foo')).toHaveLength(0)
    })

    test('off with namespace only remove that namespace', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callbackA = () => {
        result += 1
      }
      const callbackB = () => {
        result += 2
      }

      on('test.foo', callbackA, el)
      on('test.bar', callbackB, el)
      off('test.foo', el)

      trigger('test', el)
      expect(result).toEqual(2)
    })

    test('off all events with namespace', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('testA.foo', callback, el)
      on('testB.foo', callback, el)

      expect(getEventEmitter(el).hasListeners('.foo')).toBeTrue()
      expect(getEventEmitter(el).getListeners('.foo')).toHaveLength(2)

      trigger('testA.foo', el)
      expect(result).toEqual(1)
      trigger('testB.foo', el)
      expect(result).toEqual(2)

      off('.foo', el)

      expect(getEventEmitter(el).hasListeners('testA.foo')).toBeFalse()
      expect(getEventEmitter(el).hasListeners('testB.foo')).toBeFalse()
      expect(getEventEmitter(el).hasListeners('.foo')).toBeFalse()
      expect(getEventEmitter(el).getListeners('testA.foo')).toHaveLength(0)
      expect(getEventEmitter(el).getListeners('testB.foo')).toHaveLength(0)
      expect(getEventEmitter(el).getListeners('.foo')).toHaveLength(0)
    })
  })

  describe('Delegate', () => {
    test('should delegate event when trigger selector', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test', 'li.red', callback, el)
      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)

      trigger('test', document.querySelector('li.red'))
      expect(result).toEqual(1)

      off('test', 'li.red', el)
      trigger('test', document.querySelector('li.red'))
      expect(result).toEqual(1)
    })

    test('should undelegate event when trigger el', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = () => {
        result++
      }

      on('test', 'li.red', callback, el)
      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)

      trigger('test', el)
      expect(result).toEqual(0)
    })

    test('should delegate selector event when trigger selector', () => {
      const el = document.querySelector('#event-test ul')
      let result = null
      const callbackA = () => {
        result = 'red'
      }
      const callbackB = () => {
        result = 'green'
      }

      on('test', 'li.red', callbackA, el)
      on('test', 'li.green', callbackB, el)

      trigger('test', document.querySelector('li.red'))
      expect(result).toEqual('red')
    })

    test('should undelegate event when trigger target is el', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callbackA = () => {
        result += 1
      }
      const callbackB = () => {
        result += 2
      }

      on('test', 'li.red', callbackA, el)
      on('test', 'li.green', callbackB, el)

      trigger('test', el)
      expect(result).toEqual(0)
    })

    test('delegate handler will not called when trigger parent', () => {
      const parent = document.createElement('div')
      const child = document.createElement('div')

      parent.append(child)

      let called = false
      const callback = () => {
        called = true
      }
      on('click', 'div', callback, parent)

      trigger('click', parent)
      expect(called).toBeFalse()
    })

    test('delegate event properties', () => {
      const parent = document.createElement('div')
      const element = document.createElement('div')
      const child = document.createElement('span')

      parent.append(element)
      element.append(child)

      let type = null
      let target = null
      let currentTarget = null
      const callback = e => {
        type = e.type
        target = e.target
        currentTarget = e.currentTarget
      }

      on('click', 'div', callback, parent)
      trigger('click', child)

      expect(type).toBe('click')
      expect(target).toBe(child)
      expect(currentTarget).toBe(parent)
    })

    test('should prevent default with delegated event', () => {
      const parent = document.createElement('div')
      const element = document.createElement('div')
      const child = document.createElement('span')

      parent.append(element)
      element.append(child)

      on(
        'click',
        e => {
          e.preventDefault()
        },
        child
      )
      let isDefaultPrevented = null
      on(
        'click',
        'div',
        e => {
          isDefaultPrevented = e.defaultPrevented
        },
        parent
      )

      trigger('click', child)
      expect(isDefaultPrevented).toBeTrue()
    })

    test('should prevent default on original event after delegate', () => {
      const parent = document.createElement('div')
      const element = document.createElement('div')
      const child = document.createElement('span')

      parent.append(element)
      element.append(child)

      on(
        'click',
        'span',
        e => {
          e.preventDefault()
        },
        element
      )

      let isDefaultPrevented = null
      on(
        'click',
        e => {
          isDefaultPrevented = e.defaultPrevented
        },
        parent
      )

      trigger('click', child)
      expect(isDefaultPrevented).toBeTrue()
    })

    test('stopImmediatePropagation with delegate', () => {
      const parent = document.createElement('div')
      const element = document.createElement('div')
      const child = document.createElement('span')

      parent.append(element)
      element.append(child)

      let result = ''
      on(
        'click',
        'span',
        () => {
          result += '1'
        },
        element
      )

      on(
        'click',
        'span',
        e => {
          result += '2'
          e.stopImmediatePropagation()
        },
        element
      )

      on(
        'click',
        'span',
        () => {
          result += '3'
        },
        parent
      )

      trigger('click', child)

      expect(result).toBe('12')
    })
  })

  describe('detail', () => {
    test('should emit event with arg correctly', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = (e, value) => {
        result++
        expect(value).toBe('foo')
      }

      on('test', callback, el)
      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)
      trigger('test', 'foo', el)
      expect(result).toEqual(1)
    })

    test('should trigger event with args correctly', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = (e, arg1, arg2) => {
        result++
        expect(arg1).toBe('hello')
        expect(arg2).toBe('world')
      }

      on('test', callback, el)
      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)
      trigger('test', 'hello', 'world', el)
      expect(result).toEqual(1)
    })

    test('should trigger event with object arg correctly', () => {
      const el = document.querySelector('#event-test ul')
      let result = 0
      const callback = (e, obj) => {
        result++
        result += obj.num
      }

      on('test', callback, el)
      expect(getEventEmitter(el).hasListeners('test')).toBeTrue()
      expect(getEventEmitter(el).getListeners('test')).toHaveLength(1)
      trigger('test', { num: 1 }, el)
      expect(result).toEqual(2)
    })
  })
})
