import { query, find } from '@pluginjs/dom'
import Wizard from '@pluginjs/wizard'

const element = query('#loader .example')
const wizard = Wizard.of(element, {
  onFinish() {
    /* eslint-disable no-alert */
    alert('finish')
    /* eslint-enable no-alert */
  }
})
wizard.get('#loader1').setLoader(() => {
  return '<h4>Hello World</h4><p>some content</p>'
})

wizard
  .get('#loader2')
  .setLoader(() => {
    return `
  <div class="pj-wizard-formGroup">
    <input type="text" class="pj-wizard-formControl pj-input" name="a" placeholder="Enter 'a'">
  </div>
  <div class="pj-wizard-formGroup">
    <input type="text" class="pj-wizard-formControl pj-input" name="b" placeholder="Enter 'b'">
  </div>`
  })
  .setValidator(e => {
    if (
      find('[name="a"]', e.pane).value === 'a' &&
      find('[name="b"]', e.pane).value === 'b'
    ) {
      return true
    }
    return false
  })

wizard.get('#loader3').setLoader(() => {
  return '<p>Another Content</p>'
})
