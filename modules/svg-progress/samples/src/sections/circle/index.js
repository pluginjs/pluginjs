import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#circle .pj-svgProgress-circle')
const instance = SvgProgress.of(element, {
  onReady() {
    console.log('ready')
  },
  onFinish() {
    console.log('finish')
  },
  onStart() {
    console.log('start')
  }
})

setTimeout(() => {
  instance.start()
}, 2000)
