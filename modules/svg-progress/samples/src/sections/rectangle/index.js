import { query } from '@pluginjs/dom'
import SvgProgress from '@pluginjs/svg-progress'

const element = query('#rectangle .pj-svgProgress-rectangle')
const plugin = SvgProgress.of(element, {
  shape: 'rectangle'
})
plugin.start()
