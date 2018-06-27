import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ImageLoader from '@pluginjs/image-loader'
import '@pluginjs/styles/buttons.scss'

const container = render(html, query('#defaults'))
const element = query('.image-loader', container)
const imageLoader = ImageLoader.of(element, {
  /** options **/
})
imageLoader
  .load()
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
query('.api-add', container).addEventListener('click', () => {
  imageLoader
    .add([
      'https://picsum.photos/1000/?image=101;?random;?gravity=center',
      'https://picsum.photos/1500/?image=103;?random;?gravity=center',
      'https://picsum.photos/1500/?image=104;?random;?gravity=center',
      'https://picsum.photos/1200/?image=107;?random;?gravity=center'
    ])
    .onComplete(() => {
      console.log('add image is all loaded')
    })
    .finally(() => {
      console.log('add imgs is finally')
    })
})
