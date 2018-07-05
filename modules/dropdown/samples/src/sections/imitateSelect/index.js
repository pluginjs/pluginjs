import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#imitateSelect .dropdown-imitateSelect')
Dropdown.of(element, {
  imitateSelect: true,
  select: 2
})
