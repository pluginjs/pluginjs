import { query } from '@pluginjs/dom'
import Units from '@pluginjs/units'

const element = query('#static-value .example-input')
Units.of(element)
