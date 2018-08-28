import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#itemValueAttr .dropdown-example')
Dropdown.of(element, {
  imitateSelect: true,
  itemValueAttr: 'data-category',
  offset: '0,2px'
})
