import { query } from '@pluginjs/dom'
import Offset from '@pluginjs/offset'

const element = query('#disabled .example-disabled')

Offset.of(element, { disabled: true })
