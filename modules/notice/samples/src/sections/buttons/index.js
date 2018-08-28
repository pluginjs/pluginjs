import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const buttons = query('#buttons .buttons')
buttons.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    closeBottonColor: '#b3b3b3',
    buttons: {
      btn1: {
        title: 'CANCEL',
        class: 'pj-btn pj-btn-primary'
      }
    },
    timeout: 500000
  })
})
