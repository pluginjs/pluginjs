import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#customItem .dropdown-example')

const data = [
  {
    value: 'cloud',
    label: 'Cloud',
    icon: 'cloud'
  },
  {
    value: 'compass',
    label: 'Compass',
    icon: 'compass'
  },
  {
    value: 'flag',
    label: 'Flag',
    icon: 'flag'
  },
  {
    value: 'gallery',
    label: 'Gallery',
    icon: 'gallery'
  }
]

Dropdown.of(element, {
  data,
  imitateSelect: true,
  offset: '0,2px',
  templates: {
    item() {
      return '<div class="{classes.ITEM}" {itemValueAttr}="{item.value}"><i class="icon icon-{item.icon}"></i> {item.label}</div>'
    }
  }
})
