import { query } from '@pluginjs/dom'
import Rate from '@pluginjs/rate'

const element = query('#otherCharecter .iconClass')
Rate.of(element, {
  value: 5,
  iconClass: 'icon-smile',
  iconSize: '26px'
})
