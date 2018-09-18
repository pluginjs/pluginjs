/* eslint-disable no-useless-escape, no-alert */
import { query } from '@pluginjs/dom'
import Wizard from '@pluginjs/wizard'
import hyperform from 'hyperform'

const element = query('#validator .example')
const wizard = Wizard.of(element, {
  onInit() {
    hyperform(window)
    hyperform.addValidator(query('[name="username"]'), element => {
      let message
      let valid
      if (!element.value) {
        message = 'The username is required'
        valid = false
      } else if (element.value.length < 6 || element.value.length > 30) {
        message =
          'The username must be more than 6 and less than 30 characters long'
        valid = false
      } else if (!/^[a-zA-Z0-9_\.]+$/.test(element.value)) {
        message =
          'The username can only consist of alphabetical, number, dot and underscore'
        valid = false
      } else {
        valid = true
      }

      element.setCustomValidity(valid ? '' : message)

      return valid
    })
  },
  validator() {
    const isValid = hyperform.ValidityState(
      query('.pj-input', wizard.current().pane)
    ).valid
    if (isValid === false) {
      return false
    }
    return true
  },
  onFinish() {
    alert('finish')
  }
})
