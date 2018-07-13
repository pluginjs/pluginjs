import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#pentagon .pj-svgProgress-pentagon')
SvgProgress.of(element, {
  shape: 'pentagon'
}).start()
