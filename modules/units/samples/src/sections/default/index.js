import { query } from '@pluginjs/dom'
import Units from '@pluginjs/units'

const element = query('#default .example-default')
Units.of(element, { data: ['px', '%'] })
