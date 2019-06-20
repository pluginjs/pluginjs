import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const element = query('#default .masonry')
Masonry.of(element, {
  itemSelector: '.masonry-item',
  gutter: 20
})
