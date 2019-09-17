import { query } from '@pluginjs/dom'
import Qrcode from '@pluginjs/qrcode'

const element = query('#padding .qrcode')
Qrcode.of(element, {
  text: 'hello world',
  padding: 20
})
