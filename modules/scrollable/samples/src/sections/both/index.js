import { query } from '@pluginjs/dom'
import Scrollable from '@pluginjs/scrollable'

const element = query('#both .scrollable')
Scrollable.of(element)
