import { html as render, query, queryAll } from '@pluginjs/dom'
import html from './index.html'
import Checkbox from '@pluginjs/checkbox'

const element = queryAll(
  'input[type="checkbox"]',
  render(html, query('#jsSolid'))
)
element.forEach(value => {
  Checkbox.of(value, {
    classes: {
      icon: 'icon-check-mini'
    }
  })
})
