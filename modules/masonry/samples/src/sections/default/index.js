import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const element = query('#default .masonry')
Masonry.of(element, {
  /** options **/
  itemSelector: '.masonry-item',
  gutter: 20
})
