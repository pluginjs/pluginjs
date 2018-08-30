import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const fontwhite = query('#font-color .fontred')
const fontblack = query('#font-color .fontblue')
fontwhite.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    fontColor: '#f73e4d',
    closeBottonColor: '#b3b3b3'
  })
})
fontblack.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    fontColor: '#215fdb',
    closeBottonColor: '#b3b3b3'
  })
})
