import { query } from '@pluginjs/dom'
import CountDown from '@pluginjs/countdown'

const element = query('#flip .example')
CountDown.of(element, {})
