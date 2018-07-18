import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const buttons1 = query('#buttons .buttons1')
const buttons2 = query('#buttons .buttons2')
buttons1.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    buttons: {
      btn1: {
        title: 'cancel',
        class: 'btn-square'
      }
    }
  })
})
buttons2.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    buttons: {
      btn1: {
        title: 'cancel',
        class: 'btn-cancel'
      },
      btn2: {
        title: 'ok',
        class: 'btn-success'
      },
      btn3: {
        title: 'ok',
        class: 'btn-square'
      },
      btn4: {
        title: 'ok',
        class: 'btn-overLine'
      }
    }
  })
})
