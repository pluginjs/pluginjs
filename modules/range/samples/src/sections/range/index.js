import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#range .example-range')

Range.of(element, {
  isRange: true,
  limit: false
})
