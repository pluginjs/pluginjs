import { query } from '@pluginjs/dom'
import HeardRoom from '@pluginjs/headroom'

const element = query('#default .example')
HeardRoom.of(element, {})
