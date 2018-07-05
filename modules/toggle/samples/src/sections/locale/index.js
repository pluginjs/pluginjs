import { query } from '@pluginjs/dom'
import Toggle from '@pluginjs/toggle'

const element = query('#locale .example-locale')

Toggle.of(element, { showText: true, locale: 'zh' })
