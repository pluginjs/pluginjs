import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const element = query('#basic .auto-complete-basic')
AutoComplete.of(element, {})
