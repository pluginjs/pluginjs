import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const element = query('#customItem .dropdown-example')

const data = [
  {
    value: 'book',
    label: 'Book',
    icon: 'book-solid'
  },
  {
    value: 'calendar',
    label: 'Calendar',
    icon: 'calendar'
  },
  {
    value: 'image',
    label: 'Image',
    icon: 'image'
  },
  {
    value: 'home',
    label: 'Home',
    icon: 'home-solid'
  }
]

Dropdown.of(element, {
  data,
  imitateSelect: true,
  offset: '0,2px',
  templates: {
    item() {
      return '<div class="{classes.ITEM}" {itemValueAttr}="{item.value}"><i class="pj-icon pj-icon-{item.icon}"></i> {item.label}</div>'
    }
  }
})
