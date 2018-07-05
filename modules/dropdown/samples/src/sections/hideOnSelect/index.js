import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#hideOnSelect .dropdown-hideOnSelect')
Dropdown.of(element, {
  hideOnSelect: false
})
