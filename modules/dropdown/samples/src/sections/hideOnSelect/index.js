import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query(
  '.dropdown-hideOnSelect',
  render(html, query('#hideOnSelect'))
)
Dropdown.of(element, {
  hideOnSelect: false
})
