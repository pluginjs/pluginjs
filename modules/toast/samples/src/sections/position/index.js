import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const bottomLeft = query('#position .bottom-left')
const bottomRight = query('#position .bottom-right')
const topLeft = query('#position .top-left')
const topRight = query('#position .top-right')
const bottomCenter = query('#position .bottom-center')
const topCenter = query('#position .top-center')
const midCenter = query('#position .mid-center')
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
