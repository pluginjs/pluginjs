import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Select from '@pluginjs/select'

const element = query(
  '.example-multiple-filterable',
  render(html, query('#multiple-filterable'))
)

Select.of(element, {
  multiple: true,
  filterable: true
})
