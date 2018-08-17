import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#hideOnSelect .dropdown-example')
Dropdown.of(element, {
  hideOutClick: false
})
