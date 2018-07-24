import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#hideOnSelect .pj-dropdown-trigger')
Dropdown.of(element, {
  hideOnSelect: true
})
