import { query } from '@pluginjs/dom'
import Toggle from '@pluginjs/toggle'

const element = query('#onlyclick .example-click')

Toggle.of(element, { dragable: false, clickable: true })
