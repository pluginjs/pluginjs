import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Range from '@pluginjs/range'

const element = query('.example-units', render(html, query('#units')))

Range.of(element, {
  unit: {
    px: {
      min: 1,
      max: 100,
      step: 1
    },
    '%': {
      min: 1,
      max: 100,
      step: 1
    }
  }
})
