import Emitter from '../../src'

function getObjectSize(obj) {
  return Object.getOwnPropertyNames(obj).length
}

describe('Emitter', () => {
  test('should have Emitter', () => {
    expect(Emitter).toBeFunction()
  })

  let dispatcher

  let preFooInvoked = false
  let postFooInvoked = false

  const preFoo = function() {
    preFooInvoked = true
  }

  const postFoo = function() {
    postFooInvoked = true

    return false
  }

  beforeEach(() => {
    dispatcher = new Emitter()
    preFooInvoked = false
    postFooInvoked = false
  })

  describe('once()', () => {
    test('should works as addOneTimeListener()', () => {
      let result = 0
      const callback = function() {
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
      const callback = function() {
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
      let result = 0
      const callback = function() {
        result++
      }

      dispatcher.on('event', callback)
      expect(dispatcher.hasListeners('event')).toBeTrue()
      expect(dispatcher.getListeners('event')).toHaveLength(1)

      dispatcher.off('event', callback)
      expect(dispatcher.hasListeners('event')).toBeFalse()
      expect(dispatcher.getListeners('event')).toHaveLength(0)
    })

    test('should works as removeAllListeners() if second arg is undefined', () => {
      let result = 0
      const callback = function() {
        result++
      }

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

      expect(dispatcher.getListeners('pre.foo')).toHaveLength(1)
      expect(dispatcher.getListeners('post.foo')).toHaveLength(1)
    })

    test('should throw an exception when registering an invalid listener', () => {
      try {
        dispatcher.addListener('event', 'invalid')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe('addOneTimeListener()', () => {
    test('should emit once', () => {
      let result = 0
      const callback = function() {
        result++
      }

      dispatcher.addOneTimeListener('event', callback)
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
      const callback = function() {}
      const callback2 = function() {}
      dispatcher.addListener('event', callback)
      dispatcher.addListener('event', callback2)

      expect(dispatcher.getListeners('event')).toHaveLength(2)
      dispatcher.removeListener('event', callback)

      expect(dispatcher.getListeners('event')).toHaveLength(1)
    })
  })

  describe('removeAllListeners()', () => {
    test('should remove multiple listeners at once', () => {
      const callback = function() {}
      dispatcher.addListener('event', callback)
      dispatcher.addListener('event', callback)

      dispatcher.removeAllListeners('event')
      expect(dispatcher.hasListeners('event')).toBeFalse()
    })
  })

  describe('getListeners()', () => {
    test('should return an empty array when an event has no listeners', () => {
      expect(dispatcher.getListeners('event')).toEqual([])
    })

    test('should accept custom listeners', () => {
      const callback = function() {}
      dispatcher.addListener('event', callback)

      expect(dispatcher.getListeners('event')).toEqual([
        {
          listener: callback,
          context: null
        }
      ])
    })

    test('should prioritize listeners', () => {
      const first = function() {
        return 1
      }
      const second = function() {
        return 2
      }

      dispatcher.addListener('event', first, null, 0)
      dispatcher.addListener('event', second, null, 50)

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

    test('should prioritize listeners 2', () => {
      const first = function() {
        return 1
      }
      const second = function() {
        return 2
      }

      dispatcher.addListener('event', first, null, 50)
      dispatcher.addListener('event', second, null, 0)

      expect(dispatcher.getListeners('event')).toEqual([
        {
          listener: second,
          context: null
        },
        {
          listener: first,
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

    test('should emit closure correctly', () => {
      let invoked = 0

      dispatcher.addListener('pre.foo', () => {
        ++invoked
      })
      dispatcher.addListener('post.foo', () => {
        ++invoked
      })

      dispatcher.emit('post.foo')
      expect(invoked).toEqual(1)
    })

    test('should call listener with context', () => {
      dispatcher.addListener(
        'foo',
        function() {
          expect(this).toEqual(context)
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

    test('should works correctly with priority', () => {
      let argResult = 0

      dispatcher.addListener('foo', arg => {
        argResult = 1

        return false
      })

      dispatcher.addListener(
        'foo',
        arg => {
          argResult = 2

          return false
        },
        null,
        1
      )

      expect(dispatcher.emit('foo', 'bar')).toBeFalse()

      expect(argResult).toEqual(2)
    })

    test('should works correctly with priority 2', () => {
      const argResult = []

      dispatcher.addListener(
        'foo',
        () => {
          argResult.push('a')
        },
        null,
        20
      )

      dispatcher.addListener(
        'foo',
        () => {
          argResult.push('b')
        },
        null,
        5
      )

      dispatcher.addListener(
        'foo',
        () => {
          argResult.push('c')
        },
        null,
        30
      )

      dispatcher.addListener('foo', () => {
        argResult.push('d')
      })

      dispatcher.emit('foo')

      expect(argResult).toEqual(['b', 'd', 'a', 'c'])
    })
  })
})
