import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#customItem .dropdown-example')

const data = [
  {
    value: 'cloud',
    label: 'Cloud',
    icon: 'chat-group-solid'
  },
  {
    value: 'compass',
    label: 'Compass',
    icon: 'google-font'
  },
  {
    value: 'flag',
    label: 'Flag',
    icon: 'lock-solid'
  },
  {
    value: 'gallery',
    label: 'Gallery',
    icon: 'single-solid'
  }
]

Dropdown.of(element, {
  data,
  imitateSelect: true,
  templates: {
    item() {
      return '<div class="{classes.ITEM}" {itemValueAttr}="{item.value}"><i class="icon icon-{item.icon}"></i> {item.label}</div>'
    }
  }
})
