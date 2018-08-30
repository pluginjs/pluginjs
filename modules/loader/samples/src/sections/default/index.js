import { queryAll } from '@pluginjs/dom'
import Loader from '@pluginjs/loader'

const elements = queryAll('#default .loader')

const apis = elements.map(element => Loader.of(element, {}).show())

document.querySelector('.api-show').addEventListener('click', () => {
  apis.forEach(api => api.show())
})

document.querySelector('.api-hide').addEventListener('click', () => {
  apis.forEach(api => api.hide())
})
