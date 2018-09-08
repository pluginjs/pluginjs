import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#disabled .example-default')

Range.of(element, { disabled: true })
