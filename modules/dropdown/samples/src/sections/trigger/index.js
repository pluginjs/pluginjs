import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#trigger .dropdown-trigger')
Dropdown.of(element, {
  trigger: 'hover'
})
