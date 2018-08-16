import MediaQuery from '../src/mediaQuery'

describe('MediaQuery', () => {
  const media = '(max-width: 767px)'
  const mediaQuery = new MediaQuery(media)

  describe('new MediaQuery()', () => {
    test('should receive media argments', () => {
      expect(mediaQuery).toBeDefined()
      expect(mediaQuery.media).toEqual(media)
    })

    test('should initialized after constructor', () => {
      expect(mediaQuery.callbacks).toBeDefined()
    })
  })

  describe('mediaQuery.on()', () => {
    test('can receive object as first argment', () => {
      const mediaQuery = new MediaQuery(media)

      mediaQuery.on({})
      expect(mediaQuery.callbacks.enter).toHaveLength(0)
      expect(mediaQuery.callbacks.leave).toHaveLength(0)

      mediaQuery.on({
        enter() {
          return false
        },
        leave() {
          return false
        }
      })
      expect(mediaQuery.callbacks.enter).toHaveLength(1)
      expect(mediaQuery.callbacks.leave).toHaveLength(1)

      mediaQuery.on({
        enter() {
          return false
        }
      })
      expect(mediaQuery.callbacks.enter).toHaveLength(2)

      mediaQuery.on({
        leave() {
          return false
        }
      })
      expect(mediaQuery.callbacks.leave).toHaveLength(2)
    })

    test('can receive string as first argment', () => {
      const mediaQuery = new MediaQuery(media)

      mediaQuery.on('enter', () => {
        return false
      })
      expect(mediaQuery.callbacks.enter).toHaveLength(1)

      mediaQuery.on('enter', () => {
        return false
      })
      expect(mediaQuery.callbacks.enter).toHaveLength(2)
    })

    test('should receive data argment', () => {
      const mediaQuery = new MediaQuery(media)

      const data = { foo: 'bar' }
      const data2 = { bar: 'foo' }

      mediaQuery.on(
        {
          enter() {
            return false
          },
          leave() {
            return false
          }
        },
        data
      )

      expect(mediaQuery.callbacks.enter.list[0].data).toEqual(data)
      expect(mediaQuery.callbacks.leave.list[0].data).toEqual(data)

      mediaQuery.on('enter', data2, () => {
        return false
      })
      expect(mediaQuery.callbacks.enter.list[1].data).toEqual(data2)
    })
  })

  describe('mediaQuery.one()', () => {
    test('should set callback only call once', () => {
      const mediaQuery = new MediaQuery(media)

      mediaQuery.one({
        leave() {
          return false
        }
      })

      expect(mediaQuery.callbacks.leave).toHaveLength(1)
      expect(mediaQuery.callbacks.leave.list[0].one).toEqual(true)

      mediaQuery.one('leave', () => {
        return false
      })

      expect(mediaQuery.callbacks.leave).toHaveLength(2)
      expect(mediaQuery.callbacks.leave.list[1].one).toEqual(true)
    })
  })

  describe('mediaQuery.off()', () => {
    test('should empty enter and leave callbacks if no argments received', () => {
      const mediaQuery = new MediaQuery(media)

      mediaQuery.on({
        enter() {
          return false
        },
        leave() {
          return false
        }
      })

      mediaQuery.off()
      expect(mediaQuery.callbacks.enter).toHaveLength(0)
      expect(mediaQuery.callbacks.leave).toHaveLength(0)
    })

    test('should empty the specify event', () => {
      const mediaQuery = new MediaQuery(media)

      mediaQuery.on({
        enter() {
          return false
        },
        leave() {
          return false
        }
      })

      mediaQuery.off('enter')
      expect(mediaQuery.callbacks.enter).toHaveLength(0)
      expect(mediaQuery.callbacks.leave).toHaveLength(1)

      mediaQuery.off('leave')
      expect(mediaQuery.callbacks.leave).toHaveLength(0)
    })

    test('should remove the specify event with specify fn', () => {
      const mediaQuery = new MediaQuery(media)

      const foo = function() {
        return 'foo'
      }
      const bar = function() {
        return 'bar'
      }
      mediaQuery.on('enter', foo)
      mediaQuery.on('enter', bar)

      mediaQuery.off('enter', foo)
      expect(mediaQuery.callbacks.enter).toHaveLength(1)
      const leftCallback = mediaQuery.callbacks.enter.list.pop()
      expect(leftCallback.fn).toEqual(bar)
    })

    test('can receive object as first argment', () => {
      const mediaQuery = new MediaQuery(media)

      mediaQuery.on({
        enter() {
          return false
        },
        leave() {
          return false
        }
      })

      expect(mediaQuery.callbacks.enter).toHaveLength(1)
      expect(mediaQuery.callbacks.leave).toHaveLength(1)

      const foo = function() {
        return 'foo'
      }
      const bar = function() {
        return 'bar'
      }
      mediaQuery.on({
        enter: foo,
        leave: bar
      })
      expect(mediaQuery.callbacks.enter).toHaveLength(2)
      expect(mediaQuery.callbacks.leave).toHaveLength(2)

      mediaQuery.off({
        enter: foo,
        leave: bar
      })
      expect(mediaQuery.callbacks.enter).toHaveLength(1)
      expect(mediaQuery.callbacks.leave).toHaveLength(1)
    })
  })

  describe('mediaQuery.destroy()', () => {
    test('should be act as off()', () => {
      const mediaQuery = new MediaQuery(media)

      mediaQuery.on({
        enter() {
          return false
        },
        leave() {
          return false
        }
      })

      mediaQuery.destroy()

      expect(mediaQuery.callbacks.enter).toHaveLength(0)
      expect(mediaQuery.callbacks.leave).toHaveLength(0)
    })
  })
})
