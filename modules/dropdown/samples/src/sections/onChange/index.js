import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#onChange .dropdown-onChange')
Dropdown.of(element, {
  panel: '.onChange',
  itemValueAttr: 'category',
  imitateSelect: true,
  select: 'sport',
  onChange(value) {
    console.info(`selected ${value.innerText}`)
  }
})
