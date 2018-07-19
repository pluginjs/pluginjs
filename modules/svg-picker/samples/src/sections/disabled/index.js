import { query } from '@pluginjs/dom'
import SvgPicker from '@pluginjs/svg-picker'

const element = query('#disabled .example-locale')

SvgPicker.of(element, { locale: 'zh', disabled: true })
