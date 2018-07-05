import { query } from '@pluginjs/dom'
import CountDown from '@pluginjs/countdown'

const element = query('#ordinary .countdown')
CountDown.of(element, {})
