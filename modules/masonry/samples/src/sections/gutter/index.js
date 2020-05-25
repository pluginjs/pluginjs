import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const element = query('#gutter .masonry')

Masonry.of(element, {
  itemSelector: '.masonry-item'
})
