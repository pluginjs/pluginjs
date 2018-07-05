import { query } from '@pluginjs/dom'
import Toggle from '@pluginjs/toggle'

const element = query('#disabled .example-disabled')

Toggle.of(element, { disabled: true })
