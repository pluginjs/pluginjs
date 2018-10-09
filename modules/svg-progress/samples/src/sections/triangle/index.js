import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#triangle .pj-svgProgress-triangle')
const instance = SvgProgress.of(element, {
  shape: 'triangle'
})

setTimeout(() => {
  instance.start()
}, 2000)
