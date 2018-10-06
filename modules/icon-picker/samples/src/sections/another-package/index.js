import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'
import fontAwesome from '@icon/font-awesome/manifest.json'

const element = query('#another-package .example')
IconPicker.of(element, {
  source: fontAwesome
})
