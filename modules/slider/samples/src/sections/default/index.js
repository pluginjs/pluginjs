import { query } from '@pluginjs/dom'
import Slider from '@pluginjs/slider'

const element = query('#default .slider')
Slider.of(element, {
  arrows: true,
  dots: true,
  autoplay: true,
  playcycle: 3000
})
