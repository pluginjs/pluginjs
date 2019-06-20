import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const element = query('#toolbar .masonry')
Masonry.of(element, {
  itemSelector: '.masonry-item',
  maxColumn: 5,
  gutter: 20,
  toolbar: {
    filters: true,
    sort: true,
    reverse: true
  }
})
