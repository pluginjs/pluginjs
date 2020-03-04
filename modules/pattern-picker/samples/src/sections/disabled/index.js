import { query } from '@pluginjs/dom'
import PatternPicker from '@pluginjs/pattern-picker'

const element = query('#disabled .example-locale')

PatternPicker.of(element, { locale: 'zh', disabled: true })
