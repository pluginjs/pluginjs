import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'

const element = query('#empty .example-empty')
IconPicker.of(element, {})
