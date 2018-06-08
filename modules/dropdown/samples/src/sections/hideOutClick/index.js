import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query('.dropdown-out', render(html, query('#hideOutClick')))
Dropdown.of(element, {
  hideOutClick: false
})
