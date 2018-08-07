import { query } from '@pluginjs/dom'
import Rate from '@pluginjs/rate'

const element = query('#readOnly .readOnly')
Rate.of(element, {
  max: 5,
  readonly: true,
  value: 2.5,
  iconSize: '26px'
})
