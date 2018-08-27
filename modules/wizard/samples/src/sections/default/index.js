import { query } from '@pluginjs/dom'
import Wizard from '@pluginjs/wizard'

const element = query('#default .pj-wizard')
Wizard.of(element, {
  onFinish() {
    /* eslint-disable no-alert */
    alert('finish')
    /* eslint-enable no-alert */
  }
})
