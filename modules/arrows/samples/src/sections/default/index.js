import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Arrows from '@pluginjs/arrows'

const element = query('.example-default', render(html, query('#default')))
Arrows.of(element, {})
