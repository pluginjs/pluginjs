import { query } from '@pluginjs/dom'
import Accordion from '@pluginjs/accordion'

const element = query('#vertical .accordion')
Accordion.of(element, {})
