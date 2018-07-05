import { query } from '@pluginjs/dom'
import InputMask from '@pluginjs/input-mask'

const element = query('#date #input-mask-date')
InputMask.of(element, {
  type: 'date'
})
