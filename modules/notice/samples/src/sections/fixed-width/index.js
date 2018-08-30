import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const fixed1 = query('#fixed-width .fixed1')
const fixed2 = query('#fixed-width .fixed2')
fixed1.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    fixedWidth: true,
    contentAlignment: 'center',
    buttonAlign: 'center',
    closeBottonColor: '#b3b3b3'
  })
})
fixed2.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    fixedWidth: true,
    contentAlignment: 'left',
    buttonAlign: 'right',
    closeBottonColor: '#b3b3b3'
  })
})
