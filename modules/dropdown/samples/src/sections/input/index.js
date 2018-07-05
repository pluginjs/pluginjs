import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#input .dropdown-input')
Dropdown.of(element, {
  imitateSelect: true,
  inputLabel: true,
  hideOutClick: true
})
