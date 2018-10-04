import { query } from '@pluginjs/dom'
import SvgPicker from '@pluginjs/svg-picker'

const element = query('#svg-sprite .example')
SvgPicker.of(element, {
  source: '#entypo' // or dom element
})
