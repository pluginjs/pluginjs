import { query } from '@pluginjs/dom'
import Scrollable from '@pluginjs/scrollable'

const element = query('#horizontal .scrollable')
Scrollable.of(element)
