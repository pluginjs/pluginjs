import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'
import fontAwesome from '@icon/font-awesome/manifest.json'

const element = query('#disable-filterable .example')
IconPicker.of(element, {
  filterable: false,
  source: fontAwesome
})
