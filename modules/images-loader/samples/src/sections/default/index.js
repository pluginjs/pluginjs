import { queryAll, insertBefore } from '@pluginjs/dom'
import ImagesLoader from '@pluginjs/images-loader'
import Loader from '@pluginjs/loader'

const elements = queryAll('#default .image img')

elements.forEach($el => {
  const $loader = document.createElement('div')
  insertBefore($loader, $el)
  $el.loader = Loader.of($loader)
  $el.loader.show()
})

ImagesLoader.of(elements)
  .on('progress', (instance, $el) => {
    $el.loader.hide()
  })
  .on('error', (instance, $el) => {
    $el.parentNode.classList.add('error')
  })
