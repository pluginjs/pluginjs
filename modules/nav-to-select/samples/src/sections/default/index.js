import { query } from '@pluginjs/dom'
import navToSelect from '@pluginjs/nav-to-select'

const element = query('#default .example')
navToSelect.of(element, {})
