import Callbacks from '../src/callbacks'

describe('Callbacks', () => {
  const callbacks = new Callbacks()

  it('should exists', () => {
    expect(callbacks).toBeDefined()
    expect(Object.keys(callbacks.list)).toHaveLength(0)
  })

  it('should be able to add the callback to the list', () => {
    callbacks.add(() => {
      return false
    })
    expect(Object.keys(callbacks.list)).toHaveLength(1)
  })

  describe('Callbacks.add()', () => {
    it('should receive data as second argument', () => {
      const data = { foo: 'bar' }
      callbacks.add(() => {
        return false
      }, data)
      expect(callbacks.list[callbacks.list.length - 1].data).toEqual(data)
    })

    it('should receive one as third argument', () => {
      callbacks.add(
        () => {
          return false
        },
        {},
        true
      )
      expect(callbacks.list[callbacks.list.length - 1].one).toEqual(true)
    })
  })

  it('should be able to remove the specify callback', () => {
    const callbacks = new Callbacks()

    const callback = function() {
      console.info('hello')
    }
    callbacks.add(callback)
    expect(Object.keys(callbacks.list)).toHaveLength(1)

    callbacks.remove(callback)
    expect(Object.keys(callbacks.list)).toHaveLength(0)
  })

  it('should be able to empty the list', () => {
    callbacks.add(() => {
      return false
    })
    callbacks.empty()
    expect(Object.keys(callbacks.list)).toHaveLength(0)
  })

  describe('Callbacks.fire()', () => {
    it('should fire the callbacks in order', () => {
      const callbacks = new Callbacks()

      let callback1Called = false
      let callback2Called = false
      let last = null
      const callback1 = function() {
        callback1Called = true
        last = 1
      }
      const callback2 = function() {
        callback2Called = true
        last = 2
      }

      callbacks.add(callback1)
      callbacks.add(callback2)

      callbacks.fire()
      expect(callback1Called).toEqual(true)
      expect(callback2Called).toEqual(true)
      expect(last).toEqual(2)
    })

    it('should call the callback with data arguments', () => {
      const callbacks = new Callbacks()
      const data = { foo: 'bar' }

      const callback = function(arg) {
        expect(arg).toEqual(data)
      }
      callbacks.add(callback, data)
      callbacks.fire()
    })

    it('should fire again correctly', () => {
      const callbacks = new Callbacks()
      let count = 0
      const callback = function() {
        count++
      }

      callbacks.add(callback)
      callbacks.fire()
      expect(count).toEqual(1)

      callbacks.fire()
      expect(count).toEqual(2)

      callbacks.fire()
      expect(count).toEqual(3)
    })

    it('should fire once if callback one is set to true', () => {
      const callbacks = new Callbacks()
      let count = 0
      const callback = function() {
        count++
      }

      callbacks.add(callback, {}, true)
      expect(Object.keys(callbacks.list)).toHaveLength(1)

      callbacks.fire()

      expect(Object.keys(callbacks.list)).toHaveLength(0)
      expect(count).toEqual(1)

      callbacks.fire()
      expect(count).toEqual(1)

      callbacks.fire()
      expect(count).toEqual(1)
    })

    it('should pass the caller to the callback', () => {
      const caller = {}

      const callbacks = new Callbacks()
      const callback = function() {
        expect(this).toEqual(caller)
      }

      callbacks.add(callback)
      callbacks.fire(caller)
    })

    it('should be able to use fn to take over the default callback call', () => {
      const callbacks = new Callbacks()

      const theFn = function() {
        return false
      }
      const theCaller = {}
      const theData = {}

      callbacks.add(theFn, theData)

      callbacks.fire(theCaller, function(caller, callback, i) {
        expect(this).toEqual(callbacks)
        expect(caller).toEqual(theCaller)
        expect(callback.fn).toEqual(theFn)
        expect(callback.data).toEqual(theData)
        expect(parseInt(i, 10)).toEqual(0)
      })
    })
  })
})
