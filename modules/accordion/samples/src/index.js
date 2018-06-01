import html from './samples.html'
import { html as render, query } from '@pluginjs/dom'
// import icons and primary.css
import '@pluginjs/icons/dist/plugin-icons.css'
import 'primary.css/css/primary.css'
// import accordion module
import Accordion from '@pluginjs/accordion'
import '@pluginjs/accordion/src/css/accordion.scss'

render(html, query('#app'))
  .querySelectorAll('.accordion')
  .forEach(el => Accordion.of(el))
