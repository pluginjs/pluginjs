import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#rectangle .pj-svgProgress-rectangle')
const instance = SvgProgress.of(element, {
  shape: 'rectangle'
})
setTimeout(() => {
  instance.start()
}, 2000)
