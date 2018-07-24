import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#imitateSelect .pj-dropdown-trigger')
Dropdown.of(element, {
  imitateSelect: true,
  select: '2'
})
