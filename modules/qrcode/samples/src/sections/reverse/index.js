import { query } from '@pluginjs/dom'
import Qrcode from '@pluginjs/qrcode'

const element = query('#reverse .qrcode')
Qrcode.of(element, {
  text: 'hello world',
  reverse: true
})
