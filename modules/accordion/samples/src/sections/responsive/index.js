import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Accordion from '@pluginjs/accordion'

const element = query('.accordion', render(html, query('#responsive')))
Accordion.of(element, {})
