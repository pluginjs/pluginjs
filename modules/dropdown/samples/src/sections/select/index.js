import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#select .pj-dropdown-trigger')
Dropdown.of(element, {
  imitateSelect: true,
  // inputLabel: true,
  select: '2',
  icon: 'icon-char icon-chevron-down'
})
