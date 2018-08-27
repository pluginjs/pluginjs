import { query } from '@pluginjs/dom'
import CountDown from '@pluginjs/countdown'

const element = query('#progress .example')
CountDown.of(element, {})
