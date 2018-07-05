import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Select from '@pluginjs/select'

const element = query(
  '.example-option-disabled',
  render(html, query('#option-disabled'))
)

Select.of(element, {})
