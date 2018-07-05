import { query } from '@pluginjs/dom'
import SvgPicker from '@pluginjs/svg-picker'

const element = query('#keyboard .example-keyboard')

SvgPicker.of(element, { keyboard: true })
