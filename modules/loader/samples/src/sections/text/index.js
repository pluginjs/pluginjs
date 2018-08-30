import { query } from '@pluginjs/dom'
import Loader from '@pluginjs/loader'

const el = query('#text .loader')

Loader.of(el, {
  text: 'Loading...'
})
