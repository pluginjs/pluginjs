import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Range from '@pluginjs/range'

const element = query(
  '.example-units-range',
  render(html, query('#tips-range'))
)

Range.of(element, {
  isRange: true,
  unit: {
    px: {
      min: 1,
      max: 100,
      step: 1
    },
    '%': {
      min: 1,
      max: 10,
      step: 1
    }
  }
})
