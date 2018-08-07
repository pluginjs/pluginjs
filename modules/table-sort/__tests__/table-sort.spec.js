import TableSort from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

const testString = `<thead>
<tr>
  <th data-type="int">some int</th>
  <th data-type="float">some float</th>
  <th data-type="string">some string</th>
</tr>
</thead>
<tbody>
<tr>
  <td>15</td>
  <td>-.18</td>
  <td>banana</td>
</tr>
<tr>
  <td>95</td>
  <td>36</td>
  <td>coke</td>
</tr>
<tr>
  <td>2</td>
  <td>-152.5</td>
  <td>apple</td>
</tr>
<tr>
  <td>-53</td>
  <td>88.5</td>
  <td>zebra</td>
</tr>
<tr>
  <td>195</td>
  <td>-858</td>
  <td>orange</td>
</tr>
</tbody>`

describe('TableSort', () => {
  describe('TableSort()', () => {
    test('should have TableSort', () => {
      expect(TableSort).toBeFunction()
    })

    test('should have defaults', () => {
      expect(TableSort.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(TableSort.events).toBeObject()
    })
    test('should have classes', () => {
      expect(TableSort.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(TableSort.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const tableSort = new TableSort(element)

      expect(tableSort).toBeObject()
      expect(tableSort.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const tableSort = new TableSort(element)

      expect(tableSort.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const tableSort = new TableSort(element)
      expect(tableSort.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const tableSort = new TableSort(element)
      expect(tableSort.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('table')
      element.innerHTML = testString
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('tableSort:ready', () => {
        called++
      })

      api = TableSort.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('table')
      element.innerHTML = testString
      api = TableSort.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('tableSort:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()
      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('table')
      element.innerHTML = testString
      api = TableSort.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('tableSort:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('table')
      element.innerHTML = testString
      api = TableSort.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()
      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('tableSort:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
