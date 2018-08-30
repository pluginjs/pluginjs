import { query } from '@pluginjs/dom'
import Loader from '@pluginjs/loader'

const el = query('#background .loader')

Loader.of(el, {
  text: 'Loading...',
  background: 'rgba(0,0,0,0.1)'
})
