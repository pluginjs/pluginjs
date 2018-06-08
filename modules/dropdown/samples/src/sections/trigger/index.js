import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query('.dropdown-trigger', render(html, query('#trigger')))
Dropdown.of(element, {
  trigger: 'hover'
})
