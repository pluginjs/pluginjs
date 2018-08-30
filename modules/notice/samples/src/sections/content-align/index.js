import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const alignleft = query('#content-align .alignleft')
const aligncenter = query('#content-align .aligncenter')
const alignright = query('#content-align .alignright')
alignleft.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    contentAlignment: 'left',
    closeBottonColor: '#b3b3b3'
  })
})
aligncenter.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    contentAlignment: 'center',
    closeBottonColor: '#b3b3b3'
  })
})
alignright.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    contentAlignment: 'right',
    closeBottonColor: '#b3b3b3'
  })
})
