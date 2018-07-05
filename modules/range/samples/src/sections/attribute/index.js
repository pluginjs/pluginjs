import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#attribute .example-attribute')

Range.of(element, { isRange: true })
