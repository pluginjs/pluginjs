import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query(
  '.dropdown-imitateSelect',
  render(html, query('#imitateSelect'))
)
Dropdown.of(element, {
  imitateSelect: true,
  select: 2
})
