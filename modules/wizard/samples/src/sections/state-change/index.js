import { query } from '@pluginjs/dom'
import Wizard from '@pluginjs/wizard'

const element = query('#state-change .pj-wizard')
Wizard.of(element, {
  /* eslint-disable no-alert */
  onStateChange(step, enter, state) {
    switch (state) {
      case 'error':
        if (enter) {
          alert(`Get a error on step ${step.index}`)
        } else {
          alert('Resolved the error')
        }
        break
      default:
        return
    }
  },
  onFinish() {
    alert('finish')
  }
  /* eslint-enable no-alert */
})
