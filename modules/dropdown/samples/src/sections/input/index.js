import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query('.dropdown-input', render(html, query('#input')))
Dropdown.of(element, {
  imitateSelect: true,
  inputLabel: true,
  hideOutClick: true
})
