import { query } from '@pluginjs/dom'
import InputMask from '@pluginjs/input-mask'

const element = query('#time #input-mask-time')
InputMask.of(element, {
  type: 'time'
})
