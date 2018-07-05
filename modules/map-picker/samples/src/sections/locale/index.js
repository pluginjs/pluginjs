import { query } from '@pluginjs/dom'
import MapPicker from '@pluginjs/map-picker'

const element = query('#locale .example-locale')

MapPicker.of(element, { locale: 'zh' })
