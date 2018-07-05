import { query } from '@pluginjs/dom'
import Radio from '@pluginjs/radio'

const element = query('#css-inline input[type="radio"]')
Radio.of(element)
