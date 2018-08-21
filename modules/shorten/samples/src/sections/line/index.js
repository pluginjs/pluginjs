import { query } from '@pluginjs/dom'
import Shorten from '@pluginjs/shorten'

const element = query('#line .desc')
Shorten.of(element, {
  line: 3
})
