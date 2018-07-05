import { query } from '@pluginjs/dom'
import MapPicker from '@pluginjs/map-picker'

const element = query('#initvalue .example-input-value')

MapPicker.of(element, {})
