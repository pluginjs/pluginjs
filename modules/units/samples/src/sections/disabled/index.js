import { query } from '@pluginjs/dom'
import Units from '@pluginjs/units'

const element = query('#disabled .example-disabled')
Units.of(element, {})
