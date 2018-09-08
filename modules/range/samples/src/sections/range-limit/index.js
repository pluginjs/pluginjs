import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#range-limit .example-range')

Range.of(element, {
  range: true,
  limit: false
})
