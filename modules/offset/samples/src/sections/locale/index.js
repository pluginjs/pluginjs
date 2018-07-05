import { query } from '@pluginjs/dom'
import Offset from '@pluginjs/offset'

const element = query('#locale .example-locale')

Offset.of(element, { locale: 'zh' })
