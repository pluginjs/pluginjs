import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#tip-on-move .example-range')

Range.of(element, {
  tip: 'move'
})
