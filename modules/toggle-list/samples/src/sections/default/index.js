import { query } from '@pluginjs/dom'
import ToggleList from '@pluginjs/toggle-list'

const element = query('#default .example-default')
const data = [
  {
    label: 'Interfaces',
    value: 'interface',
    checked: true
  },
  {
    label: 'UI Design',
    value: 'ui-design',
    checked: false
  },
  {
    label: 'Web Design',
    value: 'web-design',
    checked: true
  },
  {
    label: 'Typography',
    value: 'typography',
    checked: false
  },
  {
    label: 'Landing',
    value: 'landing',
    checked: true
  }
]
let api = ToggleList.of(element, { data })

query('.api').addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = ToggleList.of(element, { data })
      break
    case 'set':
      api.set([
        {
          label: 'UI Design',
          value: 'ui-design',
          checked: false
        },
        {
          label: 'Web Design',
          value: 'web-design',
          checked: true
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
        value: 'prototype',
        checked: false
      })
      break
    case 'remove':
      api.remove(0)
      break
    case 'edit':
      api.edit(1, {
        label: 'Hello World',
        value: 'hello-world',
        checked: false
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
