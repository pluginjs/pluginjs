import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#imitateSelect .dropdown-example')
Dropdown.of(element, {
  imitateSelect: true,
  offset: '0,2px'
})
