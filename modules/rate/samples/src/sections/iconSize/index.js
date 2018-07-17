import { query } from '@pluginjs/dom'
import Rate from '@pluginjs/rate'

const element = query('#iconSize .iconSize')
Rate.of(element, {
  value: 5,
  iconSize: '20px'
})
