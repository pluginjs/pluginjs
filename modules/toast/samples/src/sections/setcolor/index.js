import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn = query('#setcolor .setColor')
btn.addEventListener('click', () => {
  Toast.open({
    icon: 'success',
    title: 'Inconceivable!',
    titleColor: '#215fdb',
    content: 'I do not think that word means what you think it means.',
    contentColor: '#b3b3b3',
    closeBtnColor: '#e6e6e6'
  })
})
