import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#title .example-title')
const btn2 = query('#title .example-content')

btn1.addEventListener('click', () => {
  Toast.open({
    type: '',
    title: 'Toast title',
    closeable: false
  })
})

btn2.addEventListener('click', () => {
  Toast.open({
    type: '',
    duration: 'false',
    title: 'Toast title',
    content:
      'Excepteur sint occaecat cupidatatbb deserunt mollit id esta laborum'
  })
})
