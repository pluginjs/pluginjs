import { query } from '@pluginjs/dom'
import TagList from '@pluginjs/tag-list'

const element = query('#default .example-default')
const data = ['hello', 'world']
let api = TagList.of(element, {
  data
})

query('.api').addEventListener('click', event => {
  const el = event.target
  
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }

  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = TagList.of(element, { data })
      break
    case 'set':
      api.set([
        {
          label: 'UI Design',
          value: 'ui-design'
        },
        {
          label: 'Web Design',
          value: 'web-design'
        }
      ])
      break
    case 'get':
      console.dir(api.get())
      break
    case 'val':
      if (typeof el.dataset.value !== 'undefined') {
        api.val(el.dataset.value)
      } else {
        console.dir(api.val())
      }
      break
    case 'add':
      api.add('prototype')
      break
    case 'remove':
      api.remove(0)
      break
    case 'edit':
      api.edit(1, 'hello-world')
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
    default:
      console.info(el.dataset.api)
  }
})
