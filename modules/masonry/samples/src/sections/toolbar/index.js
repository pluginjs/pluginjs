import { query } from '@pluginjs/dom'
import Masonry from '@pluginjs/masonry'

const element = query('#toolbar .masonry')
Masonry.of(element, {
  /** options **/
  itemSelector: '.masonry-item',
  maxColumn: 6,
  gutter: 20,
  toolbar: {
    filters: true,
    sort: true,
    reverse: true
  }
})
