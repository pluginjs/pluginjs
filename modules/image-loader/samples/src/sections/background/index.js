import { queryAll } from '@pluginjs/dom'
import ImageLoader from '@pluginjs/image-loader'

const elements = queryAll('#background .image')
elements.forEach(el => {
  ImageLoader.of(el, {
    background: true
  })
    .on('loaded', el => {
      el.classList.add('loaded')
    })
    .on('error', el => {
      el.classList.add('error')
    })
})
