import { query } from '@pluginjs/dom'
import InputMask from '@pluginjs/input-mask'

const element = query('#hour #input-mask-time-12')
InputMask.of(element, {
  type: 'time',
  hours: '12'
})
