import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#circle .pj-svgProgress-circle')
const plugin = SvgProgress.of(element, {
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
plugin.start()
// plugin.destroy()
