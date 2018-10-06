import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'
import entypo from '@icon/entypo/manifest.json'
import feather from '@icon/feather/manifest.json'

const element = query('#manage .example')

IconPicker.of(element, {
  source(resolve) {
    resolve(feather)
  },
  manage(resolve) {
    resolve(entypo)
  }
})
