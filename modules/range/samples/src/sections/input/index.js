import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#input .example-input')

Range.of(element, {
  input: true
})
