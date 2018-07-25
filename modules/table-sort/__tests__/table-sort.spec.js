import TableSort from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

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

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const $element = $(element)

      expect($element.asTableSort()).toEqual($element)

      const api = $element.data('tableSort')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const $element = $(element).asTableSort()
      expect($element.asTableSort('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const $element = $(element).asTableSort()
      expect($element.asTableSort('destroy')).toEqual($element)
      expect($element).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('table')
      element.innerHTML = testString
      $element = $(element)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('tableSort:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asTableSort()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('table')
      element.innerHTML = testString
      $element = $(element).asTableSort()
      api = $element.data('tableSort')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('tableSort:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asTableSort('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('table')
      element.innerHTML = testString
      $element = $(element).asTableSort()
      api = $element.data('tableSort')
    })

    test('should enable the plugin', () => {
      $element.asTableSort('disable')
      $element.asTableSort('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('tableSort:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asTableSort('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('table')
      element.innerHTML = testString
      $element = $(element).asTableSort()
      api = $element.data('tableSort')
    })

    test('should disable the plugin', () => {
      $element.asTableSort('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('tableSort:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asTableSort('disable')
      expect(called).toEqual(1)
    })
  })
})
