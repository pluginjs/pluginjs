import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const background1 = query('#background-color .background1')
const background2 = query('#background-color .background2')
background1.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    backgroundColor: '#333333',
    fontColor: '#ffffff',
    closeBottonColor: '#e6e6e6',
    buttons: {
      ok: {
        title: 'OK',
        class: 'pj-btn pj-btn-white'
      }
    }
  })
})
background2.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    backgroundColor: '#215fdb',
    fontColor: '#ffffff',
    closeBottonColor: '#e6e6e6',
    buttons: {
      ok: {
        title: 'OK',
        class: 'pj-btn pj-btn-white'
      }
    }
  })
})
