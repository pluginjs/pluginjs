import { query } from '@pluginjs/dom'
import Scrollable from '@pluginjs/scrollable'

const element = query('#both-with-no-scroll .scrollable')
Scrollable.of(element)
