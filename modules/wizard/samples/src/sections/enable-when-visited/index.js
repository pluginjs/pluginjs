import { query } from '@pluginjs/dom'
import Wizard from '@pluginjs/wizard'

const element = query('#enable-when-visited .pj-wizard')
Wizard.of(element, {
  enableWhenVisited: true,
  onFinish() {
    /* eslint-disable no-alert */
    alert('finish')
    /* eslint-enable no-alert */
  }
})
