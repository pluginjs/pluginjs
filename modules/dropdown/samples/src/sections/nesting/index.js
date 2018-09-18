import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const parent = query('#nesting .parent-trigger')
Dropdown.of(parent, {})

const child = query('#nesting .child-trigger')
Dropdown.of(child, {})
