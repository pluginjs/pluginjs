import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#pentagon .pj-svgProgress-pentagon')
const instance = SvgProgress.of(element, {
  shape: 'pentagon'
})

setTimeout(() => {
  instance.start()
}, 2000)
