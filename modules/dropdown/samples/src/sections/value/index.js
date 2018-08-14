import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#value .dropdown-example')
Dropdown.of(element, {
  imitateSelect: true,
  value: '2'
})
