import { query } from '@pluginjs/dom'
import ImageLoader from '@pluginjs/image-loader'
import '@pluginjs/styles/buttons.scss'

const container = query('#defaults')
const element = query('.image-loader', container)
ImageLoader.of(element, {
  /** options **/
})
  .onLoaded(img => {
    console.log(`width: ${img.width}, height: ${img.height}`)
  })
  .onComplete(data => {
    console.log(data)
    console.log('all done')
  })
  .onError(img => {
    console.log(`img[src=${img.src}] could not be loaded`)
  })
  .finally(() => {
    console.log('is finally')
  })
