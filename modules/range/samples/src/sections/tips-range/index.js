import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#tips-range .example-units-range')

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
