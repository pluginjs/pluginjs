import { query } from '@pluginjs/dom'
import Slider from '@pluginjs/slider'

const element = query('#vertical .slider-vertical')
const slider = Slider.of(element, {
  direction: 'vertical',
  arrows: true,
  dots: true
})
document
  .querySelector('.api-autoplay-vertical')
  .addEventListener('click', () => {
    slider.autoPlay()
  })
