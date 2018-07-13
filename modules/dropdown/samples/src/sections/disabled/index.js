import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query(' #disabled .dropdown-select')
Dropdown.of(element, {
  disabled: true,
  imitateSelect: true,
  select: 2,
  icon: 'icon-char icon-chevron-down'
})
