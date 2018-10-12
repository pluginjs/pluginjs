import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const primary = query('#types .primary')
const success = query('#types .success')
const info = query('#types .info')
const warning = query('#types .warning')
const danger = query('#types .danger')

primary.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    type: 'primary',
    buttons: {
      ok: {
        title: 'OK',
        class: 'pj-btn pj-btn-outline'
      }
    }
  })
})

success.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    type: 'success'
  })
})

info.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    type: 'info'
  })
})

warning.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    type: 'warning'
  })
})

danger.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    type: 'danger'
  })
})
