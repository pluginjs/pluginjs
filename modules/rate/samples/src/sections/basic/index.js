import { query } from '@pluginjs/dom'
import Rate from '@pluginjs/rate'

const element = query('#basic .basic')
Rate.of(element, {
  iconSize: '26px'
})
