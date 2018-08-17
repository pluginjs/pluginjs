import Emitter from '../src/main'

describe('Emitter', () => {
  test('should have Emitter', () => {
    expect(Emitter).toBeFunction()
  })

  let dispatcher

  let preFooInvoked = false
  let postFooInvoked = false

  const preFoo = () => {
    preFooInvoked = true
  }

  const postFoo = () => {
    postFooInvoked = true

    return false
  }

  beforeEach(() => {
    dispatcher = new Emitter()
    preFooInvoked = false
    postFooInvoked = false
  })

  describe('once()', () => {
    test('should works as addListenerOnce()', () => {
      let result = 0
      const callback = () => {
        result++
      }

      dispatcher.once('event', callback)
      expect(dispatcher.hasListeners('event')).toBeTrue()
      expect(dispatcher.getListeners('event')).toHaveLength(1)

      dispatcher.emit('event')
      dispatcher.emit('event')

      expect(dispatcher.hasListeners('event')).toBeFalse()
      expect(dispatcher.getListeners('event')).toHaveLength(0)

      expect(result).toEqual(1)
    })
  })

  describe('on()', () => {
    test('should works as addListener()', () => {
      let result = 0
      const callback = () => {
        result++
      }

      dispatcher.on('event', callback)
      expect(dispatcher.hasListeners('event')).toBeTrue()
      expect(dispatcher.getListeners('event')).toHaveLength(1)
      dispatcher.emit('event')
      dispatcher.emit('event')

      expect(result).toEqual(2)
    })
  })

  describe('off()', () => {
    test('should works as removeListener() if second arg is filled', () => {
      const callback = () => console.log('callback')

      dispatcher.on('event', callback)
      expect(dispatcher.hasListeners('event')).toBeTrue()
      expect(dispatcher.getListeners('event')).toHaveLength(1)

      dispatcher.off('event', callback)
      expect(dispatcher.hasListeners('event')).toBeFalse()
      expect(dispatcher.getListeners('event')).toHaveLength(0)
    })

    test('should works as removeAllListeners() if second arg is undefined', () => {
      const callback = () => console.log('callback')

      dispatcher.on('event', callback)
      dispatcher.on('event', callback)
      expect(dispatcher.hasListeners('event')).toBeTrue()
      expect(dispatcher.getListeners('event')).toHaveLength(2)

      dispatcher.off('event')
      expect(dispatcher.hasListeners('event')).toBeFalse()
      expect(dispatcher.getListeners('event')).toHaveLength(0)
    })
  })

  describe('addListener()', () => {
    test('should add listener correctly', () => {
      dispatcher.addListener('pre.foo', preFoo)
      dispatcher.addListener('post.foo', postFoo)

      expect(dispatcher.hasListeners('pre.foo')).toBeTrue()
      expect(dispatcher.hasListeners('post.foo')).toBeTrue()
      expect(dispatcher.hasListeners('.foo')).toBeTrue()

      expect(dispatcher.getListeners('pre.foo')).toHaveLength(1)
      expect(dispatcher.getListeners('post.foo')).toHaveLength(1)
      expect(dispatcher.getListeners('.foo')).toHaveLength(2)
    })

    test('should throw an exception when registering an invalid listener', () => {
      try {
        dispatcher.addListener('event', 'invalid')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe('addListenerOnce()', () => {
    test('should emit once', () => {
      let result = 0
      const callback = () => {
        result++
      }

      dispatcher.addListenerOnce('event', callback)
      expect(dispatcher.hasListeners('event')).toBeTrue()
      expect(dispatcher.getListeners('event')).toHaveLength(1)

      dispatcher.emit('event')
      dispatcher.emit('event')

      expect(dispatcher.hasListeners('event')).toBeFalse()
      expect(dispatcher.getListeners('event')).toHaveLength(0)

      expect(result).toEqual(1)
    })
  })

  describe('removeListener()', () => {
    test('should remove listener added before', () => {
      dispatcher.addListener('pre.foo', preFoo)
      expect(dispatcher.hasListeners('pre.foo')).toBeTrue()

      dispatcher.removeListener('pre.foo', preFoo)
      expect(dispatcher.hasListeners('pre.foo')).toBeFalse()

      dispatcher.removeListener('notExists', preFoo)
    })

    test('should all you to remove listeners', () => {
      const callback = () => console.log('callback')
      const callback2 = () => console.log('callback2')
      dispatcher.addListener('event', callback)
      dispatcher.addListener('event', callback2)

      expect(dispatcher.getListeners('event')).toHaveLength(2)
      dispatcher.removeListener('event', callback)

      expect(dispatcher.getListeners('event')).toHaveLength(1)
    })
  })

  describe('removeAllListeners()', () => {
    test('should remove multiple listeners at once', () => {
      const callback = () => console.log('callback')
      dispatcher.addListener('event', callback)
      dispatcher.addListener('event', callback)

      expect(dispatcher.getListeners('event')).toHaveLength(2)
      dispatcher.removeAllListeners('event')
      expect(dispatcher.hasListeners('event')).toBeFalse()
      expect(dispatcher.getListeners('event')).toHaveLength(0)
    })
  })

  describe('getListeners()', () => {
    test('should return an empty array when an event has no listeners', () => {
      expect(dispatcher.getListeners('event')).toEqual([])
    })

    test('should accept custom listeners', () => {
      const callback = () => console.log('callback')
      dispatcher.addListener('event', callback)

      expect(dispatcher.getListeners('event')).toEqual([
        {
          listener: callback,
          context: null
        }
      ])
    })

    test('should accept two custom listeners', () => {
      const first = () => {
        return 1
      }
      const second = () => {
        return 2
      }

      dispatcher.addListener('event', first, null)
      dispatcher.addListener('event', second, null)

      expect(dispatcher.getListeners('event')).toEqual([
        {
          listener: first,
          context: null
        },
        {
          listener: second,
          context: null
        }
      ])
    })
  })

  describe('emit()', () => {
    test('should emit closure correctly', () => {
      dispatcher.addListener('pre.foo', preFoo)
      dispatcher.addListener('post.foo', postFoo)

      dispatcher.emit('pre.foo')
      expect(preFooInvoked).toBeTrue()
      expect(postFooInvoked).toBeFalse()
    })

    test('should call listener with context', () => {
      dispatcher.addListener(
        'foo',
        function() {
          expect(this).toEqual('context')
        },
        'context'
      )
    })

    test('should call listener with thisArg', () => {
      dispatcher.addListener('foo', function() {
        expect(this).toEqual({ type: 'foo' })
      })

      expect(dispatcher.emit('foo')).toBeTrue()
    })

    test('should emit event with arg correctly', () => {
      let argResult = null

      dispatcher.addListener('foo', arg => {
        argResult = arg
      })

      expect(dispatcher.emit('foo', 'bar')).toBeTrue()

      expect(argResult).toEqual('bar')
    })

    test('should emit event with args correctly', () => {
      let arg1Result = null
      let arg2Result = null

      dispatcher.addListener('foo', (arg1, arg2) => {
        arg1Result = arg1
        arg2Result = arg2
      })

      expect(dispatcher.emit('foo', 'hello', 'world')).toBeTrue()

      expect(arg1Result).toEqual('hello')
      expect(arg2Result).toEqual('world')
    })

    test('should emit all listeners added to event', () => {
      let invoked = 0

      dispatcher.addListener('pre.foo', () => {
        invoked += 1
      })

      dispatcher.addListener('pre.foo', () => {
        invoked += 10
      })

      dispatcher.addListener('pre.foo', () => {
        invoked += 100
      })

      dispatcher.emit('pre.foo')

      expect(invoked).toEqual(111)
    })

    test('should stop event propagation when listener return false', () => {
      let invoked = 0

      dispatcher.addListener('pre.foo', () => {
        invoked += 1
      })

      dispatcher.addListener('pre.foo', () => {
        invoked += 10

        return false
      })

      dispatcher.addListener('pre.foo', () => {
        invoked += 100
      })

      expect(dispatcher.emit('pre.foo')).toBeFalse()

      expect(invoked).toEqual(11)
    })

    test('should call listeners in order with same priority', () => {
      let invoked = 0

      dispatcher.addListener('pre.foo', () => {
        invoked += 1

        expect(invoked).toEqual(1)
      })

      dispatcher.addListener('pre.foo', () => {
        invoked += 10

        expect(invoked).toEqual(11)
      })

      dispatcher.addListener('pre.foo', () => {
        invoked += 100

        expect(invoked).toEqual(111)
      })

      dispatcher.emit('pre.foo')

      expect(invoked).toEqual(111)
    })
  })

    test('should works correctly with priority', () => {
      let argResult = 0

      dispatcher.addListener('foo', () => {
        argResult = 1

        return false
      })

      dispatcher.addListener(
        'foo',
        () => {
          argResult = 2

          return false
        },
        null,
        1
      )

      expect(dispatcher.emit('foo', 'bar')).toBeFalse()

      expect(argResult).toEqual(2)
    })

    test('should return eventName when namespace is null', () => {
      expect(Emitter.parseEvent('pre')).toEqual({
        eventName: 'pre',
        namespace: null
      })
    })

    test('should return namespace when eventName is null', () => {
      expect(Emitter.parseEvent('.foo')).toEqual({
        eventName: null,
        namespace: 'foo'
      })
    })

    test('should return null when eventName and namespace are undefined', () => {
      expect(Emitter.parseEvent(' ')).toEqual({
        eventName: null,
        namespace: null
      })
    })
  })

  describe('namespace', () => {
    test('should throw an exception when eventName is undefined', () => {
      try {
        const callback = () => {
          return
        }
        dispatcher.addListener('.foo', callback)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    test('should accept event with namespace', () => {
      const callback = () => {
        return
      }
      dispatcher.addListener('pre.foo', callback)
      expect(dispatcher.hasListeners('.foo')).toBeTrue()
      expect(dispatcher.getListeners('pre.foo')).toHaveLength(1)
      expect(dispatcher.getListeners('.foo')).toHaveLength(1)
    })

    test('should off all event with namespace', () => {
      const callback = () => {
        return
      }
      dispatcher.addListener('pre.foo', callback)
      dispatcher.addListener('post.foo', callback)
      expect(dispatcher.getListeners('.foo')).toHaveLength(2)

      dispatcher.off('.foo')
      expect(dispatcher.hasListeners('.foo')).toBeFalse()
      expect(dispatcher.getListeners('.foo')).toHaveLength(0)
    })
  })
})
