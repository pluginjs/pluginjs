import { info as INFO } from './constant'
import Gradient from './gradient'
import GradientString from './gradientString'

const gradient = function(...args) {
  return new Gradient(...args)
}

gradient.Constructor = Gradient

Object.assign(gradient, { setDefaults: Gradient.setDefaults }, GradientString)
window.Pj.gradient = gradient
export default gradient
