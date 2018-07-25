import { query } from '@pluginjs/dom'
import Scrollable from '@pluginjs/scrollable'

const element = query('#vertical .scrollable')
Scrollable.of(element)
