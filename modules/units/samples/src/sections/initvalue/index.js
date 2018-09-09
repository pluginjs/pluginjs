import { query } from '@pluginjs/dom'
import Units from '@pluginjs/units'

const element = query('#initvalue .example-input')
Units.of(element, {})
