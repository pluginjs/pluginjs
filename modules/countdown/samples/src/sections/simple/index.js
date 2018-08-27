import { query } from '@pluginjs/dom'
import CountDown from '@pluginjs/countdown'

const element = query('#simple .example')
CountDown.of(element, {})
