import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#hideOutClick .dropdown-out')
Dropdown.of(element, {
  hideOutClick: false
})
