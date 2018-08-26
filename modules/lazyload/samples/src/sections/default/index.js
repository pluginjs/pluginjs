import { queryAll } from '@pluginjs/dom'
import Lazyload from '@pluginjs/lazyload'

const elements = queryAll('#default [lazyload]')
elements.forEach(el => Lazyload.of(el))
