import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#hexagon .pj-svgProgress-hexagon')
const instance = SvgProgress.of(element, {
  shape: 'hexagon'
})

setTimeout(() => {
  instance.start()
}, 2000)
