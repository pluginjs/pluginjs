import jsdom from 'mocha-jsdom'
import $ from 'jquery'
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
  console.log(TableSort.defaults)
  describe('TableSort()', () => {
    it('should have TableSort', () => {
      expect(TableSort).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(TableSort.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(TableSort.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(TableSort.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(TableSort.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const tableSort = new TableSort(element)

      expect(tableSort).to.be.an('object')
      expect(tableSort.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const tableSort = new TableSort(element)

      expect(tableSort.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const $element = $(element)

      expect($element.asTableSort()).to.be.equal($element)

      const api = $element.data('tableSort')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const $element = $(element).asTableSort()
      expect($element.asTableSort('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const element = document.createElement('table')
      element.innerHTML = testString
      const $element = $(element).asTableSort()
      expect($element.asTableSort('destroy')).to.be.equal($element)
      expect($element).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('table')
      element.innerHTML = testString
      $element = $(element)
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('tableSort:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asTableSort()
      expect(called).to.be.equal(1)
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

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('tableSort:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asTableSort('destroy')

      expect(called).to.be.equal(1)
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

    it('should enable the plugin', () => {
      $element.asTableSort('disable')
      $element.asTableSort('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('tableSort:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asTableSort('enable')
      expect(called).to.be.equal(1)
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

    it('should disable the plugin', () => {
      $element.asTableSort('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('tableSort:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asTableSort('disable')
      expect(called).to.be.equal(1)
    })
  })
})
