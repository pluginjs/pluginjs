import $ from 'jquery'
import Emitter from '../../src'

function getObjectSize(obj) {
  return Object.getOwnPropertyNames(obj).length
}

describe('Emitter', () => {
  it('should have Emitter', () => {
    expect(Emitter).to.be.an('function')
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
    it('should works as addOneTimeListener()', () => {
      let result = 0
      const callback = function() {
        result++
      }

      dispatcher.once('event', callback)
      expect(dispatcher.hasListeners('event')).to.be.true
      expect(dispatcher.getListeners('event').length).to.be.equal(1)

      dispatcher.emit('event')
      dispatcher.emit('event')

      expect(dispatcher.hasListeners('event')).to.be.false
      expect(dispatcher.getListeners('event').length).to.be.equal(0)

      expect(result).to.be.equal(1)
    })
  })

  describe('on()', () => {
    it('should works as addListener()', () => {
      let result = 0
      const callback = function() {
        result++
      }

      dispatcher.on('event', callback)
      expect(dispatcher.hasListeners('event')).to.be.true
      expect(dispatcher.getListeners('event').length).to.be.equal(1)

      dispatcher.emit('event')
      dispatcher.emit('event')

      expect(result).to.be.equal(2)
    })
  })

  describe('off()', () => {
    it('should works as removeListener() if second arg is filled', () => {
      let result = 0
      const callback = function() {
        result++
      }

      dispatcher.on('event', callback)
      expect(dispatcher.hasListeners('event')).to.be.true
      expect(dispatcher.getListeners('event').length).to.be.equal(1)

      dispatcher.off('event', callback)
      expect(dispatcher.hasListeners('event')).to.be.false
      expect(dispatcher.getListeners('event').length).to.be.equal(0)
    })

    it('should works as removeAllListeners() if second arg is undefined', () => {
      let result = 0
      const callback = function() {
        result++
      }

      dispatcher.on('event', callback)
      dispatcher.on('event', callback)
      expect(dispatcher.hasListeners('event')).to.be.true
      expect(dispatcher.getListeners('event').length).to.be.equal(2)

      dispatcher.off('event')
      expect(dispatcher.hasListeners('event')).to.be.false
      expect(dispatcher.getListeners('event').length).to.be.equal(0)
    })
  })

  describe('addListener()', () => {
    it('should add listener correctly', () => {
      dispatcher.addListener('pre.foo', preFoo)
      dispatcher.addListener('post.foo', postFoo)

      expect(dispatcher.hasListeners('pre.foo')).to.be.true
      expect(dispatcher.hasListeners('post.foo')).to.be.true

      expect(dispatcher.getListeners('pre.foo').length).to.be.equal(1)
      expect(dispatcher.getListeners('post.foo').length).to.be.equal(1)
    })

    it('should throw an exception when registering an invalid listener', () => {
      try {
        dispatcher.addListener('event', 'invalid')
      } catch (error) {
        expect(error).to.be.an('error')
      }
    })
  })

  describe('addOneTimeListener()', () => {
    it('should emit once', () => {
      let result = 0
      const callback = function() {
        result++
      }

      dispatcher.addOneTimeListener('event', callback)
      expect(dispatcher.hasListeners('event')).to.be.true
      expect(dispatcher.getListeners('event').length).to.be.equal(1)

      dispatcher.emit('event')
      dispatcher.emit('event')

      expect(dispatcher.hasListeners('event')).to.be.false
      expect(dispatcher.getListeners('event').length).to.be.equal(0)

      expect(result).to.be.equal(1)
    })
  })

  describe('removeListener()', () => {
    it('should remove listener added before', () => {
      dispatcher.addListener('pre.foo', preFoo)
      expect(dispatcher.hasListeners('pre.foo')).to.be.true

      dispatcher.removeListener('pre.foo', preFoo)
      expect(dispatcher.hasListeners('pre.foo')).to.be.false

      dispatcher.removeListener('notExists', preFoo)
    })

    it('should all you to remove listeners', () => {
      const callback = function() {}
      const callback2 = function() {}
      dispatcher.addListener('event', callback)
      dispatcher.addListener('event', callback2)

      expect(dispatcher.getListeners('event').length).to.be.equal(2)
      dispatcher.removeListener('event', callback)

      expect(dispatcher.getListeners('event').length).to.be.equal(1)
    })
  })

  describe('removeAllListeners()', () => {
    it('should remove multiple listeners at once', () => {
      const callback = function() {}
      dispatcher.addListener('event', callback)
      dispatcher.addListener('event', callback)

      dispatcher.removeAllListeners('event')
      expect(dispatcher.hasListeners('event')).to.be.false
    })
  })

  describe('getListeners()', () => {
    it('should return an empty array when an event has no listeners', () => {
      expect(dispatcher.getListeners('event')).to.be.eql([])
    })

    it('should accept custom listeners', () => {
      const callback = function() {}
      dispatcher.addListener('event', callback)

      expect(dispatcher.getListeners('event')).to.eql([
        {
          listener: callback,
          context: null
        }
      ])
    })

    it('should prioritize listeners', () => {
      const first = function() {
        return 1
      }
      const second = function() {
        return 2
      }

      dispatcher.addListener('event', first, null, 0)
      dispatcher.addListener('event', second, null, 50)

      expect(dispatcher.getListeners('event')).to.eql([
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

    it('should prioritize listeners 2', () => {
      const first = function() {
        return 1
      }
      const second = function() {
        return 2
      }

      dispatcher.addListener('event', first, null, 50)
      dispatcher.addListener('event', second, null, 0)

      expect(dispatcher.getListeners('event')).to.eql([
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
    it('should emit closure correctly', () => {
      dispatcher.addListener('pre.foo', preFoo)
      dispatcher.addListener('post.foo', postFoo)

      dispatcher.emit('pre.foo')
      expect(preFooInvoked).to.be.true
      expect(postFooInvoked).to.be.false
    })

    it('should emit closure correctly', () => {
      let invoked = 0

      dispatcher.addListener('pre.foo', () => {
        ++invoked
      })
      dispatcher.addListener('post.foo', () => {
        ++invoked
      })

      dispatcher.emit('post.foo')
      expect(invoked).to.be.equal(1)
    })

    it('should call listener with context', () => {
      dispatcher.addListener(
        'foo',
        function() {
          expect(this).to.be.eql(context)
        },
        'context'
      )
    })

    it('should call listener with thisArg', () => {
      dispatcher.addListener('foo', function() {
        expect(this).to.be.eql({ type: 'foo' })
      })

      expect(dispatcher.emit('foo')).to.be.true
    })

    it('should emit event with arg correctly', () => {
      let argResult = null

      dispatcher.addListener('foo', arg => {
        argResult = arg
      })

      expect(dispatcher.emit('foo', 'bar')).to.be.true

      expect(argResult).to.be.equal('bar')
    })

    it('should emit event with args correctly', () => {
      let arg1Result = null
      let arg2Result = null

      dispatcher.addListener('foo', (arg1, arg2) => {
        arg1Result = arg1
        arg2Result = arg2
      })

      expect(dispatcher.emit('foo', 'hello', 'world')).to.be.true

      expect(arg1Result).to.be.equal('hello')
      expect(arg2Result).to.be.equal('world')
    })

    it('should emit all listeners added to event', () => {
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

      expect(invoked).to.be.equal(111)
    })

    it('should stop event propagation when listener return false', () => {
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

      expect(dispatcher.emit('pre.foo')).to.be.false

      expect(invoked).to.be.equal(11)
    })

    it('should call listeners in order with same priority', () => {
      let invoked = 0

      dispatcher.addListener('pre.foo', () => {
        invoked += 1

        expect(invoked).to.be.equal(1)
      })

      dispatcher.addListener('pre.foo', () => {
        invoked += 10

        expect(invoked).to.be.equal(11)
      })

      dispatcher.addListener('pre.foo', () => {
        invoked += 100

        expect(invoked).to.be.equal(111)
      })

      dispatcher.emit('pre.foo')

      expect(invoked).to.be.equal(111)
    })

    it('should works correctly with priority', () => {
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

      expect(dispatcher.emit('foo', 'bar')).to.be.false

      expect(argResult).to.be.equal(2)
    })

    it('should works correctly with priority 2', () => {
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

      expect(argResult).to.be.eql(['b', 'd', 'a', 'c'])
    })
  })
})
