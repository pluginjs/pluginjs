import { taggedTemplates } from '@pluginjs/helper'

const escapeHTML = taggedTemplates(html => {
  const escape = document.createElement('textarea')
  escape.textContent = html
  return escape.innerHTML
})

export default escapeHTML
