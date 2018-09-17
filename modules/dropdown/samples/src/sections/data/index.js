import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#data .dropdown-example')

const data = [
  {
    value: 'item-1',
    label: 'Item 1'
  },
  {
    value: 'item-2',
    label: 'Item 2',
    disabled: true
  },
  {
    value: 'item-3',
    label: 'Item 3'
  },
  {
    value: 'item-4',
    label: 'Item 4'
  },
  {
    value: 'item-5',
    label: 'Item 5'
  }
]

Dropdown.of(element, {
  data,
  target: false
})
