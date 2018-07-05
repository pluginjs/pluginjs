import { query } from '@pluginjs/dom'
import Accordion from '@pluginjs/accordion'

const element = query('#horizontal-responsive .accordion')
Accordion.of(element, {})
