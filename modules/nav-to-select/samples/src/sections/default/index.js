import { query } from '@pluginjs/dom'
import navToSelect from '@pluginjs/nav-to-select'

const element = query('#default .example-1>ul')
navToSelect.of(element, {
  /** options **/
})
