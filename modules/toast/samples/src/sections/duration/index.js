import { queryAll } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'
import { parseDataOptions } from '@pluginjs/utils'

const element = queryAll('#duration .example')

element.map(e => {
  return e.addEventListener('click', e => {
    Toast.open(parseDataOptions(e.target.dataset))
  })
})
