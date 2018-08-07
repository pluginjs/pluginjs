import { query } from '@pluginjs/dom'
import TableSort from '@pluginjs/table-sort'

const element = query('#custom-icons .table-sort')
TableSort.of(element, {
  icons: {
    sort: 'fa fa-sort',
    asc: 'fa fa-sort-asc',
    desc: 'fa fa-sort-desc'
  }
})
