import { query } from '@pluginjs/dom'
import Strength from '@pluginjs/strength'

const element = query('#image .password-input-image')

Strength.of(element, {
  templates: {
    toggle:
      '<span class="pj-strength-addon pj-strength-box"><i class="pj-strength-show pj-icon pj-icon-show"></i><i class="pj-strength-hide pj-icon pj-icon-hidden"></i></span>'
  }
})
