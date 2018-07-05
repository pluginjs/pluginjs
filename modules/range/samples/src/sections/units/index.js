import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#units .example-units')

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
