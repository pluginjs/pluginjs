import { query } from '@pluginjs/dom'
import CountDown from '@pluginjs/countdown'

const element = query('#flip .countdown')
CountDown.of(element, {})
