import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const fontwhite = query('#font-color .fontwhite')
const fontblack = query('#font-color .fontblack')
fontwhite.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    fontColor: 'white',
    backgroundColor: '#333333'
  })
})
fontblack.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    fontColor: 'black'
  })
})
