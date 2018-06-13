import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Range from '@pluginjs/range'

const element = query('.example-input', render(html, query('#initvalue')))

Range.of(element, {
  isRange: true,
  unit: {
    px: {
      min: 0,
      max: 10,
      step: 1
    },
    '%': {
      min: 0,
      max: 100,
      step: 10
    }
  }
})
