import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#semicircle .pj-svgProgress-semicircle')
SvgProgress.of(element, {
  shape: 'semicircle'
}).start()
