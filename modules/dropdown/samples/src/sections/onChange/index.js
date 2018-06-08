import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query('.dropdown-onChange', render(html, query('#onChange')))
Dropdown.of(element, {
  panel: '.onChange',
  itemValueAttr: 'category',
  imitateSelect: true,
  select: 'sport',
  onChange(value) {
    console.info(`selected ${value}`)
  }
})
