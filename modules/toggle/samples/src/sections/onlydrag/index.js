import { query } from '@pluginjs/dom'
import Toggle from '@pluginjs/toggle'

const element = query('#onlydrag .example-drag')

Toggle.of(element, { theme: null, dragable: true, clickable: false })
