import { query } from '@pluginjs/dom'
import PatternPicker from '@pluginjs/pattern-picker'

const element = query('#initvalue .example-input')

PatternPicker.of(element, {})
