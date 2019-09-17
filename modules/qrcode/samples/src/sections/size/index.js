import { query } from '@pluginjs/dom'
import Qrcode from '@pluginjs/qrcode'

const element = query('#size .qrcode')
Qrcode.of(element, {
  text: 'hello world',
  width: 128,
  height: 128
})
