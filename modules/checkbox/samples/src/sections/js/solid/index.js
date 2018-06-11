import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Checkbox from '@pluginjs/checkbox'

const element = query(
  '.js input[type="checkbox"]',
  render(html, query('#jsSolid'))
)
Checkbox.of(element, {
  classes: {
    icon: 'icon-check-mini'
  }
})
