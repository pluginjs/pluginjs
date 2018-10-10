import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#default .default')
ColorPicker.of(element)
