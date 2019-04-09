import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#trigger .pj-dropdown-trigger')
Dropdown.of(element, {
  value: '1',
  trigger: 'hover'
})
