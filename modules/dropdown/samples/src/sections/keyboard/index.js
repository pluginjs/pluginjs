import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#keyboard .dropdown-example')
Dropdown.of(element, {
  imitateSelect: true,
  keyboard: true
})
