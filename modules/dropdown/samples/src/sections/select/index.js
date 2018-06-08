import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query('.dropdown-select', render(html, query('#select')))
Dropdown.of(element, {
  imitateSelect: true,
  select: 2,
  icon: 'icon-char icon-chevron-down'
})
