import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#keyboard .example-keyboard')

Range.of(element, { keyboard: true })
