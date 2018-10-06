import { query } from '@pluginjs/dom'
import IconPicker from '@pluginjs/icon-picker'
import fontAwesome from '@icon/font-awesome/manifest.json'
import dashicons from '@icon/dashicons/manifest.json'
import entypo from '@icon/entypo/manifest.json'
import feather from '@icon/feather/manifest.json'

const element = query('#default .example')
const init = () => {
  return IconPicker.of(element, {
    source(resolve) {
      resolve([fontAwesome, dashicons, entypo, feather])
    },
    manage(resolve) {
      resolve([fontAwesome])
    }
  })
}
let api = init()

query('.api').addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = init()
      break
    case 'get':
      console.info(api.get())
      break
    case 'set':
      api.set({ package: 'feather', icon: 'bell', class: 'fe', prefix: 'fe-' })
      break
    case 'val':
      console.info(api.val())
      break
    case 'val_set':
      api.val(
        '{"package":"feather","icon":"heart","class":"fe","prefix":"fe-"}'
      )
      break
    case 'clear':
      api.clear()
      break
    case 'manage':
      api.manage()
      break
    case 'disable':
      api.disable()
      break
    case 'enable':
      api.enable()
      break
    case 'destroy':
      api.destroy()
      break
    default: {
      console.info(el.dataset.api)
    }
  }
})
