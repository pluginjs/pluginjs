import { query } from '@pluginjs/dom'
import Accordion from '@pluginjs/accordion'

if (module.hot) {
  module.hot.dispose(() => {
    console.log('module horizontal has reload')
  })
}

const element = query('#horizontal .accordion')
Accordion.of(element, {
  /** options **/
})
