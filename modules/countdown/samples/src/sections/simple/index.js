import { query } from '@pluginjs/dom'
import CountDown from '@pluginjs/countdown'

const element = query('#simple .countdown')
CountDown.of(element, {})
