import { query } from '@pluginjs/dom'
import navToSelect from '@pluginjs/nav-to-select'

const element = query('#multilayer .example')
navToSelect.of(element, {
  useOptgroup: false
})
