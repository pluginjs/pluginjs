import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'
import fontAwesome from '@icon/font-awesome/manifest.json'
import dashicons from '@icon/dashicons/manifest.json'
import entypo from '@icon/entypo/manifest.json'
import feather from '@icon/feather/manifest.json'

const element = query('#multiple-packages .example')
IconPicker.of(element, {
  source: [fontAwesome, dashicons, entypo, feather]
})
