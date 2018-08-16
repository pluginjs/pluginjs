import ChangeEvent from '../src/changeEvent'

describe('ChangeEvent', () => {
  describe('ChangeEvent.on()', () => {
    test('should bind fn to the list', () => {
      ChangeEvent.off()

      const fn = function() {
        return false
      }
      ChangeEvent.on(fn)

      expect(ChangeEvent.callbacks).toHaveLength(1)
      expect(ChangeEvent.callbacks.list[0].fn).toEqual(fn)
    })

    test('should trigger multi times', () => {
      ChangeEvent.off()

      let count = 0
      ChangeEvent.on(() => {
        count++
      })

      ChangeEvent.trigger('lg')
      expect(count).toEqual(1)

      ChangeEvent.trigger('lg')
      expect(count).toEqual(2)
    })

    test('should pass data to trigger', () => {
      ChangeEvent.off()

      const data = {
        foo: 'bar'
      }
      ChangeEvent.on(data, d => {
        expect(d).toEqual(data)
      })

      ChangeEvent.trigger('lg')
    })
  })

  describe('ChangeEvent.one()', () => {
    test('should bind fn to the list', () => {
      ChangeEvent.off()

      const fn = function() {
        return false
      }
      ChangeEvent.one(fn)

      expect(ChangeEvent.callbacks).toHaveLength(1)
      expect(ChangeEvent.callbacks.list[0].fn).toEqual(fn)
    })

    test('should trigger once', () => {
      ChangeEvent.off()

      let count = 0
      ChangeEvent.one(() => {
        count++
      })

      ChangeEvent.trigger('lg')
      expect(count).toEqual(1)

      ChangeEvent.trigger('lg')
      expect(count).toEqual(1)
    })
  })

  describe('ChangeEvent.trigger()', () => {
    test('should trigger the fn', () => {
      ChangeEvent.off()
      const current = 'md'
      ChangeEvent.current = current

      const size = 'lg'

      ChangeEvent.on(function() {
        expect(this.current).toEqual(size)
        expect(this.previous).toEqual(current)
      })

      ChangeEvent.trigger(size)
    })
  })

  describe('ChangeEvent.off()', () => {
    test('should empty the callbacks list', () => {
      ChangeEvent.on(() => {
        return false
      })
      ChangeEvent.off()

      expect(ChangeEvent.callbacks).toHaveLength(0)
    })
  })
})
