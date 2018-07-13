import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#triangle .pj-svgProgress-triangle')
SvgProgress.of(element, {
  shape: 'triangle'
}).start()
