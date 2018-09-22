import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#default .example')
let api = Select.of(element)

query('.api').addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = Select.of(element)
      break
    case 'select':
      api.select(2)
      break
    case 'unselect':
      api.unselect(2)
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
      console.info(api.val(4))
      break
    case 'clear':
      api.clear()
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
