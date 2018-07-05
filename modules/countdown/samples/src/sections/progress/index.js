import { query } from '@pluginjs/dom'
import CountDown from '@pluginjs/countdown'

const element = query('#progress .countdown')
CountDown.of(element, {})
