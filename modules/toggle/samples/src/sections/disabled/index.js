import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Toggle from '@pluginjs/toggle'

const element = query('.example-disabled', render(html, query('#disabled')))

Toggle.of(element, { disabled: true })
