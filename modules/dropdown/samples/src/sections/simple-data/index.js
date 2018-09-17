import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#simple-data .dropdown-example')

const data = {
  foo: 'Foo',
  bar: 'Bar',
  qux: 'Qux'
}

Dropdown.of(element, {
  data,
  target: false
})
