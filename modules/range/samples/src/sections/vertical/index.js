import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#vertical .example-range')

Range.of(element, {
  range: true,
  vertical: true
})
