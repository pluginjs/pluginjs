import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const element = query('#default .example')
let api = ImageSelector.of(element)

query('.api').addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = ImageSelector.of(element)
      break
    case 'get':
      console.info(api.get())
      break
    case 'set':
      api.set(3)
      break
    case 'val':
      console.info(api.val())
      break
    case 'val_set':
      api.val(4)
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
