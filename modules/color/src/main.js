import Pj from '@pluginjs/pluginjs'
import { info as INFO } from './constant'
import Color from './color'
import Converter from './converter'

function color(...args) {
  return new Color(...args)
}

color.Constructor = Color

Object.assign(
  color,
  {
    matchString: Color.matchString,
    setDefaults: Color.setDefaults
  },
  Converter
)
Pj.color = color
export default color
