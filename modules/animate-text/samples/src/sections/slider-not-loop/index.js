import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import AnimateText from '@pluginjs/animate-text'

const element = query('.animate-text', render(html, query('#slider-not-loop')))
AnimateText.of(element, {
  /** options **/
})
