import { query } from '@pluginjs/dom'
import Qrcode from '@pluginjs/qrcode'

const element = query('#color .qrcode')
Qrcode.of(element, {
  text: 'hello world',
  background: '#ffffff',
  foreground: '#003562'
})
