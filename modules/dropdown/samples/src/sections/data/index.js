import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#data .dropdown-example')

const data = {
  1: 'foo',
  2: 'bar',
  3: 'qux'
}

Dropdown.of(element, {
  data,
  imitateSelect: true
})
