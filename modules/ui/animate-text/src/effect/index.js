// @create-index

import typewrite from './single/typewrite'
import slider from './slider'
import fade from './fade'
import rotate from './rotate'
import push from './push'
import singeFade from './single/fade'
import singeZoom from './single/zoom'
import bounce from './single/bounce'
import swing from './single/swing'

export default (isMultiple, mode) => {
  if (!isMultiple) {
    const match = {
      typewrite,
      fadeDown: singeFade({ translateY: 20 }),
      fadeTop: singeFade({ translateY: -20 }),
      fadeLeft: singeFade({ translateX: 20 }),
      fadeRight: singeFade({ translateX: -20 }),
      zoom: singeZoom,
      bounce,
      swing
    }
    return match[mode]
  }
  const match = {
    slider,
    fade,
    rotate,
    push
  }
  return match[mode]
}
