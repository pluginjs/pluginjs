import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Slider from '@pluginjs/slider'

const element = query('.slider', render(html, query('#default')))
Slider.of(element, {
  arrows: true,
  dots: true,
  autoplay: true,
  playcycle: 3000
})
