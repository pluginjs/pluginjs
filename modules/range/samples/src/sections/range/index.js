import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Range from '@pluginjs/range'

const element = query('.example-range', render(html, query('#range')))

Range.of(element, {
  isRange: true,
  limit: false
})
