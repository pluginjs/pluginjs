import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const custom = query('#custom .masonry')

Masonry.of(custom, {
  itemSelector: '.masonry-item'
})
