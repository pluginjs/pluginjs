import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Toggle from '@pluginjs/toggle'

const element = query('.example-drag', render(html, query('#onlydrag')))

Toggle.of(element, { theme: null, dragable: true, clickable: false })
