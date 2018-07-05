import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#initvalue .example-input')

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
