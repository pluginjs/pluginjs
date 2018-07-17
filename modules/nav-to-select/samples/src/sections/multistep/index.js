import { query } from '@pluginjs/dom'
import navToSelect from '@pluginjs/nav-to-select'

const element = query('#multistep .example-2>ul')
navToSelect.of(element, {
  /** options **/
})
