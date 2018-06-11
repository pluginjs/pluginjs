import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Toggle from '@pluginjs/toggle'

const element = query('.example-size', render(html, query('#size')))

Toggle.of(element, {})
