import { query } from '@pluginjs/dom'
import Rate from '@pluginjs/rate'
import defaultStar from '../../assets/defaultStar.svg'
import clearStar from '../../assets/clearStar.svg'

const element = query('#svgExample .svgExample')
setTimeout(() => {
  Rate.of(element, {
    svg: {
      clearPath: clearStar,
      defaultPath: defaultStar
    }
  })
}, 0)
