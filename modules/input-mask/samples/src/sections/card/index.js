import { query } from '@pluginjs/dom'
import InputMask from '@pluginjs/input-mask'

const element = query('#card #input-mask-card')
InputMask.of(element, {
  type: 'card'
})
