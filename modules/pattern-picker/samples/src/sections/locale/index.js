import { query } from '@pluginjs/dom'
import PatternPicker from '@pluginjs/pattern-picker'

const element = query('#locale .example-locale')

PatternPicker.of(element, { locale: 'zh' })
