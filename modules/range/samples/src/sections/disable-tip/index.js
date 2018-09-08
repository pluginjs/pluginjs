import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#disable-tip .example-range')

Range.of(element, {
  tip: false
})
