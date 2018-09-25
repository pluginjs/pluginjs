import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn = query('#setcolor .example')
btn.addEventListener('click', () => {
  Toast.open({
    icon: 'success',
    title: 'Inconceivable!',
    titleColor: '#215fdb',
    content: 'I do not think that word means what you think it means.',
    contentColor: '#333',
    closeBtnColor: '#666'
  })
})
