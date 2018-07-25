import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#keyboard .pj-dropdown-trigger')
Dropdown.of(element, {
  itemValueAttr: 'category',
  keyboard: true
})
