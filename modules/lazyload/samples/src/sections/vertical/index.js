import { queryAll } from '@pluginjs/dom'
import Lazyload from '@pluginjs/lazyload'

const elements = queryAll('#vertical [lazyload]')
elements.forEach(el => Lazyload.of(el))
