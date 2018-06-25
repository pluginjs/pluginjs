import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Strength from '@pluginjs/spinner'

const element = query('.password-input-image', render(html, query('#image')))

Strength.of(element, {
  templates: {
    toggle:
      '<span class="input-group-addon"><img class="{toggleClass}" title="Show/Hide Password" src="../images/checkbox.png" /></span>'
  }
})
