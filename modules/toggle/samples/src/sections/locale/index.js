import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Toggle from '@pluginjs/toggle'

const element = query('.example-locale', render(html, query('#locale')))

Toggle.of(element, { showText: true, locale: 'zh' })
