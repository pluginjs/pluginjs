import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const bottomLeft = query('#position .example-bottom-left')
const bottomRight = query('#position .example-bottom-right')
const topLeft = query('#position .example-top-left')
const topRight = query('#position .example-top-right')
const bottomCenter = query('#position .example-bottom-center')
const topCenter = query('#position .example-top-center')
const midCenter = query('#position .example-mid-center')
bottomLeft.addEventListener('click', () => {
  Toast.open({
    position: 'bottom-left'
  })
})
bottomRight.addEventListener('click', () => {
  Toast.open({
    position: 'bottom-right'
  })
})
topLeft.addEventListener('click', () => {
  Toast.open({
    position: 'top-left'
  })
})
topRight.addEventListener('click', () => {
  Toast.open({
    position: 'top-right'
  })
})
bottomCenter.addEventListener('click', () => {
  Toast.open({
    position: 'bottom-center'
  })
})
topCenter.addEventListener('click', () => {
  Toast.open({
    position: 'top-center'
  })
})
midCenter.addEventListener('click', () => {
  Toast.open({
    position: 'mid-center'
  })
})
