import { query } from '@pluginjs/dom'
import InputMask from '@pluginjs/input-mask'

const element = query('#disabled #input-mask-custom')
InputMask.of(element, {
  type: 'custom',
  delimiter: '-',
  blocks: [2, 3, 5],
  disabled: true
})
