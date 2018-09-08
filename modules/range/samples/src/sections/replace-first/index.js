import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#replace-first .example-range')

Range.of(element, {
  replaceFirst: 'inherit',
  input: true
})
