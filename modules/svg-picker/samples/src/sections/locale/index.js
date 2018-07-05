import { query } from '@pluginjs/dom'
import SvgPicker from '@pluginjs/svg-picker'

const element = query('#locale .example-locale')

SvgPicker.of(element, { locale: 'zh' })
