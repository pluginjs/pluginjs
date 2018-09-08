import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#tip-always .example-range')

Range.of(element, {
  tip: 'always'
})
