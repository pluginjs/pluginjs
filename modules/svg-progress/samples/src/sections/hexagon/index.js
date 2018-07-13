import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#hexagon .pj-svgProgress-hexagon')
SvgProgress.of(element, {
  shape: 'hexagon'
}).start()
