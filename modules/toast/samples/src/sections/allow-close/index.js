import { queryAll } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const element = queryAll('#allow-close .example')
element.map(e => {
  return e.addEventListener('click', e => {
    Toast.open(e.target.dataset)
  })
})
