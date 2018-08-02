import { query } from '@pluginjs/dom'
import Paginator from '@pluginjs/paginator'

const element = query('#all .paginator-all')
Paginator.of(element, {
  totalItems: 10,
  itemsPerPage: 1,
  currentPage: 3,
  list: {
    visibleSize: {
      0: 3,
      960: 5,
      1280: 10
    }
  },
  layout: 'total, prev, list, next, jumper',
  onChange(page) {
    const url = `?page=${page}`
    return url
  }
})
