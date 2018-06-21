import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Slider from '@pluginjs/slider'

const element = query('.slider-vertical', render(html, query('#vertical')))
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
