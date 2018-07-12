import { query } from '@pluginjs/dom'
import MapPicker from '@pluginjs/map-picker'

const element = query('#disabled .example-default')

const address = 'fuzhou'

MapPicker.of(element, { address, disabled: true })
