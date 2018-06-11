import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Toggle from '@pluginjs/toggle'

const element = query('.example-click', render(html, query('#onlyclick')))

Toggle.of(element, { dragable: false, clickable: true })
