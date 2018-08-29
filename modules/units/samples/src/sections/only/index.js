import { query } from '@pluginjs/dom'
import Units from '@pluginjs/units'

const element = query('#only .example-input')
Units.of(element, {
  units: ['px']
})
