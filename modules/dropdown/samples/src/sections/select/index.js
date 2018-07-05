import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#select .dropdown-select')
Dropdown.of(element, {
  imitateSelect: true,
  select: 2,
  icon: 'icon-char icon-chevron-down'
})
