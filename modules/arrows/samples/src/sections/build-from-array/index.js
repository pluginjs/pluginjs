import { query } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

let api
const init = (element, opts = {}) => {
  return Arrows.of(element, opts)
}

document.querySelector('.api-load').addEventListener('click', () => {
  const element = query('#build-from-array .example')
  api = init(element)
})

document.querySelector('.api-empty').addEventListener('click', () => {
  if (api) {
    api.empty()
  }
})
