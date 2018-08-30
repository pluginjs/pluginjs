import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const btncenter = query('#button-align .btncenter')
const btnright = query('#button-align .btnright')
btncenter.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    buttonAlign: 'center',
    closeBottonColor: '#b3b3b3'
  })
})
btnright.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    buttonAlign: 'right',
    closeBottonColor: '#b3b3b3'
  })
})
