import { query, find } from '@pluginjs/dom'
import Wizard from '@pluginjs/wizard'

const element = query('#setValidator .example')
const wizard = Wizard.of(element, {
  onFinish() {
    /* eslint-disable no-alert */
    alert('finish')
    /* eslint-enable no-alert */
  }
})
/* eslint-disable consistent-return */
wizard.get('#form1').setValidator(e => {
  if (find('[name="a"]', e.pane).value === 'a') {
    return true
  }
})
wizard.get('#form2').setValidator(e => {
  if (find('[name="b"]', e.pane).value === 'b') {
    return true
  }
})
wizard.get('#form3').setValidator(e => {
  if (find('[name="c"]', e.pane).value === 'c') {
    return true
  }
})
/* eslint-enable consistent-return */
