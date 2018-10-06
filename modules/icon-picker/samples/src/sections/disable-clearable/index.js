import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'
import fontAwesome from '@icon/font-awesome/manifest.json'

const element = query('#disable-clearable .example')
IconPicker.of(element, {
  clearable: false,
  source: fontAwesome
})
