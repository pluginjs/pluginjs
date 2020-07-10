import { query } from '@pluginjs/dom'
import List from '@pluginjs/list'

const data = [
  {
    label: 'Interfaces',
    value: 'interface'
  },
  {
    label: 'UI Design',
    value: 'ui-design'
  },
  {
    label: 'Web Design',
    value: 'web-design'
  },
  {
    label: 'Typography',
    value: 'typography'
  },
  {
    label: 'Landing',
    value: 'landing'
  }
]

const element = query('#default .example-default')
let api = List.of(element, {
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
      api = List.of(element, { data })
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
      api.add({
        label: 'Prototype Design',
        value: 'prototype'
      })
      break
    case 'remove':
      api.remove(0)
      break
    case 'edit':
      api.edit(1, {
        label: 'Hello World',
        value: 'hello-world'
      })
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
