import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Offset from '@pluginjs/offset'

const element = query('.example-locale', render(html, query('#locale')))

Offset.of(element, { locale: 'zh' })
