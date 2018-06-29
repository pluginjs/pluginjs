import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ImageLoader from '@pluginjs/image-loader'

const element = query('.image-loader', render(html, query('#defaults')))
ImageLoader.of(element, {
  /** options **/
})
