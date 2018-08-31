import { query } from '@pluginjs/dom'
import Rate from '@pluginjs/rate'

const element = query('#otherCharecter .iconClass')
Rate.of(element, {
  value: 5,
  iconClass: 'pj-icon pj-icon-smile',
  iconSize: '26px'
})
