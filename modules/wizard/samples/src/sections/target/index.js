import { query } from '@pluginjs/dom'
import Wizard from '@pluginjs/wizard'

const element = query('#target .pj-wizard')
let i = 1
Wizard.of(element, {
  onFinish() {
    /* eslint-disable no-alert */
    alert('finish')
    /* eslint-enable no-alert */
  }
})
  .get('#step2')
  .setValidator(() => {
    i++
    if (i % 2 === 1) {
      return true
    }
    return false
  })
