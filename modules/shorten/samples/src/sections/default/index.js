import { query } from '@pluginjs/dom'
import Shorten from '@pluginjs/shorten'

const element = query('#default .desc')
Shorten.of(element, {
  chars: 50
})
