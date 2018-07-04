import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Strength from '@pluginjs/strength'

const element = query('.password-input-image', render(html, query('#image')))

Strength.of(element, {
  templates: {
    toggle:
      '<span class="pj-strength-addon pj-strength-box"><i class="pj-strength-show icon-show"></i><i class="pj-strength-hide icon-hide"></i></span>'
  }
})
