import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#hideOutClick .pj-dropdown-trigger')
Dropdown.of(element, {
  hideOutClick: true
})
