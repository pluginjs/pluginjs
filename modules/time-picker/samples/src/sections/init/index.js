import { query } from '@pluginjs/dom'
import TimePicker from '@pluginjs/time-picker'

const element = query('#init .example-input')
TimePicker.of(element, {})
