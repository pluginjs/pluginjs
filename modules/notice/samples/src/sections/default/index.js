import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const element = query('#default .example')
element.addEventListener('click', () => {
  Notice.show({
    content: `
      <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
      <p class="pj-notice-mobile">Design faster and better together</p>
    `
  })
})
