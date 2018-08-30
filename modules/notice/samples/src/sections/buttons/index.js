import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const buttons = query('#buttons .buttons')
buttons.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    closeBottonColor: '#b3b3b3',
    buttons: {
      btn1: {
        title: 'CANCEL',
        class: 'pj-btn pj-btn-primary'
      }
    }
  })
})
