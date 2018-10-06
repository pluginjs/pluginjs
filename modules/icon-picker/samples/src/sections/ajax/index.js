import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'
import entypo from '@icon/entypo/manifest.json'

const element = query('#ajax .example')
IconPicker.of(element, {
  source(resolve) {
    setTimeout(() => {
      resolve(entypo)
    }, 1000)
  }
})
