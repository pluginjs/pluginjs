import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#default .dropdown-example')
Dropdown.of(element, {
  value: [1, 2],
  multiple: true
})
