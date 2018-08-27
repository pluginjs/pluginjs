import { query } from '@pluginjs/dom'
import Wizard from '@pluginjs/wizard'

const element = query('#loader .pj-wizard')
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
wizard.get('#loader2').setLoader(() => {
  return `
  <form class="form-horizontal">
  <div class="form-group">
    <label for="inputEmail" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
    </div>
  </div>
</form>`
})
wizard.get('#loader3').setLoader(() => {
  return '<p>Another Content</p>'
})
