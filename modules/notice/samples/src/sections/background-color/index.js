import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const background1 = query('#background-color .background1')
const background2 = query('#background-color .background2')
background1.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    backgroundColor: '#333333',
    fontColor: '#ffffff',
    closeBottonColor: '#e6e6e6',
    buttons: {
      ok: {
        title: 'OK',
        class: 'pj-btn'
      }
    }
  })
})
background2.addEventListener('click', () => {
  Notice.show({
    content: `
    <p class="pj-notice-desktop">Creation uses cookies to store you information. By using our site, you agree to our terms of service</p>
    <p class="pj-notice-mobile">Design faster and better together</p>
    `,
    backgroundColor: '#215fdb',
    fontColor: '#ffffff',
    closeBottonColor: '#e6e6e6',
    buttons: {
      ok: {
        title: 'OK',
        class: 'pj-btn'
      }
    }
  })
})
